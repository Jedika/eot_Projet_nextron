import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";
import TodayIcon from "@material-ui/icons/Today";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import ReceiptIcon from "@material-ui/icons/Receipt";
import SettingsIcon from "@material-ui/icons/Settings";

import { ROUTE_MENU } from "../redux/reducers/menu";
import { yellow } from "@material-ui/core/colors";

const useStyles = makeStyles({
  ListItemIcon: {
    color: "white",
    display: "block",
    zIndex: 9,
    background: "#3a3a3a",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 18,
    paddingRight: 18,
    "&:hover": {
      background: "coral",
      color: "white"
    }
  },
  ListItemIcon_menu: {
    color: "white",
    display: "block",
    zIndex: 9,
    background: "#3a3a3a",
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 18,
    paddingRight: 18,
    "&:hover": {
      background: "#19857b",
      color: "white"
    }
  },
  list1: {
    background: "#3a3a3aa6",
    width: 200,
    transition: "0.5s",
    padding: 0,
    "&:not(:first-child)>:hover": {
      width: 200,
      transition: "0.5s",
      padding: 0,
      background: "coral",
      color: "white",
      transition: "color 0s"
    }
  },
  list2: {
    background: "#3a3a3aa6",
    width: 60,
    transition: "0.5s",
    padding: 0
  },
  text1: {
    color: "white",
    transform: "translateX(0)",
    transition: "0.5s",
    textAlign: "center"
  },
  text2: {
    color: "white",
    transform: "translateX(-100px)",
    transition: "0.5s",
    textAlign: "center"
  },
  root: {
    borderRight: "1px solid Grey",
    height: "100%",
    position: "relative",
    background: "white",
    zIndex: 10
  }
});

const SideNavPage = ({ actions }) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    hoverMenu: false
  });

  const hoverMenuOn = () => setState({ hoverMenu: true });
  const hoverMenuOff = () => setState({ hoverMenu: false });
  const handleChangeMenu = routeMenu => e =>
    actions.changeRouteMenu({ routeMenu });

  //React.render;

  const sideList = side => (
    <div
      className={state.hoverMenu ? classes.list1 : classes.list2}
      role="presentation"
      style={{ color: "black" }}
    >
      <List className={classes.list1} onMouseEnter={hoverMenuOn}>
        <ListItem button style={{ padding: 0 }}>
          <ListItemIcon
            className={
              state.hoverMenu
                ? classes.hoverMenuIcon_on
                : classes.hoverMenuIcon_off
            }
            className={classes.ListItemIcon_menu}
          >
            <MenuRoundedIcon />
          </ListItemIcon>
          <ListItemText
            primary={"Menu"}
            className={state.hoverMenu ? classes.text1 : classes.text2}
            style={{ zIndex: 8 }}
          />
        </ListItem>
      </List>
      <Divider />
      <List className={classes.list1}>
        <ListItem
          button
          style={{ padding: 0 }}
          onClick={handleChangeMenu(ROUTE_MENU.NEWDOC)}
        >
          <ListItemIcon className={classes.ListItemIcon}>
            <AddToQueueIcon />
          </ListItemIcon>
          <ListItemText
            primary={"Nouveau dossier de travaux"}
            className={state.hoverMenu ? classes.text1 : classes.text2}
            style={{ zIndex: 8 }}
          />
        </ListItem>
      </List>
      <Divider />
      <List className={classes.list1}>
        <ListItem
          button
          style={{ padding: 0 }}
          onClick={handleChangeMenu(ROUTE_MENU.ELABORATION)}
        >
          <ListItemIcon className={classes.ListItemIcon}>
            <WorkOutlineIcon />
          </ListItemIcon>
          <ListItemText
            primary={"Elaboration de Travaux"}
            className={state.hoverMenu ? classes.text1 : classes.text2}
            style={{ zIndex: 8 }}
          />
        </ListItem>
      </List>
      <Divider />
      <List className={classes.list1}>
        <ListItem
          button
          style={{ padding: 0 }}
          onClick={handleChangeMenu(ROUTE_MENU.PLANING)}
        >
          <ListItemIcon className={classes.ListItemIcon}>
            <TodayIcon />
          </ListItemIcon>
          <ListItemText
            primary={"Planning"}
            className={state.hoverMenu ? classes.text1 : classes.text2}
            style={{ zIndex: 8 }}
          />
        </ListItem>
      </List>
      <Divider />
      <List className={classes.list1}>
        <ListItem
          button
          style={{ padding: 0 }}
          onClick={handleChangeMenu(ROUTE_MENU.FACTURE)}
        >
          <ListItemIcon className={classes.ListItemIcon}>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText
            primary={"Facture"}
            className={state.hoverMenu ? classes.text1 : classes.text2}
            style={{ zIndex: 8 }}
          />
        </ListItem>
      </List>
      <Divider />
      <List className={classes.list1}>
        <ListItem
          button
          style={{ padding: 0 }}
          onClick={handleChangeMenu(ROUTE_MENU.SETTING)}
        >
          <ListItemIcon className={classes.ListItemIcon}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText
            primary={"Paramettre"}
            className={state.hoverMenu ? classes.text1 : classes.text2}
            style={{ zIndex: 8 }}
          />
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  return (
    <div
      className={classes.root}
      onMouseLeave={hoverMenuOff}
      style={{ background: "#3a3a3aa6" }}
    >
      <div style={{ overflow: "hidden" }}>{sideList("left")}</div>
    </div>
  );
};

export default SideNavPage;
