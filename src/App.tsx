import { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import './App.css';
import { Box, Button, Typography } from '@mui/material';
import { DEFAULT_FILE_EXTENSION } from './model/types';
import FileDropContext from './lib/fileDrop/index';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import { FileCards } from './components/files/fileCard';
import { DropZoneContainer } from './lib/fileDrop/dropzone';
import CloseIcon from '@mui/icons-material/Close';

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
        await addFiles(_files);
    };

    async function addFiles(files: string[]) {
        setFiles(
            await invoke('set_files', {
                method: 'add',
                files: files
            })
        );
    }

    async function clearFiles() {
        await invoke('set_files', { method: 'clear', files: [] });
        setFiles(undefined);
    }

    function clearSelections() {
        setFileSelection([]);
    }

    function handleFiles(_files: string[]) {
        setFileSelection(_files);
    }

    async function removeFiles() {
        const a: string[] = await invoke('set_files', { method: 'remove', files: fileSelection });
        setFileSelection([]);
        if (a.length === 0) {
            setFiles(undefined);
        } else {
            setFiles(a as string[]);
        }
    }

    return (
        <FileDropContext fn={fileUpload}>
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
                        clearSelections={clearSelections}
                        filesUpForRemoval={fileSelection}
                    />
                ) : (
                    <DropZoneContainer />
                )}

                <Box sx={{ margin: '20px 0px 0px 0px' }}>
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
                            variant="outlined"
                            endIcon={
                                <FolderZipIcon
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
                            onClick={() => removeFiles()}
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
                            onClick={() => clearFiles()}
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
                </Box>
            </Box>
        </FileDropContext>
    );
}

export default App;
