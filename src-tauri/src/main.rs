// Prevents additional console window on Windows in release, DO NOT REMOVE!! #![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

extern crate zip;

use std::fs::File;
use std::io::{self, Read, Write};
use std::path::{Path, PathBuf};
use std::sync::Mutex;
use std::sync::MutexGuard;
use tauri::State;
use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};
use zip::{write::FileOptions, CompressionMethod, ZipWriter};

struct Files {
    files: Mutex<Vec<String>>,
}
// #[tauri::command]
// fn compress2(files_to_compress: Vec<PathBuf>, _target: PathBuf) {
//     println!("nu körs det 1");
//     let zip_file_path: &Path = Path::new("compressed_files.zip");
//     let zip_file: File = File::create(&zip_file_path).unwrap();

//     let mut zip: ZipWriter<File> = ZipWriter::new(zip_file);

//     // // Define the files you want to compress.
//     // let files_to_compress: Vec<PathBuf> = vec![
//     //     PathBuf::from("exampleImage.png"),
//     //     PathBuf::from(".gitignore"),
//     //     // Add more files as needed
//     // ];
//     println!("nu körs det");

//     // Set compression options (e.g., compression method)
//     let options: FileOptions =
//         FileOptions::default().compression_method(CompressionMethod::DEFLATE);

//     // Iterate through the files and add them to the ZIP archive.
//     for file_path in &files_to_compress {
//         let file: File = File::open(file_path).unwrap();
//         let file_name: &str = file_path.file_name().unwrap().to_str().unwrap();

//         // Adding the file to the ZIP archive.
//         zip.start_file(file_name, options).unwrap();

//         let mut buffer: Vec<u8> = Vec::new();
//         io::copy(&mut file.take(u64::MAX), &mut buffer).unwrap();

//         zip.write_all(&buffer).unwrap();
//     }

//     zip.finish().unwrap();

//     println!("Files compressed successfully to {:?}", zip_file_path);
// }

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
            temp_files.sort();
            temp_files.dedup();

            *files = temp_files.to_vec()
        }
        "remove" => {
            for file in _files {
                if let Some(pos) = temp_files.iter().position(|x: &String| *x == file) {
                    temp_files.remove(pos);
                }
            }
            *files = temp_files.to_vec()
        }
        "clear" => {
            temp_files = _files;
            *files = temp_files.to_vec()
        }
        _ => (),
    }

    return files.to_vec();
}

#[tauri::command(async)]
fn compress_files(method: &str, _files: Vec<PathBuf>, _target: String) -> bool {
    match method {
        "test" => {
            println!("nu kör jag i compress");
            let zip_file_path: &Path = Path::new("compressed_files.zip");
            let zip_file: File = File::create(&zip_file_path).unwrap();

            let mut zip: ZipWriter<File> = ZipWriter::new(zip_file);

            // // Define the files you want to compress.
            // let files_to_compress: Vec<PathBuf> = vec![
            //     PathBuf::from("exampleImage.png"),
            //     PathBuf::from(".gitignore"),
            //     // Add more files as needed
            // ];
            println!("nu körs det");

            // Set compression options (e.g., compression method)
            let options: FileOptions =
                FileOptions::default().compression_method(CompressionMethod::DEFLATE);

            // Iterate through the files and add them to the ZIP archive.
            for file_path in &_files {
                let file: File = File::open(file_path).unwrap();
                let file_name: &str = file_path.file_name().unwrap().to_str().unwrap();

                // Adding the file to the ZIP archive.
                zip.start_file(file_name, options).unwrap();

                let mut buffer: Vec<u8> = Vec::new();
                io::copy(&mut file.take(u64::MAX), &mut buffer).unwrap();

                zip.write_all(&buffer).unwrap();
            }

            zip.finish().unwrap();

            println!("Files compressed successfully to {:?}", zip_file_path);
            return true;
        }
        _ => false,
    }
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
        .invoke_handler(tauri::generate_handler![compress_files, set_files])
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
