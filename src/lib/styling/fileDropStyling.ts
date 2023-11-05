import { SxProps, Theme } from "@mui/material";

export const fileDropStyling = {
  onHover(): SxProps {
    return {
      width: "84%",
      height: "80%",
      top: 0,
      margin: "20px",
      position: "absolute",
      transition: "width 2s",
      border: "dashed white 20px",
      boxShadow: "none",
      borderRadius: "20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    };
  },
};
