import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useRegisterSightingStore } from "../../data/constant";

function SelectSpecies() {
  const store = useRegisterSightingStore();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Select Species
      </Typography>
      <Grid container spacing={3}>
        {store.species.map((item) => {
          return (
            <Grid item xs={12} sm={6} key={item.name}>
              <Card>
                <CardMedia
                  component="img"
                  height="250"
                  image={`${process.env.PUBLIC_URL}/animals/${
                    item.name.split("/")[1]
                  }/0.jpg`}
                  alt={item.name.split("/")[1]}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2" component="div">
                    {Number.parseFloat(item.probability + "").toFixed(2)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={(event) => {
                      store.selectSpecie(item.name);
                    }}
                  >
                    Select Species
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={(event) => {
            store.previousStep();
          }}
          sx={{ mt: 3, ml: 1 }}
        >
          Back
        </Button>
      </Box>
    </>
  );
}

export default SelectSpecies;
