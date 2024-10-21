import Page from "../../../components/Page";
import UserProfileCard from "../components/UserProfileCard";
import EditProfileForm from "../components/EditProfileForm";
import ChangePasswordForm from "../components/ChangePasswordForm";
import { Stack, Button, Dialog } from "@mui/material";
import { useState } from "react";

export default function DashboardPage() {
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);

  const handleOpenEditProfile = () => setOpenEditProfile(true);
  const handleCloseEditProfile = () => setOpenEditProfile(false);

  const handleOpenChangePassword = () => setOpenChangePassword(true);
  const handleCloseChangePassword = () => setOpenChangePassword(false);

  return (
    <Page>
      <Stack spacing={2} alignItems="center">
        <UserProfileCard />

        <Button variant="outlined" onClick={handleOpenEditProfile}>
          Edit Profile
        </Button>

        <Button variant="outlined" onClick={handleOpenChangePassword}>
          Change Password
        </Button>
      </Stack>

      {/* Edit Profile Modal */}
      <Dialog open={openEditProfile} onClose={handleCloseEditProfile}>
        <EditProfileForm onClose={handleCloseEditProfile} />
      </Dialog>

      {/* Change Password Modal */}
      <Dialog open={openChangePassword} onClose={handleCloseChangePassword}>
        <ChangePasswordForm onClose={handleCloseChangePassword} />
      </Dialog>
    </Page>
  );
}
