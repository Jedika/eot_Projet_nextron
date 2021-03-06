import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import { KeyboardDatePicker } from "@material-ui/pickers";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import * as DB from "../../../models";
import moment, { DATE_FORMAT } from "../../../module/moment";
import ComboBox from "../ComboBox";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function FormNewDoc(props) {
  const classes = useStyles();

  let path = DB.homeDir("ECM");
  path += "EMC.sqlite";
  const db = DB.connect(path);

  const [openTrav, setOpenTrav] = React.useState(false);
  const [zoom, setZoom] = React.useState(1280 * 100);
  const [state, setState] = React.useState({
    width: 0,
    height: 0,
    letter: false,
    match: false,
    currentIdCli: "",
    formInput: {
      //table client
      Nom: "",
      Contact: "",
      Domicile: "",
      //table travaux
      DateTrav: moment(),
      TypeTrav: "Délimitation",
      Prix: "",
      NumReq: "",
      DateReq: moment(),
      NumTitre: "",
      NomTer: "",
      LocalisationTrav: "",
      Fokontany: "",
      DateReq: moment(),
      //table lettre de charge
      DateRTX: moment(),
      Objet: "",
      NumRTX: "",
      DateL: moment(),
      VilleL: ""
    }
  });
  useEffect(() => {
    let width;
    if (window.innerWidth >= 1280) width = window.innerWidth * 100;
    else width = 1280 * 100;
    setZoom(width);
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1280) width = window.innerWidth * 100;
      else width = 1280 * 100;
      setZoom(width);
    });
  }, []);
  const GlobalCss = withStyles({
    // @global is handled by jss-plugin-global.
    "@global": {
      // You should target [class*="MuiButton-root"] instead if you nest themes.
      ".MuiPopover-root": {
        zoom: zoom / 1922 + "%"
      }
    }
  })(() => null);
  const handleChangeDate = (name, date) => {
    const f = state.formInput;
    setState({ ...state, formInput: { ...f, [name]: date } });
  };

  const handleChange = (names, val) => e => {
    let name = names;
    if (names === "letter") setState({ ...state, [names]: e.target.checked });
    else if (names === "changeCombobox") {
      let nom = val;
      let currentIdCli = filterClientIdByName(nom);
      let f = state.formInput;
      setState({
        ...state,
        formInput: { ...f, Nom: nom },
        currentIdCli: currentIdCli,
        match: matchClient(nom)
      });
    } else {
      let f = state.formInput;
      setState({
        ...state,
        formInput: { ...f, [name]: e.target.value }
      });
    }
  };

  const filterClientIdByName = name => {
    const clients = props.clients;
    let filtredList = clients.filter(client => client.Nom === name);
    if (filtredList.length === 1) return filtredList[0].IdCli;
    else return "";
  };

  const matchClient = Nom => {
    let match = false;
    props.clients.forEach(element => {
      if (element.Nom === Nom) match = true;
    });
    return match;
  };

  const addDB = IdCli => {
    DB.addTravaux(
      db,
      [
        IdCli,
        "",
        state.formInput.NumReq,
        state.formInput.DateReq.format(DATE_FORMAT),
        state.formInput.NumTitre,
        state.formInput.NomTer,
        state.formInput.LocalisationTrav,
        state.formInput.Fokontany,
        state.formInput.DateTrav.format(DATE_FORMAT),
        state.formInput.TypeTrav,
        state.formInput.Prix
      ],
      newTrav => {
        if (state.letter === true)
          DB.addLettreCharge(
            db,
            [
              state.formInput.NumRTX,
              newTrav.IdTrav,
              state.formInput.DateRTX.format(DATE_FORMAT),
              state.formInput.VilleL,
              state.formInput.DateL.format(DATE_FORMAT),
              state.formInput.Objet
            ],
            newLettreCharge => {
              props.actions.lettreCharge.addLettreCharge({ newLettreCharge });
            }
          );
        DB.selectTravaux(db, rows => {
          DB.selectCountTrav(db, Count => {
            props.actions.travau.initTravau({
              travaux: rows,
              CountTravaux: Count
            });
          });
        });
        let newPv = {
          PieceJust: "",
          Commune: "",
          District: "",
          Region: "",
          NumPV: newTrav.IdTrav
        };
        props.actions.pv.addPv({ newPv });
      }
    );
  };

  const handleClick = e => {
    e.preventDefault();
    if (state.match) {
      setOpenTrav(true);
      addDB(state.currentIdCli);
    } else {
      setOpenTrav(true);
      DB.addPersone(db, state.formInput.Nom, IdPers => {
        DB.addClient(
          db,
          [IdPers, state.formInput.Domicile, state.formInput.Contact],
          newClient => {
            let copieNewClient = {};
            copieNewClient.IdCli = newClient.IdCli;
            copieNewClient.IdPersonne = newClient.IdPersonne;
            copieNewClient.Nom = state.formInput.Nom;
            copieNewClient.Domicile = newClient.Domicile;
            copieNewClient.Contact = newClient.Contact;

            props.actions.client.addClients({ copieNewClient });
            addDB(newClient.IdCli);
            setState({
              ...state,
              match: true,
              currentIdCli: newClient.IdCli
            });
          }
        );
      });
    }
  };

  const handleCloseTrav = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenTrav(false);
  };

  const withLetter = () => {
    return (
      <Grid container spacing={3}>
        <Divider />
        <Grid item xs={6} sm={6} md={4} lg={4}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="LL"
            margin="normal"
            id="date-picker-inline"
            label="Date RTX:"
            value={state.formInput.DateRTX}
            onChange={date => handleChangeDate("DateRTX", date)}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={4}>
          <TextField
            variant="outlined"
            id="objet"
            name="objet"
            label="Objet"
            fullWidth
            autoComplete="billing country"
            onChange={handleChange("Objet")}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={4}>
          <TextField
            variant="outlined"
            id="numRTX"
            name="numRTX"
            label="N° RTX"
            fullWidth
            autoComplete="numRTX"
            onChange={handleChange("NumRTX")}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={4}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="LL"
            margin="normal"
            id="date-picker-inline"
            label="Lettre de charge fait le:"
            value={state.formInput.DateL}
            onChange={date => handleChangeDate("DateL", date)}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={4}>
          <TextField
            variant="outlined"
            id="ville"
            name="ville"
            label="Lettre de charge fait à: (Ville)"
            fullWidth
            autoComplete="billing postal-code"
            onChange={handleChange("VilleL")}
          />
        </Grid>
      </Grid>
    );
  };

  const titre = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={6} md={4} lg={4}>
          <TextField
            id="numReq"
            name="numReq"
            label="N° de Requisition"
            fullWidth
            autoComplete="dom"
            onChange={handleChange("NumReq")}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6} md={4} lg={4}>
          <TextField
            id="numTitre"
            name="numTitre"
            label="N° titre"
            fullWidth
            autoComplete="dom"
            onChange={handleChange("NumTitre")}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6} md={4} lg={4}>
          <TextField
            id="nmTerrain"
            name="nmTerrain"
            label="Nom du terrain"
            fullWidth
            autoComplete="dom"
            onChange={handleChange("NomTer")}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6} md={4} lg={4}>
          <TextField
            id="localisation"
            name="localisation"
            label="Localisation"
            fullWidth
            autoComplete="dom"
            onChange={handleChange("LocalisationTrav")}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6} md={4} lg={4}>
          <TextField
            id="fokontany"
            name="fokontany"
            label="Fokontany du terrain titré"
            fullWidth
            autoComplete="dom"
            onChange={handleChange("Fokontany")}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={4}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="LL"
            margin="normal"
            id="dateReq: "
            label="Date de requisition: "
            value={state.formInput.DateReq}
            onChange={date => handleChangeDate("DateReq", date)}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </Grid>
      </Grid>
    );
  };

  return (
    <React.Fragment>
      <GlobalCss />
      <form onSubmit={handleClick}>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6} md={4} lg={4}>
            <ComboBox
              readonly={false}
              val={state.formInput.Nom}
              list={props.clients}
              onInputChange={(e, v) => handleChange("changeCombobox", v)(e)}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={4}>
            <TextField
              required={!state.match}
              disabled={state.match}
              id="contact"
              name="contact"
              label="Contact"
              fullWidth
              autoComplete="contact"
              onChange={handleChange("Contact")}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6} md={4} lg={4}>
            <TextField
              required={!state.match}
              disabled={state.match}
              id="domicile"
              name="domicile"
              label="Domicile"
              fullWidth
              autoComplete="domicile"
              onChange={handleChange("Domicile")}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel shrink id="demo-simple-select-helper-labels">
              Type de Travaux
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              defaultValue={"Délimitation"}
              value={state.typeTrav}
              onChange={handleChange("TypeTrav")}
              variant="outlined"
            >
              <MenuItem value={"Délimitation"}>
                Travaux de délimitation
              </MenuItem>
              <MenuItem value={"Bornage"}>Travaux de bornage</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={4}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="LL"
              margin="normal"
              id="dateTrav: "
              label="Date des travaux: "
              value={state.formInput.DateTrav}
              onChange={date => handleChangeDate("DateTrav", date)}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </Grid>
          <Grid item xs={6} md={4} lg={4}>
            <TextField
              id="prix"
              name="prix"
              label="Prix (Ar): (facultatif)"
              type="number"
              fullWidth
              autoComplete="dom"
              variant="outlined"
              onChange={handleChange("Prix")}
            />
          </Grid>
        </Grid>
        {state.formInput.TypeTrav === "Bornage" && titre()}
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.letter}
                  onChange={handleChange("letter")}
                  value="gilad"
                />
              }
              label="Avec lettre de charge"
            />
          </Grid>
        </Grid>
        {state.letter && withLetter()}
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Enregistrer
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className={classes.root}>
        <Snackbar
          open={openTrav}
          autoHideDuration={6000}
          onClose={handleCloseTrav}
        >
          <Alert onClose={handleCloseTrav} severity="success">
            Dossier travaux ajouté
          </Alert>
        </Snackbar>
      </div>
    </React.Fragment>
  );
}
