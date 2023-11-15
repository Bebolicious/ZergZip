import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import { open } from '@tauri-apps/api/dialog';
import { appDataDir } from '@tauri-apps/api/path';
import { DEFAULT_FILE_EXTENSION } from '../../model/types';

export const CompressionNaming = ({
    setCompressedFilename
}: {
    setCompressedFilename: (filename: string) => void;
}) => {
    const [name, setName] = useState<string>('compressed_files');

    return (
        <Box sx={{ width: '200px', position: 'absolute', left: 40, top: 270 }}>
            <TextField
                label="Archive name"
                variant="outlined"
                defaultValue="compressed_files"
                inputProps={{ style: { color: 'white', cursor: 'pointer' } }}
                InputLabelProps={{
                    style: { color: '#fff' }
                }}
                sx={{
                    '& input.Mui-disabled': {
                        color: 'green'
                    },
                    cursor: 'pointer',
                    color: 'white',
                    '& label.Mui-focused': {
                        color: 'white'
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: 'white'
                    },
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: 'rgba(228, 219, 233, 0.25)'
                        }
                    },
                    borderColor: 'white',
                    '.MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(228, 219, 233, 0.25)'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(228, 219, 233, 0.25)'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(228, 219, 233, 0.25)'
                    },
                    '.MuiSvgIcon-root ': {
                        fill: 'white !important'
                    }
                }}
                onChange={(e) => {
                    setName(e.target.name);
                }}
            />
        </Box>
    );
};
