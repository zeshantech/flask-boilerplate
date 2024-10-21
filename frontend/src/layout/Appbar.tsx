import { AppBar, Toolbar, Typography, IconButton, useColorScheme, Stack, Box } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useGetUser } from "../features/home/hooks/query.hooks";
import Button from "../components/Button";
import { useAuth } from "../context/Auth.context";
import { Outlet, useNavigate } from "react-router-dom";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function Appbar() {
  const { setMode, mode } = useColorScheme();
  const navigate = useNavigate();
  const { handleOnLogout } = useAuth();
  const { data } = useGetUser();

  const handleSetColorScheme = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    handleOnLogout();
    navigate("/auth/login");
  };

  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {data?.first_name ?? "Your"} Dashboard
          </Typography>

          <Stack gap={2} direction={"row"}>
            <IconButton onClick={handleSetColorScheme} color="inherit">
              {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            <Button size="small" color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Fragment>
  );
}
