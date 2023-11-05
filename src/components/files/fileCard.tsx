import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";

export const FileCards = ({ files }: { files: string[] }) => {
  console.log(files);
  return (
    <Box
      sx={{
        margin: "20px",
        width: "350px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      {files.map((url) => (
        <FileCard url={url} />
      ))}
    </Box>
  );
};

const convertAbsolutePathToFilename = (path: string): string => {
  let fileName = path.replace(/^.*[\\/]/, "");
  return fileName;
};

const FileCard = ({ url }: { url: string }) => {
  return (
    <Card
      sx={{
        width: 95,
        height: 105,
        backgroundColor: "#3c4145",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          gap: 0.8,
        }}
      >
        <DescriptionIcon sx={{ fontSize: "50px", color: "#fff" }} />
        <Typography
          sx={{
            fontSize: 12,
            marginTop: "4px",
            color: "#fff",
            textOverflow: "ellipsis",
            overflow: "hidden",
            width: 70,
            whiteSpace: "nowrap",
          }}
        >
          {convertAbsolutePathToFilename(url)}
        </Typography>
      </CardContent>
    </Card>
  );
};
