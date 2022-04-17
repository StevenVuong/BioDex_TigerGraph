import React from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LibraryAddCheckRoundedIcon from "@mui/icons-material/LibraryAddCheckRounded";
import LibraryAddRoundedIcon from "@mui/icons-material/LibraryAddRounded";
import TravelExploreRoundedIcon from "@mui/icons-material/TravelExploreRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const width = 240;

const routes = [
  { name: "Home", url: "", icon: <HomeRoundedIcon /> },
  {
    name: "Register Sighting",
    url: "/register-sighting",
    icon: <LibraryAddRoundedIcon />,
  },
  {
    name: "My Collection",
    url: "/collection",
    icon: <LibraryAddCheckRoundedIcon />,
  },
  // {
  //   name: "Guild",
  //   url: "/guild",
  //   icon: <PeopleRoundedIcon />,
  // },
  // {
  //   name: "Explore Species",
  //   url: "/species",
  //   icon: <TravelExploreRoundedIcon />,
  // },
];

export default function NavigationDrawer() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width, boxSizing: "border-box" },
      }}
    >
      {/* <Toolbar /> */}
      <Box sx={{ overflow: "auto" }}>
        <List>
          {routes.map(({ name, url, icon }) => (
            <ListItem to={url} component={RouterLink} button key={name}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
