import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as userActions from "../actions/userActions";
import * as clientActions from "../actions/clientActions";
import * as travauActions from "../actions/travauActions";
import * as lettreChargeActions from "../actions/lettreChargeActions";
import * as convocationActions from "../actions/convocationActions";
import * as pvActions from "../actions/pvActions";
import * as factureActions from "../actions/factureActions";
import * as settingActions from "../actions/settingActions";
import * as menuActions from "../actions/menuActions";

const actions = {
  ...userActions,
  ...clientActions,
  ...travauActions,
  ...lettreChargeActions,
  ...convocationActions,
  ...pvActions,
  ...factureActions,
  ...settingActions,
  ...menuActions
};

const mapStateToProps = state => ({
  routeMenu: state.menu.routeMenu,
  users: state.user.users,
  settings: state.setting.settings,
  maxs: state.user.maxs
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps);
