import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";
import { SnackbarProvider } from "./context/Snackbar.context";
import { AuthContextProvider } from "./context/Auth.context";

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export default function App() {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <SnackbarProvider>
          <AuthContextProvider>
            <CssBaseline />
            <QueryClientProvider client={queryClient}>
              <Routes />
            </QueryClientProvider>
          </AuthContextProvider>
        </SnackbarProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
