import { Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import Page from "../../components/Page";
import { useAuth } from "../../context/Auth.context";

export default function NotFoundPage() {
  const {isAuthenticated} = useAuth()
  return (
    <Page sx={{ textAlign: "center", py: 5 }}>
      <Box sx={{ my: 4 }}>
        <Typography variant="h1" color="error" fontWeight="bold">
          404
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
          Oops! The page you're looking for doesn't exist.
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          It seems the page you were trying to reach is not available. You may have mistyped the address or the page may have moved.
        </Typography>

        <Button variant="contained" component={Link} to={isAuthenticated ? '/dashboard' : '/auth/login'} sx={{ mt: 2 }}>
          Back to Home
        </Button>
      </Box>
    </Page>
  );
}
