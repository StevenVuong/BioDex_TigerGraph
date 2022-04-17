import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
import {
  Avatar,
  Button,
  Card as MUICard,
  CardContent,
  CardHeader,
  Grid,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export type CardProps = {
  id: string;
  genericName: string;
  canonicalName: string;
  img?: string;
};

export default function TaxonCard({
  id,
  genericName,
  canonicalName,
  img,
}: CardProps) {
  return (
    <Grid item md={4} lg={3}>
      <MUICard variant="outlined" style={{ height: "100%" }}>
        <CardHeader
          avatar={
            <Avatar alt={genericName} src={img}>
              <HourglassEmptyRoundedIcon />
            </Avatar>
          }
          title={genericName}
          subheader={canonicalName}
        />
        <CardContent>
          <Button component={Link} to={`/species/${id}`}>
            More Information
          </Button>
        </CardContent>
      </MUICard>
    </Grid>
  );
}
