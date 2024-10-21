import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
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
    <BrowserRouter>
      <SnackbarProvider>
        <AuthContextProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <QueryClientProvider client={queryClient}>
              <Routes></Routes>;
            </QueryClientProvider>
          </ThemeProvider>
        </AuthContextProvider>
      </SnackbarProvider>
    </BrowserRouter>
  );
}
