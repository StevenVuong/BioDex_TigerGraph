import React from "react";
import { CircularProgress, Grid } from "@mui/material";

export default function CenteredSpinner() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        <CircularProgress />
      </Grid>
    </Grid>
  );
}
