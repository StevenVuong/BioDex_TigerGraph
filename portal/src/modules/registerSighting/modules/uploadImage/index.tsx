import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useRegisterSightingStore } from "../../data/constant";

function UploadImage() {
  const store = useRegisterSightingStore();
  const [textValue, setTextValue] = useState<string>(store.url);

  const onTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => setTextValue(e.target.value);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Upload Image
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="url"
            name="pictureUrl"
            label="Url of Picture"
            fullWidth
            value={textValue}
            onChange={onTextChange}
            variant="standard"
          />
        </Grid>
      </Grid>
      {store.requestError}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={() => {
            store.uploadImage(textValue);
          }}
          sx={{ mt: 3, ml: 1 }}
        >
          Find Species
        </Button>
      </Box>
    </>
  );
}

export default observer(UploadImage);
