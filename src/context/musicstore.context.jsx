import React from "react";
import { createContext, useState } from "react";
import { useNavigation } from "react-router-dom";
import { getSongs, getUserPlaylist } from "../api/api.service";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(songs[0]);
  const handleNotifications = (messageObject) => {
    setNotification({
      flag: messageObject?.flag,
      message: messageObject?.message,
    });
    setShowNotification(true);
    return;
  };

  const logoutUser = () => {
    setAuthToken(null);
    setIsLoggedIn(false);
    setSongs([]);
    setPlaylist([]);
    handleNotifications({ flag: "success", message: "Logout Successfully" });
  };

  const fetchRealTimeSongs = (song) => {
    if (song) {
      setSongs((prev) => [...prev, song]);
    } else {
      if (!songs.length > 0) {
        getSongs(authToken)
          .then((response) => {
            const { data } = response?.data;
            setSongs(data);
          })
          .catch((error) => {
            const { data } = error.response;
            handleNotifications({ flag: "error", message: data?.message });
          });
      }
    }
  };

  const fetchRealTimePlaylists = () => {
    getUserPlaylist(authToken)
      .then((response) => {
        const { data } = response?.data;
        setPlaylist(data);
      })
      .catch((error) => {
        const { data } = error.response;
        handleNotifications({ flag: "error", message: data?.message });
      });
  };

  return (
    <UserContext.Provider
      value={{
        notification,
        showNotification,
        handleNotifications,
        setShowNotification,
        userDetails,
        setUserDetails,
        setIsLoggedIn,
        isLoggedIn,
        authToken,
        setAuthToken,
        logoutUser,
        songs,
        fetchRealTimeSongs,
        setPlaylist,
        playlist,
        fetchRealTimePlaylists,
        selectedSong,
        setSelectedSong,
        setSongs
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
