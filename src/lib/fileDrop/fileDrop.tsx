import { Box } from "@mui/system";
import { listen } from "@tauri-apps/api/event";
import { useEffect, useState } from "react";
import { fileDropStyling } from "../styling/fileDropStyling";
import { Typography } from "@mui/material";

const styling = {
  onHover: fileDropStyling.onHover(),
};

export const FileDrop = ({
  children,
  fn,
}: {
  children: JSX.Element;
  fn: (file: string[]) => void;
}) => {
  const [isDropping, setIsDropping] = useState<boolean>(false);

  useEffect(() => {
    let fileDropListener = listen(
      "tauri://file-drop",
      async ({ event, payload }: { event: any; payload: string[] }) => {
        fn(payload);
        setIsDropping(false);
      }
    );
    listen("tauri://file-drop-hover", (e) => {
      setIsDropping(true);
    });

    listen("tauri://file-drop-cancelled", (e) => {
      setIsDropping(false);
    });

    return () => {
      fileDropListener.then((f) => f());
    };
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        boder: "solid red 2px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        animation: "inAnimation 1s",
      }}
    >
      {isDropping && (
        <Box className="animateOnMount" sx={styling.onHover}></Box>
      )}
      {isDropping && (
        <Typography
          className="loading"
          sx={{
            position: "absolute",
            top: "42%",
            color: "white",
            fontSize: "40px",
            fontFamily: "Gothic A1",
          }}
        >
          Almost there
        </Typography>
      )}

      <Box sx={{ display: isDropping ? "none" : "flex" }}>{children}</Box>
    </Box>
  );
};
