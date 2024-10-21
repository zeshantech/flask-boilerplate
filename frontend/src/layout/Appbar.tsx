import { Fragment } from "react";
import { AppBar, Toolbar, Typography, IconButton, Stack } from "@mui/material";
import { useGetUser } from "../features/home/hooks/query.hooks";
import Button from "../components/Button";
import { useAuth } from "../context/Auth.context";
import { Outlet, useNavigate } from "react-router-dom";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "../context/Theme.context";

export default function Appbar() {
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { handleOnLogout } = useAuth();
  const { data } = useGetUser();

  const handleLogout = () => {
    handleOnLogout();
    navigate("/auth/login");
  };

  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {data?.first_name ? data?.first_name + "'s" : "Your"} Dashboard
          </Typography>

          <Stack gap={2} direction={"row"}>
            <IconButton onClick={toggleTheme} color="inherit">
              {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
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
