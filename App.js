import React from "react";
import { SafeAreaView } from "react-native";
import { NativeRouter, Routes, Route } from "react-router-native";
import Login from "./views/Login.js";
import Home from "./views/Home.js";

const App = () => {
  return (
    <SafeAreaView>
      <NativeRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </NativeRouter>
    </SafeAreaView>
  );
};

export default App;
