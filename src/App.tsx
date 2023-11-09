import { useState } from 'react';
import './App.css';
import { Box, Button, Typography } from '@mui/material';
import { DEFAULT_FILE_EXTENSION } from './model/types';
import FileDropContext from './lib/fileDrop/index';
import FolderIcon from '@mui/icons-material/Folder';
import { FileCards } from './components/files/fileCard';
import { DropZoneContainer } from './lib/fileDrop/dropzone';
import CloseIcon from '@mui/icons-material/Close';
import { open } from '@tauri-apps/api/dialog';
import { addFiles } from './queries/addFiles';
import { ApiInvoke } from './api/apiFactory';
import { clearFiles } from './queries/clearFiles';
import { removeFiles } from './queries/removeFiles';
import CompressIcon from '@mui/icons-material/Compress';

function App() {
    const [files, setFiles] = useState<string[] | undefined>();
    const [fileSelection, setFileSelection] = useState<string[]>([]);
    // async function zipFile() {
    //   await invoke("compress", {
    //     source: "FlightPlan.pdf",
    //     target: "compressed_file" + DEFAULT_FILE_EXTENSION,
    //   });
    // }

    const fileUpload = async (_files: string[]) => {
        const args: ApiInvoke = {
            endpoint: 'set_files',
            extraArguments: { method: 'add', files: _files }
        };
        let files = await addFiles(args);
        setFiles(files);
    };

    async function clearFileUpload() {
        const args: ApiInvoke = {
            endpoint: 'set_files',
            extraArguments: { method: 'clear', files: [] }
        };
        await clearFiles(args);
        setFiles(undefined);
    }

    async function removeFromFileUpload() {
        const args: ApiInvoke = {
            endpoint: 'set_files',
            extraArguments: { method: 'remove', files: fileSelection }
        };
        const files = await removeFiles(args);
        setFileSelection([]);

        if (files.length === 0) {
            setFiles(undefined);
        } else {
            setFiles(files);
        }
    }

    async function openFileExplorer() {
        const files = await open({
            multiple: true
        });

        if (files === null) {
            //
        } else {
            fileUpload(files as string[]);
        }
    }

    function handleFiles(_files: string[]) {
        setFileSelection(_files);
    }

    return (
        <FileDropContext filesUpload={fileUpload}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '20px 50px 20px 50px',
                    backgroundColor: 'transparent'
                }}
            >
                {files?.length === 0 || files ? (
                    <Typography
                        sx={{
                            fontSize: '50px',
                            fontFamily: 'Gothic Regular',
                            marginBottom: '20px',
                            color: 'white',
                            userSelect: 'none'
                        }}
                    >
                        Add or remove files
                    </Typography>
                ) : (
                    <Typography
                        sx={{
                            fontSize: '50px',
                            fontFamily: 'Gothic Regular',
                            marginBottom: '20px',
                            color: 'white',
                            userSelect: 'none',
                            display: 'flex'
                        }}
                    >
                        Welcome to
                        <Box sx={{ marginLeft: '12px', color: '#7d5c9c' }}>ZergZip</Box>!
                    </Typography>
                )}

                {files && files.length >= 1 ? (
                    <FileCards
                        handleFiles={handleFiles}
                        files={files}
                        filesUpForRemoval={fileSelection}
                    />
                ) : (
                    <DropZoneContainer />
                )}

                <Box sx={{ margin: '20px 0px 0px 0px', display: 'flex', gap: '20px' }}>
                    {!files ? (
                        <Button
                            sx={{
                                padding: '1rem 1.5rem',
                                backgroundColor: '#2a2e32',
                                color: 'white',
                                boder: '1px solid black',
                                borderColor: '#2a2e32',
                                '&:hover': {
                                    backgroundColor: '#3c4145',
                                    borderColor: '#3c4145'
                                }
                            }}
                            onClick={() => openFileExplorer()}
                            variant="outlined"
                            endIcon={
                                <FolderIcon sx={{ padding: '0px 0px 2px 10px' }} fontSize="large" />
                            }
                        >
                            <Typography
                                sx={{
                                    fontFamily: 'Gothic Regular',
                                    textTransform: 'none',
                                    transition: 'all 200ms'
                                }}
                            >
                                Select files
                            </Typography>
                        </Button>
                    ) : fileSelection.length > 0 ? (
                        <Button
                            sx={{
                                padding: '0.75rem 1.3rem',
                                backgroundColor: '#2a2e32',
                                color: 'white',
                                boder: '1px solid black',
                                borderColor: '#2a2e32',
                                '&:hover': {
                                    backgroundColor: '#3c4145',
                                    borderColor: '#3c4145'
                                }
                            }}
                            variant="outlined"
                            onClick={() => removeFromFileUpload()}
                            endIcon={
                                <CloseIcon sx={{ padding: '0px 0px 2px 10px' }} fontSize="large" />
                            }
                        >
                            <Typography
                                sx={{
                                    fontFamily: 'Gothic Regular',
                                    textTransform: 'none',
                                    transition: 'all 200ms'
                                }}
                            >
                                Remove Selection
                            </Typography>
                        </Button>
                    ) : (
                        <Button
                            sx={{
                                padding: '0.75rem 1.3rem',
                                backgroundColor: '#2a2e32',
                                color: 'white',
                                boder: '1px solid black',
                                borderColor: '#2a2e32',

                                '&:hover': {
                                    backgroundColor: '#3c4145',
                                    borderColor: '#3c4145'
                                }
                            }}
                            variant="outlined"
                            onClick={() => clearFileUpload()}
                            endIcon={
                                <CloseIcon sx={{ padding: '0px 0px 2px 10px' }} fontSize="large" />
                            }
                        >
                            <Typography
                                sx={{
                                    fontFamily: 'Gothic Regular',
                                    textTransform: 'none'
                                }}
                            >
                                Cancel
                            </Typography>
                        </Button>
                    )}
                    {files && files.length >= 1 ? (
                        <Button
                            sx={{
                                padding: '0.75rem 1.3rem',
                                backgroundColor: '#2a2e32',
                                color: 'white',
                                boder: '1px solid black',
                                borderColor: '#2a2e32',

                                '&:hover': {
                                    backgroundColor: '#7d5c9c',
                                    borderColor: '#3c4145'
                                }
                            }}
                            variant="outlined"
                            onClick={() => clearFileUpload()}
                            endIcon={
                                <CompressIcon
                                    sx={{ padding: '0px 0px 2px 10px' }}
                                    fontSize="large"
                                />
                            }
                        >
                            <Typography
                                sx={{
                                    fontFamily: 'Gothic Regular',
                                    textTransform: 'none'
                                }}
                            >
                                Zip Files
                            </Typography>
                        </Button>
                    ) : null}
                </Box>
            </Box>
        </FileDropContext>
    );
}

export default App;
