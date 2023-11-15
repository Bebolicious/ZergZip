import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';

export const CompressionPicker = ({
    compressionSelection
}: {
    compressionSelection: (compressionMethod: any) => void;
}) => {
    const [compressionMethod, setCompressionMethod] = useState<number | string>(0);
    return (
        <Box sx={{ width: '200px', position: 'absolute', left: 40, top: 130 }}>
            <FormControl fullWidth>
                <InputLabel
                    sx={{
                        color: 'white',
                        '&.Mui-focused': {
                            color: 'white'
                        }
                    }}
                >
                    Compression Method
                </InputLabel>
                <Select
                    value={compressionMethod}
                    label="Compression Method"
                    onChange={(e) => {
                        setCompressionMethod(e.target.value);
                        compressionSelection(e.target.value);
                    }}
                    sx={{
                        color: 'white',
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
                >
                    <MenuItem value={0}>Deflated</MenuItem>
                    <MenuItem value={1}>Zstd</MenuItem>
                    <MenuItem value={2}>Aes</MenuItem>
                    <MenuItem value={3}>Bzip2</MenuItem>
                    <MenuItem value={4}>No compression</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};
