import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import {
  UserPageListItems,
  PreLoginListItems,
  AdminPageListItems,
} from "./listItems";
import { RouteComponentProps, withRouter } from "react-router";
import { RoleIDs } from "../../shared/constants";

type SidebarProps = RouteComponentProps<any> & {
  account: any;
  drawerWidth: number;
  open: boolean;
  handleDrawerClose: () => void;
  handleDrawerOpen?: () => void;
};

const Sidebar = ({
  account,
  drawerWidth,
  open,
  handleDrawerClose,
  handleDrawerOpen,
  location,
}: SidebarProps) => {
  const useStyles = makeStyles((theme) => ({
    toolbarIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar,
    },
    drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: "100vh",
      overflow: "auto",
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
    },
    fixedHeight: {
      height: 240,
    },
  }));

  const classes = useStyles();
  const { pathname } = location;

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      {account ? (
        account.roleId === RoleIDs.ROLE_ADMIN ? (
          <AdminPageListItems
            handleDrawerOpen={handleDrawerOpen}
            pathname={pathname}
          />
        ) : (
          <UserPageListItems
            handleDrawerOpen={handleDrawerOpen}
            pathname={pathname}
          />
        )
      ) : (
        <PreLoginListItems
          handleDrawerOpen={handleDrawerOpen}
          pathname={pathname}
        />
      )}
    </Drawer>
  );
};

export default withRouter(Sidebar);
