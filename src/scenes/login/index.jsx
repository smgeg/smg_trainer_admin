import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import Logo from "../../assets/images/logo.png";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const navigate = useNavigate();
  const handleLogin = () => {
    console.log("Username:", username);
    console.log("Password:", password);
    if (username === "admin" && password === "admin") {
      localStorage.setItem("username", username);
      localStorage.setItem("role", "administrator");
      navigate("/");
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <img src={Logo} alt="Logo" style={{ width: 200, marginTop: 50 }} />
      <TextField
        label="Username"
        value={username}
        onChange={handleUsernameChange}
        style={{ marginTop: 50, width: 200 }}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        style={{ marginTop: 20, width: 200 }}
      />
      <Button
        variant="contained"
        onClick={handleLogin}
        style={{ marginTop: 20 }}
      >
        Login
      </Button>
    </div>
  );
}

export default LoginPage;
