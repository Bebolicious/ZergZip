// Prevents additional console window on Windows in release, DO NOT REMOVE!! #![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

extern crate zip;

use std::fs::File;
use std::io;
use std::io::BufReader;
use std::io::BufWriter;
use std::sync::Mutex;
use std::sync::MutexGuard;
use tauri::State;
use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};
use zip::write::FileOptions;
use zip::ZipWriter;

struct Files {
    files: Mutex<Vec<String>>,
}

#[tauri::command]
fn set_files(method: &str, state: State<Files>, _files: Vec<String>) -> Vec<String> {
    let mut files: MutexGuard<'_, Vec<String>> = state.files.lock().unwrap();
    let mut temp_files: Vec<String> = Vec::new();
    if files.len() > 0 {
        for x in files.iter() {
            temp_files.push(x.to_string());
        }
    }

    match method {
        "add" => {
            for x in _files {
                temp_files.push(x.to_string());
            }

            *files = temp_files.to_vec()
        }
        "remove" => {
            //ta bort fil från vec
        }
        "clear" => {
            temp_files = _files;
            *files = temp_files.to_vec()
        }
        _ => (),
    }

    return files.to_vec();
}

#[tauri::command]
fn compress(target: String, source: &str) {
    let mut _source: BufReader<File> = BufReader::new(File::open(source).unwrap());
    let _target: BufWriter<File> = BufWriter::new(File::create(target).unwrap());
    let mut zip_writer: ZipWriter<BufWriter<File>> = ZipWriter::new(_target);

    zip_writer
        .start_file(source, FileOptions::default())
        .unwrap();
    // This is only workable because we're only writing one file to our ZIP.
    let mut zip_writer: BufWriter<ZipWriter<BufWriter<File>>> = BufWriter::new(zip_writer);
    io::copy(&mut _source, &mut zip_writer).unwrap();
}

fn main() {
    let quit: CustomMenuItem = CustomMenuItem::new("exit".to_string(), "Exit");
    let submenu: Submenu = Submenu::new("File", Menu::new().add_item(quit));
    let menu: Menu = Menu::new()
        .add_native_item(MenuItem::Copy)
        .add_submenu(submenu);

    tauri::Builder::default()
        .manage(Files {
            files: Mutex::new(Vec::new()),
        })
        .invoke_handler(tauri::generate_handler![compress, set_files])
        .menu(menu)
        .on_menu_event(|event| match event.menu_item_id() {
            "exit" => {
                std::process::exit(0);
            }
            _ => {}
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
