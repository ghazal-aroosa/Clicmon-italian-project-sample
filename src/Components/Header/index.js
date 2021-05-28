import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import avatar from "../../Asset/pic.png";
import logo from "../../Asset/logo.png";
import noti from "../../Asset/noti.png";
import { useHistory } from "react-router-dom";
import { useStyles } from "./style";

const Header = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <AppBar position="sticky">
        <div className={classes.header}>
          <Container>
            <div className={classes.headerItems}>
              <IconButton edge="start" aria-label="menu">
                <MenuIcon />
              </IconButton>

              <img
                src={logo}
                alt="logo"
                className={classes.logo}
                onClick={() => history.push("/")}
              />

              <div className={classes.avatar}>
                <img
                  className={classes.noti}
                  src={noti}
                  alt="notification"
                />

                <Avatar alt="Remy Sharp" src={avatar} />
              </div>
            </div>
          </Container>
        </div>
      </AppBar>
    </div>
  );
};

export default Header;
