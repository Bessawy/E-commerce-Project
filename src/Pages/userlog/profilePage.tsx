import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../reduxhook/hooks";
import { StyledBadge } from "../../Themes/badgeTheme";
import GridItem from "../../Themes/gridTheme";

const Profile = () => {
  const user = useAppSelector((state) => state.userReducer);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 20,
      }}
    >
      <Grid container sx={{ width: "30%" }} rowSpacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {user.avatar ? (
              <Box
                component="img"
                sx={{ width: 120, height: 120, borderRadius: 60 }}
                src={user.avatar}
              ></Box>
            ) : (
              <Box className="login_img" sx={{ width: 120, height: 120 }}></Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <GridItem>
            <Typography sx={{border:2, borderRadius: 5}}>User name</Typography>
          </GridItem>
        </Grid>
        <Grid item xs={6}>
          <GridItem sx={{ height: "100%" }}>
            <Typography >{user.name}</Typography>
          </GridItem>
        </Grid>
        <Grid item xs={6}>
          <GridItem>
            <Typography  sx={{border:2, borderRadius: 5}}>ID</Typography>
          </GridItem>
        </Grid>
        <Grid item xs={6}>
          <GridItem sx={{ height: "100%" }}>
            <Typography>{user.id}</Typography>
          </GridItem>
        </Grid>
        <Grid item xs={6}>
          <GridItem>
            <Typography  sx={{border:2, borderRadius: 5}}>User email</Typography>
          </GridItem>
        </Grid>
        <Grid item xs={6}>
          <GridItem sx={{ height: "100%" }}>
            <Typography>{user.email}</Typography>
          </GridItem>
        </Grid>
        <Grid item xs={6}>
          <GridItem>
            <Typography  sx={{border:2, borderRadius: 5}}>Role</Typography>
          </GridItem>
        </Grid>
        <Grid item xs={6}>
          <GridItem sx={{ height: "100%" }}>
            <Typography>{user.role}</Typography>
          </GridItem>
        </Grid>
        <Grid item xs={12}>
          <Box   sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Button variant="outlined"> Edit profile </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
