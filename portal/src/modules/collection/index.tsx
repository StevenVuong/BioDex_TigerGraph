import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ApiResponse } from "../../common/client";
import CenteredSpinner from "../../common/components/centeredSpinner";
import TaxonCard, { CardProps } from "../../common/components/taxonCard";

function DisplayCollection() {
  const [request, setRequest] = useState<ApiResponse<CardProps[]>>({
    status: "pending",
    data: null,
  });
  useEffect(() => {
    let mounted = true;
    fetch(`http://localhost:3080/get_all_player_sightings`).then(
      async (response) => {
        const json = await response.json();
        if (mounted) {
          if (json.error) {
            setRequest({ status: "error", data: null });
            return;
          }
          setRequest({
            status: "success",
            data: json,
          });
        }
      }
    );
    return () => {
      mounted = false;
    };
  }, []);

  if (request.status === "pending") {
    return <CenteredSpinner />;
  }
  if (request.status === "error") {
    return <>Error</>;
  }

  return (
    <Grid container spacing={3}>
      {request.data.map((info) => (
        <TaxonCard {...info} />
      ))}
    </Grid>
  );
}

export default function Collection() {
  return (
    <Container>
      <Typography component="h1" variant="h2" gutterBottom>
        Found Species
      </Typography>
      {/* <Search /> */}
      <DisplayCollection />
    </Container>
  );
}
