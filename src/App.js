import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import {  Outlet, Route, Routes, } from "react-router-dom";
import theme from "./theme.component";
import Layout from "./components/layout";
import { Songs } from "./components/songs.component";
import Login from "./components/login.component";
import {  UserProvider } from "./context/musicstore.context";
import NotificationManager from "./components/notification.components";

import Home from "./components/home.component";
import { Playlist } from "./components/playlist.components";
import { MusicPlayer } from "./components/player.component";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <div className="App">
          <NotificationManager/>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <Outlet />
                </Layout>
              }
            >
              <Route path="/songs"  element={<Songs/>}></Route>
              <Route path="/home" element={<Home/>}/>
              <Route path="/playlist" element={<Playlist/>}/>
              <Route path="/player/:id" element={<MusicPlayer/>}/>
              <Route index element={<Login />}></Route>
            </Route>
            <Route path="*" element={<Layout/>}></Route>
          </Routes>
          <Outlet />
        </div>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
