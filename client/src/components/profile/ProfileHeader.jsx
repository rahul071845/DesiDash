import { Avatar, Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { Person as PersonIcon, Email as EmailIcon } from "@mui/icons-material";

const ProfileHeader = ({ userInfo }) => {
  if (!userInfo || !userInfo.user) return null;

  return (
    <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Stack direction="row" spacing={3} alignItems="center">
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: "primary.main",
              fontSize: "2rem",
              fontWeight: 700,
            }}
          >
            {userInfo.user.name.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "Poppins, Arial, sans-serif",
                fontWeight: 700,
                color: "text.primary",
                mb: 1,
              }}
            >
              Welcome back, {userInfo.user.name.split(" ")[0]}!
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PersonIcon color="primary" fontSize="small" />
                <Typography color="text.secondary">
                  {userInfo.user.name}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <EmailIcon color="primary" fontSize="small" />
                <Typography color="text.secondary">
                  {userInfo.user.email}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
