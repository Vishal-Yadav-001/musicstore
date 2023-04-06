import {
  NavigateBeforeSharp,
  NavigateNext,
  PauseCircle,
  PlayCircle,
} from "@mui/icons-material";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";

import ReactHowler from "react-howler";
import { UserContext, UserProvider } from "../context/musicstore.context";
import DefaultImage from "../assets/images/imag1.jpg";
import "./audioplayer.styles.css";
export const OnlyPlayPauseButton = () => {
  const { selectedSong, authToken } = useContext(UserContext);
  const [playing, setPlaying] = useState(false);
  const [songURL, setSongURL] = useState([""]);
  const handlePlay = () => {
    // const baseUrl = `http://localhost:4000/api/songs/${selectedSong?.audio}`;
    const baseUrl = `https://3ii4kl7onf.execute-api.us-east-1.amazonaws.com/api/songs/${selectedSong?.audio}`;
    setSongURL(baseUrl);
    setPlaying(true);
  };

  const handlePause = () => {
    setPlaying(false);
  };
  useEffect(() => {}, [selectedSong]);

  return (
    <div style={{ textAlign: "center" }}>
      <Card className="player_container">
        <CardContent>
          <Typography color="secondary">
            {selectedSong?.title || " Music Name"}
           
          </Typography>
          <img
            className="player_image"
            width="200px"
            alt={selectedSong?.title}
            src={selectedSong?.imageUrl || DefaultImage}
          />
          <ReactHowler
            src={songURL}
            xhr={{ method: "GET", headers: { "auth-token": authToken } }}
            playing={playing}
            format={["ogg", "mp3"]}
            volume={0.5}
          />
        </CardContent>
        <CardActionArea>
          <IconButton size="large"
            onClick={() => {
              playing ? handlePause() : handlePlay();
            }}
          >
            {playing ? <PauseCircle sx={{fontSize:"40px"}} /> : <PlayCircle sx={{fontSize:"40px"}} />}
          </IconButton>
        </CardActionArea>
      </Card>
    </div>
  );
};
