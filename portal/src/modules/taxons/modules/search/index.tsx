import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import TaxonCard from "../../../../common/components/taxonCard";
import Search from "../../../../common/components/search";

const species = [
  {
    id: "1",
    genericName: "mittens",
    canonicalName: "pussy",
    img: "/nonExisting",
  },
  {
    id: "2",
    genericName: "Dog woof",
    canonicalName: "doggie",
    img: "/nonExisting",
  },
  {
    id: "2",
    genericName: "Dog woof",
    canonicalName: "doggie",
    img: "/nonExisting",
  },
  {
    id: "2",
    genericName: "Dog woof",
    canonicalName: "doggie",
    img: "/nonExisting",
  },

  {
    id: "2",
    genericName: "Dog woof",
    canonicalName: "doggie",
    img: "/nonExisting",
  },
  {
    id: "2",
    genericName: "Dog woof",
    canonicalName: "doggie",
    img: "/nonExisting",
  },
  {
    id: "2",
    genericName: "Dog woof",
    canonicalName: "doggie",
    img: "/nonExisting",
  },
];

export default function ExploreSpecies() {
  return (
    <Container>
      <Typography component="h1" variant="h2" gutterBottom>
        Search Species
      </Typography>
      <Search />
      <Grid container spacing={3}>
        {species.map((info) => (
          <TaxonCard {...info} />
        ))}
      </Grid>
    </Container>
  );
}
