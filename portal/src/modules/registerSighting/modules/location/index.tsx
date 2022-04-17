import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useRegisterSightingStore } from "../../data/constant";

function Location() {
  const store = useRegisterSightingStore();
  const [longitudeValue, setLongitudeValue] = useState(
    store.location ? store.location.longitude : 0
  );
  const [latitudeValue, setLatitudeValue] = useState(
    store.location ? store.location.latitude : 0
  );

  const onLongitudeChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => setLongitudeValue(parseInt(e.target.value, 10));
  const onLatitudeChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => setLatitudeValue(parseInt(e.target.value, 10));
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Upload Image
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="longitude"
            name="longitude"
            type="number"
            label="Longitude"
            fullWidth
            value={longitudeValue}
            onChange={onLongitudeChange}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="latitude"
            name="latitude"
            type="number"
            label="latitude"
            fullWidth
            value={latitudeValue}
            onChange={onLatitudeChange}
            variant="standard"
          />
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={() => {
            store.setLocation({
              longitude: longitudeValue,
              latitude: latitudeValue,
            });
          }}
          sx={{ mt: 3, ml: 1 }}
        >
          Submit finding
        </Button>
      </Box>
    </>
  );
}

export default observer(Location);
