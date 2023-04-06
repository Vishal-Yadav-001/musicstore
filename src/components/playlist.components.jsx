import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  Stack,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../context/musicstore.context";
import { Player } from "@lottiefiles/react-lottie-player";
import { createPlaylist } from "../api/api.service";
import UploadImage from "../assets/images/image.png";
import { handleFileUpload } from "../api/util";

export const Playlist = () => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [playListImage, setPlayListImage] = useState("");
  const {
    authToken,
    songs,
    fetchRealTimeSongs,
    handleNotifications,
    userDetails,
    fetchRealTimePlaylists,
  } = useContext(UserContext);
  const isAdmin = userDetails?.roles === "ADMIN";
  const handleCreatePlaylist = (e) => {
    e.preventDefault();

    const playlist = {
      name: playlistName,
      user: userDetails?._id,
      songs: playlistSongs,
      imageUrl: playListImage,
    };
    createPlaylist(playlist, authToken)
      .then((response) => {
        const { data } = response;
        handleNotifications({ flag: "success", message: data?.message });
        fetchRealTimePlaylists(authToken);
      })
      .catch((err) => {
        const { response } = err;
        handleNotifications({
          flag: "error",
          message: response?.data?.message,
        });
      });
  };
  const addToPlaylist = (newSong) => {
    setPlaylistSongs(() => {
      if (
        playlistSongs?.findIndex((song) => song.title === newSong.title) === -1
      ) {
        return [...playlistSongs, newSong];
      }
      return [...playlistSongs];
    });
  };

  const fileInBase64Format = async (e) => {
    const file = await handleFileUpload(e);
    setPlayListImage(file);
  };

  return (
    <Box>
      <Stack direction="row" flexGrow={1} flexWrap="wrap" gap="2rem">
        <Box
          component="form"
          width="48%"
          onSubmit={(e) => handleCreatePlaylist(e)}
        >
          <Typography variant="h4" textAlign="left">
            Playlist Info
          </Typography>
          <Divider light sx={{ background: "white" }} />
          <Stack direction="row" flexWrap="wrap">
            <TextField
              color="primary"
              inputProps={{ sx: { color: "white" } }}
              InputLabelProps={{ sx: { color: "white", marginLeft: 0 } }}
              label="Name"
              variant="outlined"
              value={playlistName}
              onChange={(event) => setPlaylistName(event.target.value)}
              sx={{ margin: "16px" }}
            />

            <Box sx={{ margin: "16px" }}>
              <label htmlFor="playlist_image">
                Choose image{" "}
                <img
                  src={UploadImage}
                  style={{ position: "absolute" }}
                  width="30px"
                  alt="upload"
                />
              </label>
              <input
                label="upload_image"
                accept=".jpg,.png,.jpeg"
                style={{ display: "none" }}
                type="file"
                name="playlist_image"
                id="playlist_image"
                onChange={(e) => {
                  fileInBase64Format(e);
                }}
              />
            </Box>
            <Card
              sx={{
                height: "300px",
                width: "300px",
                overflow: "auto",
                margin: "16px",
              }}
            >
              {playlistSongs && playlistSongs?.length > 0 ? (
                playlistSongs?.map((song) => {
                  return (
                    <CardContent
                      key={song?._id}
                      sx={{ backgroundColor: "other.dark" }}
                    >
                      <Typography>{song.title}</Typography>
                    </CardContent>
                  );
                })
              ) : (
                <CardContent
                  sx={{ backgroundColor: "other.dark", height: "100%" }}
                >
                  <Typography textAlign="center">
                    Please add songs from right menu
                  </Typography>
                </CardContent>
              )}
            </Card>
          </Stack>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            sx={{ margin: "16px", background: "accent.light" }}
          >
            Create
          </Button>
        </Box>
        <Box width="48%">
          <Typography variant="h4">All Songs</Typography>
          <Divider light sx={{ background: "white" }} />
          <Box
            sx={{
              paddingTop: "16px",
              display: "flex",
              flexDirection: "row",
              // justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
          <Typography textAlign="center"  style={{ width: "18%" }}>Image</Typography>
              <Typography textAlign="center" style={{ width: "18%" }}>Title</Typography>
              <Typography textAlign="center" style={{ width: "18%" }}>Artist</Typography>
              <Typography textAlign="center" style={{ width: "18%" }}>Genre</Typography>
              <Typography textAlign="center" style={{ width: "18%" }}>Label</Typography>
              <Typography textAlign="center" style={{ width: "18%" }}>Action</Typography>
          </Box>
          {songs && songs?.length > 0 ? (
            songs?.map((song) => {
              return (
                <Card sx={{ marginTop: "6px" }}>
                  <CardContent
                    sx={{
                      backgroundColor: "other.dark",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                  >
                    <Typography textAlign="center"  style={{ width: "18%" }}>
                    <img
                            width="50%"
                            style={{ borderRadius: "5%" }}
                            src={song?.imageUrl}
                            alt="song_pic"
                          />
                    </Typography>
                    <Typography textAlign="center"  style={{ width: "18%" }}>{song?.title}</Typography>
                    <Typography textAlign="center"  style={{ width: "18%" }}>{song?.artist}</Typography>
                    <Typography textAlign="center"  style={{ width: "18%" }}>{song?.genre}</Typography>
                    <Typography textAlign="center"  style={{ width: "18%" }}>{song?.label}</Typography>
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() => addToPlaylist(song)}
                      size="small"
                    >
                      <Typography>Add</Typography>
                    </Button>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Box sx={{ padding: "1rem" }}>
              <Typography>
                No Songs available to. Please{" "}
                {isAdmin ? "" : "request Admin to"} add songs
              </Typography>
              <Player
                autoplay
                loop
                src="https://assets1.lottiefiles.com/private_files/lf30_e3pteeho.json"
                style={{ width: "400px", height: "400px" }}
              />
            </Box>
          )}
        </Box>
      </Stack>
    </Box>
  );
};
