import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import { open } from '@tauri-apps/api/dialog';
import { appDataDir } from '@tauri-apps/api/path';

export const TargetLocationPicker = ({
    setTargetLocation
}: {
    setTargetLocation: (targetLocation: string) => void;
}) => {
    const [location, setLocation] = useState<string | string[] | null>('/');

    async function openSaveDialogue() {
        const selected = await open({
            directory: true,
            multiple: false,
            defaultPath: await appDataDir()
        });
        setLocation(selected);
    }

    return (
        <Box sx={{ width: '200px', position: 'absolute', left: 40, top: 200 }}>
            <TextField
                label="Target location"
                variant="outlined"
                value={location}
                inputProps={{ readOnly: true, style: { color: 'white', cursor: 'pointer' } }}
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
                onClick={() => {
                    openSaveDialogue();
                }}
            />
        </Box>
    );
};
