import {
  Box,
  Button,
  Container,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { RegisterSightingStoreContext } from "./data/constant";
import RegisterSightingStore from "./data/store";
import SelectSpecies from "./modules/selectSpecies";
import Location from "./modules/location";
import UploadImage from "./modules/uploadImage";
import Review from "./modules/review";

const steps = [
  { title: "Upload Image", component: <UploadImage /> },
  { title: "Select Species", component: <SelectSpecies /> },
  { title: "Location of Sighting", component: <Location /> },
  { title: "Review", component: <Review /> },
];

function RegisterSighting() {
  const [store] = useState(() => new RegisterSightingStore());

  return (
    <Container component="main" maxWidth="md" sx={{ mb: 6 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <RegisterSightingStoreContext.Provider value={store}>
          <Typography component="h1" variant="h4" align="center">
            Register Sighting
          </Typography>
          <Stepper activeStep={store.stepIndex} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label.title}>
                <StepLabel>{label.title}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box>{steps[store.stepIndex].component}</Box>
        </RegisterSightingStoreContext.Provider>
      </Paper>
    </Container>
  );
}

export default observer(RegisterSighting);
