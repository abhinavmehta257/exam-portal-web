import logo from "../../images/logo.png";
// import { Button } from "react-bootstrap";
// import classes from "../generalCss/generalCss.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/actions/UserActions";
import React, { useState } from "react";
import { MdAccountCircle, MdBookmark, MdMenu, MdSearch } from "react-icons/md";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Menu,
  Container,
  Tooltip,
  MenuItem,
  Divider,
  InputBase,
  Typography,
} from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  margin: "auto",
  marginRight: "1rem",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function Logo() {
  return <img src={logo} alt="Logo" style={{ maxHeight: "4rem" }} />;
}

const InfoHeader = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const user = useSelector((selector) => selector.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#e0e0e0", color: "#000" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MdMenu />
            </IconButton>

            <Logo />

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {["Phone"].map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Logo />
          <Box
            sx={{
              flexGrow: 0,
              ml: "auto",
              display: { xs: "none", md: "flex" },
            }}
          >
            <Search>
              <SearchIconWrapper>
                <MdSearch />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Tooltip title="Bookmark">
              <IconButton
                onClick={() => {
                  navigate("/student/favorites");
                }}
                sx={{ p: 0, m: "auto", mr: "1rem" }}
              >
                <MdBookmark color="#000" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <MdAccountCircle size={48} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem disabled>
                <Typography textAlign="center">{user.name}</Typography>
              </MenuItem>

              <Divider />
              <MenuItem
                onClick={() => {
                  dispatch(logoutUser()).then(() => navigate("/"));
                }}
              >
                <Typography textAlign="center" onClick={() => navigate("/")}>
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

// function InfoHeader() {
//   const user = useSelector((selector) => selector.user);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   return (
//     <header className="py-3 border-bottom">
//       <div className="container-fluid d-md-flex align-items-center topHeader justify-content-between">
//         <div className="text-center">
//           <img src={logo} alt="Logo"></img>
//         </div>
//         <div className={classes.welcomeUser}>
//           Welcome <strong className="mr-3">{user.name}</strong>
//           <Button
//             variant="danger"
//             className={classes.hideButtonFocus}
// onClick={}
//           >
//             Logout
//           </Button>
//         </div>
//       </div>
//     </header>
//   );
// }

export default InfoHeader;
