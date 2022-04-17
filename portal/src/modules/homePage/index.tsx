import React from "react";
import { Box, Container, Divider, Typography } from "@mui/material";

export default function HomePage() {
  return (
    <Container>
      <Typography component="h1" variant="h2" gutterBottom>
        BioDex
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Save the planet
      </Typography>
      <Divider sx={{ mb: 5 }} />
      <Typography variant="body1">
        How can we better connect people to nature? BioDex empowers users with
        that knowledge by putting it into their hands. Using a fast, scalable
        vision AI, we can classify 10,000 distinct species based on image and
        return an identification in less than a second. It doesn’t stop there,
        you can then see how the species of the image you took connects to all
        known species that have ever been identified, all 6.9M of them. Imagine
        doing all this, and getting rewards for it, with all your friends.
        Biodex’s answer is gamification.
      </Typography>
      <Box component="span" sx={{ display: "block", mt: 5 }}>
        <Typography variant="body1">
          BioDex gamifies the experience of connecting to nature. With a
          scalable AI image classifier, players can snap images of nature,
          identify its species and display its properties in real time. BioDex
          makes being outdoors a learning experience in itself.
        </Typography>
        <Typography variant="body1">
          BioDex challenges players to capture all initial 10,000 species. By
          joining guids, players can achieve this goal collectively. In the
          process, they are able to earn points for capturing novel species,
          traversing diverse taxa and engaging with the community.
        </Typography>
      </Box>
    </Container>
  );
}
