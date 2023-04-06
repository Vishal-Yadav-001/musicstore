import axios from "axios";
/**
 * Server Url or Lambda Url
 */
// const baseUrl = "http://localhost:4000";
const baseUrl = "https://3ii4kl7onf.execute-api.us-east-1.amazonaws.com";
export async function authenticateUserInfo(userInfo) {
  return await axios.post(baseUrl + "/api/users/login", userInfo);
}
export async function createUser(userInfo) {
  return axios.post(baseUrl + "/api/users/register", userInfo);
}

export async function createSong(songInfo, authToken) {
  const config = {
    headers: {
      "auth-token": authToken,
      "content-type": "multipart/form-data",
    },
  };
  return axios.post(baseUrl + "/api/songs/addSong", songInfo, config);
}

export async function getSongs(authToken) {
  const config = {
    headers: {
      "auth-token": authToken,
    },
  };
  return axios.get(baseUrl + "/api/songs/", config);
}

export async function deleteSong(authToken, id) {
  const config = {
    headers: {
      "auth-token": authToken,
    },
  };
  return axios.delete(baseUrl + "/api/songs/deleteSong/" + id, config);
}

export async function createPlaylist(playlist, authToken) {
  const config = {
    headers: {
      "auth-token": authToken,
    },
  };
  return axios.post(baseUrl + "/api/playlists/create", playlist, config);
}

export async function getUserPlaylist(authToken) {
  const config = {
    headers: {
      "auth-token": authToken,
    },
  };
  return axios.get(baseUrl + "/api/playlists/", config);
}

export async function deletePlaylist(authToken, id) {
  const config = {
    headers: {
      "auth-token": authToken,
    },
  };
  return axios.delete(baseUrl + "/api/playlists/delete/" + id, config);
}

export async function playAudio(songId, authToken) {
  const config = {
    headers: {
      "auth-token": authToken,
    },
  };
  return axios.get(baseUrl + "/api/songs/" + songId, config);
}

export async function sendAudioToServer(songInfo, authToken) {
  const config = {
    headers: {
      "auth-token": authToken,
      "content-type": "multipart/form-data",
    },
  };
  return axios.post(baseUrl + "/api/songs//uploadAudio", songInfo, config);
}
