import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ApiResponse } from "../../../../common/client";
import CenteredSpinner from "../../../../common/components/centeredSpinner";
import LocationCard from "../../../../common/components/locationCard";
import TaxonCard from "../../../../common/components/taxonCard";
import { toTitleCase } from "../../../../common/textFormat";

type Body = {
  id: string;
  status: string;
  rank: string;
  canonicalName: string;
  genericName: string;
  parent?: {
    id: string;
    scientificName: string;
    canonicalName: string;
    genericName: string;
    specificEpithet: string;
  };
  children?: {
    offset: number;
    limit: number;
    endOfRecords: boolean;
    results: {
      id: string;
      status: string;
      rank: string;
      canonicalName: string;
      genericName: string;
    }[];
  };
  location?: {
    offset: number;
    limit: number;
    endOfRecords: boolean;
    results: {
      taxonKey: number;
      country: string;
      locality?: string;
      threatStatus: string;
      source: string;
      sourceTaxonKey: number;
    }[];
  };
};

export default function Taxon() {
  const { taxonId } = useParams();
  const [request, setRequest] = useState<ApiResponse<Body>>({
    status: "pending",
    data: null,
  });
  useEffect(() => {
    let mounted = true;
    setRequest({
      status: "pending",
      data: null,
    });
    fetch(`http://localhost:3080/taxon/${taxonId}`).then(async (response) => {
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
    });
    return () => {
      mounted = false;
    };
  }, [taxonId]);

  if (request.status === "pending") {
    return <CenteredSpinner />;
  }
  if (request.status === "error") {
    return <>Error</>;
  }
  return (
    <Container>
      <Typography variant="h2">
        {toTitleCase(request.data.genericName)}
      </Typography>
      {request.data.canonicalName && (
        <>
          <Card sx={{ display: "flex" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                Canonical name: {request.data.canonicalName}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Rank : {toTitleCase(request.data.rank)}
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              sx={{ width: 164 }}
              image={`${process.env.PUBLIC_URL}/animals/${request.data.canonicalName}/0.jpg?w=164&h=164&fit=crop&auto=format`}
              alt=" "
            />
          </Card>
        </>
      )}
      {!request.data.canonicalName && (
        <Typography variant="h6" gutterBottom>
          <i>Rank : {toTitleCase(request.data.rank)}</i>
        </Typography>
      )}
      <Divider />
      {request.data.parent && (
        <>
          <Typography variant="subtitle1" paddingTop={"12px"} gutterBottom>
            <Button component={Link} to={`/species/${request.data.parent.id}`}>
              <ArrowDropUpRoundedIcon />
              Parent Taxon: {request.data.parent.genericName}
            </Button>
          </Typography>
          <Typography gutterBottom></Typography>
          <Divider variant={"inset"} />
        </>
      )}
      {request.data.location && (
        <>
          <Typography variant="h5" paddingTop={"12px"} gutterBottom>
            Locations Found
          </Typography>
          <Grid container spacing={1} alignItems="stretch">
            {request.data.location.results
              .filter((item) => item.country || item.locality)
              .slice(0, 12)
              .map((item) => (
                <LocationCard key={item.country} {...item} />
              ))}
          </Grid>
        </>
      )}
      {request.data.children && (
        <>
          <Typography variant="h5" paddingTop={"12px"} gutterBottom>
            Children
          </Typography>
          <Grid container spacing={3}>
            {request.data.children.results.slice(0, 12).map((item) => (
              <TaxonCard key={item.id} {...item} />
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
}
