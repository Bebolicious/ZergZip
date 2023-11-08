import { Badge, Box, Paper, Typography } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import { useState } from 'react';

export const FileCards = ({
    files,
    handleFiles,
    clearSelections,
    filesUpForRemoval
}: {
    files: string[];
    handleFiles: (fileName: string[]) => void;
    clearSelections: () => void;
    filesUpForRemoval: string[];
}) => {
    function setRemoveFiles(url: string) {
        const stateClone = structuredClone(filesUpForRemoval);
        let currentFiles: string[] = stateClone;
        if (currentFiles.length > 0) {
            currentFiles.forEach(function (elem, i = 0) {
                if (elem === url) {
                    console.log('found', elem, url);
                    const filtered = currentFiles.filter((elem) => elem !== url);
                    currentFiles = filtered;
                } else {
                    console.log('not found', elem, url);
                    currentFiles.push(url);
                }
                i++;
            });
        } else {
            currentFiles.push(url);
        }
        if (currentFiles.length === 0) {
            clearSelections();
        }
        handleFiles(currentFiles);
    }

    return (
        <Box
            sx={{
                margin: '20px',
                width: '350px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2
            }}
        >
            {files.map((url, i) => (
                <FileCard key={url} url={url} id={i} onClick={setRemoveFiles} />
            ))}
        </Box>
    );
};

const convertAbsolutePathToFilename = (path: string): string => {
    let fileName = path.replace(/^.*[\\/]/, '');
    return fileName;
};

const getFileTypeIcon = (fileName: string): JSX.Element => {
    let extension = fileName.split('.').pop();

    switch (extension) {
        case 'pdf':
            return <PictureAsPdfIcon sx={{ fontSize: '50px', color: '#fff' }} />;
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'tiff':
        case 'gif':
        case 'svg':
            return <ImageIcon sx={{ fontSize: '50px', color: '#fff' }} />;

        default:
            return <DescriptionIcon sx={{ fontSize: '50px', color: '#fff' }} />;
    }
};

const FileCard = ({
    url,
    id,
    onClick
}: {
    url: string;
    id: number;
    onClick: (fileName: string) => void;
}) => {
    const [isActive, setIsActive] = useState<boolean>(false);

    return (
        <Paper
            key={id}
            sx={{
                width: '110px',
                height: '140px',
                backgroundColor: '#3c4145',
                border: isActive ? 'solid #911d38 3px' : 'solid #3c4145 3px'
            }}
            data-id={id}
            onClick={() => {
                setIsActive(!isActive);
                onClick(url);
            }}
        >
            <Badge
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                }}
                sx={{
                    left: 86,
                    color: 'transparent'
                }}
            >
                {/* Old removal implementation <CloseIcon /> */}
            </Badge>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '0px',
                    padding: 1,
                    flexDirection: 'column',
                    gap: 2
                }}
            >
                {getFileTypeIcon(convertAbsolutePathToFilename(url))}
                <Typography
                    sx={{
                        width: '85px',
                        fontSize: 12,
                        padding: 0.5,
                        color: '#fff',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        userSelect: 'none'
                    }}
                >
                    {convertAbsolutePathToFilename(url)}
                </Typography>
            </Box>
        </Paper>
    );
};
