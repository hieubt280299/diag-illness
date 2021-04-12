import * as AuthActionTypes from "../../../actions/types/auth";

const fakeAccount = {
  id: 9,
  createAt: "2021-04-05T07:45:39.000+0000",
  modifyAt: null,
  email: "ngattar1q@gmail.com",
  password: "$2a$10$QZA2oGTQ6JHoLaGJDr/ka.fuGW2qNzYgC.YYfGka08p0ix3ZB7JWS",
  name: "Do Thi Hong Ngat",
  dateOfBirth: "1999-03-03T16:45:58.000+0000",
  gender: 1,
  address: null,
  roleId: 2,
  enabled: 0,
  lastAccess: null,
};

const account = JSON.parse(sessionStorage.getItem("account") || "{}");

export const LoginAccount = (
  state = {
    account: Object.keys(account).length === 0 ? null : account,
    errMess: null,
  },
  action: { type: string; payload: any }
): any => {
  // console.log(currentAccount);
  switch (action.type) {
    case AuthActionTypes.LOGIN_FAILED:
      return { ...state, errMess: action.payload };

    case AuthActionTypes.LOGIN_SUCCESSFULLY:
      return { ...state, account: action.payload, errMess: null };

    case AuthActionTypes.LOGOUT_SUCCESSFULLY:
      return { ...state, account: null };

    default:
      return state;
  }
};
