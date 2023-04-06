import { AudioFile, Upload } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import {
  createSong,
  deleteSong,
  getSongs,
  sendAudioToServer,
} from "../api/api.service";
import { UserContext } from "../context/musicstore.context";
import { Player } from "@lottiefiles/react-lottie-player";
import UploadImage from "../assets/images/image.png";
import { handleFileUpload } from "../api/util";

export const Songs = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [label, setLabel] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState({
    image_as_base64_preview: null,
    image_file: null,
  });

  const [audioFile, setAudioFile] = useState(null);
  const [songId, setSongId] = useState(null);
  const [disableForm, setDisableForm] = useState(true);

  const {
    authToken,
    songs,
    fetchRealTimeSongs,
    handleNotifications,
    userDetails,
    setSongs
  } = useContext(UserContext);
  const isAdmin = userDetails?.roles === "ADMIN";
  const saveSong = () => {
    let formData = new FormData();
    formData.append("imageFile", image?.image_file);
    formData.append("audio", songId);
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("label", label);
    formData.append("genre", genre);
    createSong(formData, authToken)
      .then((response) => {
        const { data } = response;
        handleNotifications({ flag: "success", message: data?.message });
        fetchRealTimeSongs(data?.data);
        setArtist("");
        setGenre("");
        setTitle("");
        setLabel("");
        setImage("");
        setDisableForm(true);
      })
      .catch((err) => {
        const { response } = err;
        handleNotifications({
          flag: "error",
          message: response?.data?.message,
        });
      });
  };

  const uploadAudio = () => {
    let formData = new FormData();
    formData.append("audioFile", audioFile);
    console.log(formData);
    sendAudioToServer(formData, authToken)
      .then((response) => {
        const { data } = response;
        handleNotifications({ flag: "success", message: data?.message });
        setSongId(data?.songId);
        setDisableForm(false);
      })
      .catch((err) => {
        const { response } = err;
        handleNotifications({
          flag: "error",
          message: response?.data?.message,
        });
      });
  };

  useEffect(() => {
    if (authToken) {
      fetchRealTimeSongs();
    }
  }, []);

  const handleDeleteSong = (songId) => {
    deleteSong(authToken, songId)
      .then((response) => {
        const { data } = response;
        handleNotifications({ flag: "success", message: data?.message });
        fetchRealTimeSongs();
        const filteredSongsList = songs?.filter(song => song?._id !== songId);
        if(filteredSongsList?.length >0){
          setSongs(...filteredSongsList);
        }else{
          setSongs([]);
        }

      })
      .catch((error) => {
        const { data } = error.response;
        handleNotifications({ flag: "error", message: data?.message });
      });
  };
  const fileInBase64Format = async (event) => {
    const file = await handleFileUpload(event);
    setImage({
      image_as_base64_preview: file,
      image_file: event.target.files[0],
    });
  };
  return (
    <Box>
      {isAdmin ? (
        <Stack direction="row" flexGrow={1} flexWrap="wrap" gap="2rem">
          <Box width="48%">
            <Typography variant="h4" textAlign="left">
              Add Songs
            </Typography>
            <Divider light sx={{ background: "white" }} />
            <Stack
              direction="row"
              flexWrap="wrap"
              component="form"
              encType="multipart/form-data"
            >
              <Box sx={{ marginTop: "16px", width: "50%" }}>
                <label htmlFor="audioFile">
                  <AudioFile />
                  Choose audio file
                </label>
                <input
                  label="upload_audio"
                  accept=".mp3,.ogg"
                  style={{ display: "none" }}
                  type="file"
                  name="audioFile"
                  id="audioFile"
                  onChange={(event) => setAudioFile(event.target.files[0])}
                />
              </Box>
              <Box>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => uploadAudio()}
                  sx={{ margin: "16px", background: "accent.light" }}
                >
                  Upload
                </Button>
              </Box>
            </Stack>
            <Stack
              direction="row"
              flexWrap="wrap"
              component="form"
              encType="multipart/form-data"
            >
              <TextField
                color="primary"
                inputProps={{ sx: { color: "white" } }}
                InputLabelProps={{ sx: { color: "white", marginLeft: 0 } }}
                label="title"
                variant="outlined"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                sx={{ margin: "16px" }}
                disabled={disableForm}
              />
              <TextField
                color="primary"
                inputProps={{ sx: { color: "white" } }}
                InputLabelProps={{ sx: { color: "white", marginLeft: 0 } }}
                label="artist"
                value={artist}
                variant="outlined"
                onChange={(event) => setArtist(event.target.value)}
                sx={{ margin: "16px" }}
                disabled={disableForm}
              />
              <TextField
                color="primary"
                inputProps={{ sx: { color: "white" } }}
                InputLabelProps={{ sx: { color: "white", marginLeft: 0 } }}
                label="label"
                variant="outlined"
                value={label}
                onChange={(event) => setLabel(event.target.value)}
                sx={{ margin: "16px" }}
                disabled={disableForm}
              />
              <TextField
                color="primary"
                inputProps={{ sx: { color: "white" } }}
                InputLabelProps={{ sx: { color: "white", marginLeft: 0 } }}
                label="genre"
                variant="outlined"
                value={genre}
                onChange={(event) => setGenre(event.target.value)}
                sx={{ margin: "16px" }}
                disabled={disableForm}
              />
              <Box sx={{ margin: "16px", marginLeft: ".1rem" }}>
                <label htmlFor="imageFile">
                  Choose image
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
                  name="imageFile"
                  id="imageFile"
                  onChange={(e) => {
                    fileInBase64Format(e);
                  }}
                />
              </Box>
            </Stack>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => saveSong()}
              sx={{ margin: "16px", background: "accent.light" }}
              disabled={disableForm}
            >
              Save
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
            {songs && songs?.length > 0 ? (
              songs?.map((song) => {
                return (
                  <Card key={songs.id} sx={{ marginTop: "6px" }}>
                    <CardContent
                      sx={{
                        backgroundColor: "other.dark",
                        display: "flex",
                        flexDirection: "row",
                        // justifyContent: "space-evenly",
                        alignItems: "center",
                      }}
                    >
                      <Typography style={{ width: "18%" }}>
                        {song?.imageUrl ? (
                          <img
                            width="50%"
                            style={{ borderRadius: "5%" }}
                            src={song?.imageUrl}
                            alt="song_pic"
                          />
                        ) : (
                          ""
                        )}
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
                      <Button
                        color="secondary"
                        variant="contained"
                        size="small"
                        onClick={() => handleDeleteSong(song?._id)}
                      >
                        <Typography>Delete</Typography>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <Box sx={{ padding: "1rem" }}>
                <Typography variant="h5">
                  No Songs available to. Please add songs
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
      ) : (
        <Box>
          <Typography>Sorry Only Amin can Access this page.</Typography>
        </Box>
      )}
    </Box>
  );
};
