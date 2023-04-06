import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/musicstore.context";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { deletePlaylist } from "../api/api.service";
import { OnlyPlayPauseButton } from "./audioplayer.component";
import DefaultImage from "../assets/images/imag1.jpg";
export const MusicPlayer = () => {
  const { playlist, authToken, handleNotifications, fetchRealTimePlaylists, setSelectedSong } =
    useContext(UserContext);
  const { id } = useParams();
  const [playerData, setPlayerData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (playlist?.length > 0 && id) {
      const contentList = playlist?.filter((list) => list?._id === id);
      setPlayerData(contentList);
    }
  }, []);

  const handleDeletePlaylist = (event) => {
    const id = playerData[0]?._id;
    deletePlaylist(authToken, id)
      .then((response) => {
        const { data } = response;
        handleNotifications({ flag: "success", message: data?.message });
        fetchRealTimePlaylists(authToken);
        setPlayerData(null);
        navigate("/home");
      })
      .catch((error) => {
        const { response } = error;
        handleNotifications({
          flag: "error",
          message: response?.data?.message,
        });
      });
  };
  const handlePlaySong = (song) =>{
    setSelectedSong(song);
  }

  return (
    <div>
      <Stack direction="column" flexGrow={1}>
        <Stack direction="row">
          <img
            style={{ width: "200px", height: "200px", borderRadius: "10px" }}
            src={playerData && playerData[0]?.imageUrl}
            alt="playlist"
          />

          <Box sx={{ paddingLeft: "2rem" }}>
            <Box>
              <Typography fontSize="2rem">{playerData[0]?.name}</Typography>
              <Divider color="accent" />
            </Box>
            <Typography fontSize="1rem" paddingTop="1rem">
              Songs count : {playerData[0]?.songs?.length}
            </Typography>
            <Button
              color="secondary"
              sx={{ marginTop: "1rem" }}
              variant="contained"
              size="medium"
              onClick={() => handleDeletePlaylist()}
            >
              Delete
            </Button>
          </Box>
        </Stack>
        <Stack paddingTop="1rem" direction="row" gap="10%">
          <Box width="40%">
            <Typography fontSize="1.3rem">Songs</Typography>
            <Divider color="accent" />
            <Box
              sx={{
                paddingTop: "16px",
                display: "flex",
                flexDirection: "row",
                // justifyContent: "space-evenly",
                alignItems: "center",
              }}
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
              <Typography textAlign="center" style={{ width: "18%" }}>
                Action
              </Typography>
            </Box>
            {playerData &&
              playerData[0]?.songs &&
              playerData[0]?.songs?.map((song) => {
                return (
                  <Card sx={{ marginTop: "6px" }}>
                    <CardContent
                      sx={{
                        backgroundColor: "other.dark",
                        display: "flex",
                        flexDirection: "row",

                        alignItems: "center",
                      }}
                    >
                      <Typography textAlign="center" style={{ width: "18%" }}>
                      <img
                            width="50%"
                            style={{ borderRadius: "5%" }}
                            src={song?.imageUrl || DefaultImage}
                            alt="song_pic"
                          />
                      </Typography>
                      <Typography textAlign="center" style={{ width: "18%" }}>
                        {song?.title}
                      </Typography>
                      <Typography textAlign="center" style={{ width: "18%" }}>
                        {song?.artist}
                      </Typography>
                      <Typography textAlign="center" style={{ width: "18%" }}>
                        {song?.genre}
                      </Typography>
                      <Typography textAlign="center" style={{ width: "18%" }}>
                        {song?.label}
                      </Typography>
                      <Typography textAlign="center" style={{ width: "18%" }}>
                        {" "}
                        <Button
                          color="secondary"
                          variant="contained"
                          size="small"
                          onClick={()=> handlePlaySong(song) }
                        >
                          <Typography>Play</Typography>
                        </Button>
                      </Typography>
                    </CardContent>
                  </Card>
                );
              })}
          </Box>

          <Box width="40%" >
           <OnlyPlayPauseButton/>
          </Box>
        </Stack>
      </Stack>
    </div>
  );
};
