import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Link } from "react-router-dom";
import { getLogout } from "../../redux/actions/creators/auth";
import { useDispatch, useSelector } from "react-redux";
import { Routes } from "../../shared/constants";

const AccountButton = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const account = useSelector((state: any) => state.loginAccount?.account);

  const dispatch = useDispatch();
  const dispatchGetLogout = (token: string) => dispatch(getLogout(token));

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = (token: string) => {
    console.log("logout");
    dispatchGetLogout(token);
  };

  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        style={{ outline: "none" }}
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
      >
        <Link
          onClick={handleClose}
          to={Routes.PROFILE}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <MenuItem>Tài khoản của tôi</MenuItem>
        </Link>

        <Link
          onClick={handleClose}
          to={Routes.CHANGE_PASSWORD}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <MenuItem>Đổi mật khẩu</MenuItem>
        </Link>

        <Link
          onClick={() => logout(account.token)}
          to="/"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <MenuItem>Đăng xuất</MenuItem>
        </Link>
      </Menu>
    </div>
  );
};

export default React.memo(AccountButton);
