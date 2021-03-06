import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import MyLink from "./MyLink";
import UserCtn from "../redux/containers/UserCtn";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Application for E.O.T Entreprise
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
let input = { id: "", passWd: "" };
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const SignIn = props => {
  const classes = useStyles();

  const [zoom, setZoom] = React.useState(1280 * 100);
  const eventListener = () => {
    let width = 0;
    if (window.innerWidth >= 1280) width = window.innerWidth * 100;
    else width = 1280 * 100;
    setZoom(width);
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1280) width = window.innerWidth * 100;
      else width = 1280 * 100;
      setZoom(width);
    });
  };
  useEffect(() => {
    eventListener();
  });

  const chageInputId = e => {
    input.id = e.target.value;
    if (props.user) props.user(e.target.value);
  };

  const chageInputPassWd = e => {
    input.passWd = e.target.value;
    if (props.password) props.password(e.target.value);
  };

  return (
    <div style={props.style} className={props.className}>
      <Container component="main" maxWidth="xs" className="container">
        <CssBaseline />
        <div className={classes.paper} style={{ filter: "blur(0px)" }}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Authentification
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Identifiant"
              label="Identifiant"
              name="Identifiant"
              autoComplete="Identifiant"
              autoFocus
              onChange={chageInputId}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={chageInputPassWd}
            />
            {props.children}
            {props.authentification && (
              <MyLink
                href="/next"
                prefetch={false}
                values={{
                  signId: props.users[0].Nom,
                  signPassWd: props.users[0].PassWord,
                  input
                }}
              >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={e => {
                    e.preventDefault;
                  }}
                >
                  S'authentifier
                </Button>
              </MyLink>
            )}
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
};

export default UserCtn(SignIn);
