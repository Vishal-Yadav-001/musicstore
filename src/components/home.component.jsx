import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/musicstore.context";
import { getSongs, getUserPlaylist } from "../api/api.service";
import { Add, AddToQueue, Favorite, PlayCircle } from "@mui/icons-material";
import { OnlyPlayPauseButton } from "./audioplayer.component";
import "./home.styles.css";
export default function Home() {
  const {
    authToken,
    songs,
    fetchRealTimeSongs,
    handleNotifications,
    setPlaylist,
    selectedSong,
    setSelectedSong,
  } = useContext(UserContext);
  useEffect(() => {
    if (authToken) {
      fetchRealTimeSongs();
      getUserPlaylist(authToken)
        .then((response) => {
          const { data } = response?.data;
          setPlaylist(data);
        })
        .catch((error) => {
          handleNotifications({ flag: "error", message: error?.message });
        });
    }
  }, []);


  const handlePlaySong = (song) =>{
    setSelectedSong(song);
  }

  return (
    <div className="home_container">
      <Box width="40%">
        <Typography paddingBottom="1rem"  variant="h4">Most Popular</Typography>
        <Divider color="accent" sx={{width:"40%",padding:"2px"}}  />
        <Box
          sx={{
            display: "flex",
            gap: "4px",
            justifyContent: "center",
            alignItems: "center",
          }}
          paddingTop={3}
        >
          <Typography textAlign="center" style={{ width: "18%" }}>
            Image
          </Typography>
          <Typography textAlign="center" style={{ width: "18%" }}>
            Title
          </Typography>
          <Typography textAlign="center" style={{ width: "18%" }}>
            Artist
          </Typography>
          <Typography textAlign="center" style={{ width: "18%" }}>
            Genre
          </Typography>
          <Typography textAlign="center" style={{ width: "18%" }}>
            Label
          </Typography>
        </Box>
        <Divider color="accent" />

        {songs?.map((song) => {
          return (
            <Card sx={{ margin: "8px" }}>
              <CardContent
                sx={{
                  display: "flex",
                  gap: "4px",
                  alignItems: "center",
                  backgroundColor: "secondary.main",
                }}
                onClick={()=> handlePlaySong(song)}
                
              >
                <Typography textAlign="center" style={{ width: "18%" }}>
                  <img
                    width="60%"
                    style={{ borderRadius: "15px" }}
                    src={song?.imageUrl}
                    alt="song_pic"
                  />
                </Typography>
                <Typography
                  textAlign="center"
                  style={{ width: "18%" }}
                  color="other.main"
                >
                  {song?.title}
                </Typography>
                <Typography
                  textAlign="center"
                  style={{ width: "18%" }}
                  color="other.main"
                >
                  {song?.artist}
                </Typography>
                <Typography
                  textAlign="center"
                  style={{ width: "18%" }}
                  color="other.main"
                >
                  {song?.genre}
                </Typography>
                <Typography
                  textAlign="center"
                  style={{ width: "18%" }}
                  color="other.main"
                >
                  {song?.label}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>
      <Box width="40%">
        <Typography paddingBottom="1rem"  variant="h4">Now Playing</Typography>
        <Divider color="accent" sx={{width:"40%",padding:"2px"}}  />
        <Box paddingTop={3}>
        <OnlyPlayPauseButton  />
        </Box>
        
      </Box>
    </div>
  );
}
