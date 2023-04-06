import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import {
  Avatar,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
} from "@mui/material";
import {
  Home,
  MusicNote,
  PlayCircle,
  PlaylistAdd,
  QueueMusic,
  Search,
  Subscriptions,
} from "@mui/icons-material";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/musicstore.context";
import { Player } from "@lottiefiles/react-lottie-player";
import { useEffect } from "react";
import "./layout.styles.css";
import { getUserPlaylist } from "../api/api.service";
import { MusicPlayer } from "./player.component";
const drawerWidth = 240;

export default function Layout({ children }) {
  const navigate = useNavigate();
  const {
    isLoggedIn,
    logoutUser,
    authToken,
    playlist,
    setPlaylist,
    handleNotifications,
  } = useContext(UserContext);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <AppBar
        color="secondary"
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Music World
          </Typography>
          <TextField
            size="small"
            sx={{
              "& fieldset": { border: "none" },
              "& input": { color: "other.main" },
              backgroundColor: "accent.main",
              borderRadius: "10px",
              color: "red",
            }}
            InputProps={{
              placeholder: "What you wish?",
              endAdornment: (
                <InputAdornment position="end">
                  <Search color="other" />
                </InputAdornment>
              ),
            }}
          ></TextField>

          <IconButton>
            <Avatar>H</Avatar>
          </IconButton>

          <Button color="inherit" onClick={() => logoutUser()}>
            {isLoggedIn ? "Logout" : ""}
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "secondary.main",
            color: "other.main",
          },
        }}
      >
        <Toolbar />
        {isLoggedIn ? (
          <Box sx={{ overflow: "auto" }}>
            <List>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <Home color="other" />
                  </ListItemIcon>
                  <Link to="/home">Home</Link>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <QueueMusic color="other" />
                  </ListItemIcon>
                  <Link to="/playlist">Create Playlist</Link>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <Subscriptions color="other" />
                  </ListItemIcon>
                  <ListItemText>Subscription</ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <MusicNote color="other" />
                  </ListItemIcon>
                  <Link to="songs">Add Song</Link>
                </ListItemButton>
              </ListItem>
              <Divider color="accent" />
            </List>
            <List>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <PlaylistAdd color="other" />
                  </ListItemIcon>
                  <ListItemText>Playlists</ListItemText>
                </ListItemButton>
              </ListItem>
              {playlist && playlist.length > 0 ? (
                playlist?.map((playlist) => {
                  return (
                    <ListItem>
                      <ListItemButton onClick={()=> navigate("/player/"+ playlist?._id)}>
                        <ListItemIcon>
                          <MusicNote color="other" />
                        </ListItemIcon>
                        <ListItemText>{playlist?.name}</ListItemText>
                      </ListItemButton>
                    </ListItem>
                  );
                })
              ) : (
                <ListItem>
                  <Typography>
                    Nothing to show.Try creating a playlist
                  </Typography>
                </ListItem>
              )}
            </List>
          </Box>
        ) : (
          <Box alignSelf="center" paddingTop="4rem">
            <Typography fontSize="16px">Please Sign In to Play</Typography>
            <Player
              src="https://assets9.lottiefiles.com/packages/lf20_pprxh53t.json"
              style={{ width: "200px", height: "300px" }}
              loop
              autoplay
            />
          </Box>
        )}
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: "4rem",
          backgroundColor: "secondary.light",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
