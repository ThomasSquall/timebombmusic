import type { FC } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import {
  Box,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth } from "contexts/jwt-provider";
import React from "react";
import {useNavigate} from "react-router-dom";

interface AccountPopoverProps {
  anchorEl: null | Element;
  onClose?: () => void;
  open?: boolean;
}

export const AccountPopover: FC<AccountPopoverProps> = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  const { logout } = useAuth();

  const navigate = useNavigate();

  const handleProfile = () => {
    onClose?.();
    void navigate("/profile");
  }

  const handleLogout = async (): Promise<void> => {
    try {
      onClose?.();
      logout();
    } catch (err) {
      console.error(err);
      toast.error("Unable to logout.");
    }
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "center",
        vertical: "bottom",
      }}
      keepMounted
      onClose={onClose}
      open={!!open}
      PaperProps={{ sx: { width: 300 } }}
      transitionDuration={0}
      {...other}
    >
      {/*<Box
        sx={{
          alignItems: "center",
          p: 2,
          display: "flex",
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            height: 40,
            width: 40,
          }}
        >
          <UserCircleIcon fontSize="small" />
        </Avatar>
        <Box
          sx={{
            ml: 1,
          }}
        >
          <Typography variant="body1">{user.name}</Typography>
          <Typography color="textSecondary" variant="body2">
            Acme Inc
          </Typography>
        </Box>
      </Box>
      <Divider />
      */}
      <Box sx={{ my: 1 }}>
        {/*
        <Link to="/dashboard/social/profile">
          <MenuItem component="h2">
            <ListItemIcon>
              <UserCircleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body1">Profile</Typography>}
            />
          </MenuItem>
        </Link>
        <Link to="/dashboard/account">
          <MenuItem component="h2">
            <ListItemIcon>
              <CogIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body1">Settings</Typography>}
            />
          </MenuItem>
        </Link>
        <Link to="/dashboard">
          <MenuItem component="h2">
            <ListItemIcon>
              <SwitchHorizontalOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1">Change organization</Typography>
              }
            />
          </MenuItem>
        </Link>
        <Divider />
        */}
        <MenuItem onClick={handleProfile}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
              primary={<Typography variant="body1" sx={{color: "white"}}>Profilo</Typography>}
          />
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body1" sx={{color: "white"}}>Logout</Typography>}
          />
        </MenuItem>
      </Box>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
