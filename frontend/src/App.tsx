import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "./context/Snackbar.context";
import { AuthContextProvider } from "./context/Auth.context";
import { ThemeProvider } from "./context/Theme.context";
import "./App.css";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <SnackbarProvider>
        <AuthContextProvider>
          <ThemeProvider>
            <QueryClientProvider client={queryClient}>
              <Routes />
            </QueryClientProvider>
          </ThemeProvider>
        </AuthContextProvider>
      </SnackbarProvider>
    </BrowserRouter>
  );
}
