import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#8e24aa",
    },
    secondary: {
      main: "#00897b",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
