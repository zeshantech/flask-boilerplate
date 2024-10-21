import { Card, CardContent, Avatar, Typography, Alert, CircularProgress, styled, Stack, Box, IconButton } from "@mui/material";
import { Refresh } from "@mui/icons-material";
import { useGetUser } from "../hooks/query.hooks";
import { useEffect } from "react";

export default function UserDataCard() {
  const { data: user, isLoading, isFetching, isError, refetch } = useGetUser();

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading || isFetching) {
    return <CircularProgress />;
  }

  if (isError || !user) {
    return <Alert color="error">Failed to load user data</Alert>;
  }

  return (
    <Card sx={{ width: 400 }}>
      <CardContent component={Stack} alignItems={"center"}>
        <Stack  alignItems="flex-end" width="100%">
          <IconButton size="small" onClick={() => refetch()}>
            <Refresh fontSize="inherit" />
          </IconButton>
        </Stack>
        <AvatarContainer>
          <StyledAvatar src={user.avatar_url || "/default-avatar.png"} alt={`${user.first_name} ${user.last_name}`} />
        </AvatarContainer>
        <Stack direction={"row"} justifyContent={"space-between"} mt={2} width={"100%"}>
          <Typography>Name:</Typography>
          <Typography>{`${user.first_name} ${user.last_name}`}</Typography>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"} my={1} width={"100%"}>
          <Typography>Email:</Typography>
          <Typography>{user.email}</Typography>
        </Stack>
        <Typography variant="body1" color="text.secondary">
          {user.bio || "You have no bio"}
        </Typography>
      </CardContent>
    </Card>
  );
}

const AvatarContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  background: theme.palette.grey[200],
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  height: theme.spacing(20),
  width: theme.spacing(20),
  margin: "auto",
  borderRadius: 0,
}));
