import { Box } from '@mui/material';
import DropZone from '../../components/icons';
import { useEffect, useState } from 'react';

export const DropZoneContainer = () => {
    return (
        <Box
            sx={{
                width: 400,
                height: 200,
                padding: '20px 20px 20px 0px'
            }}
        >
            <DropZone />
        </Box>
    );
};
