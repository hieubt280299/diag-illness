import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import {
  Button,
  Link as MuiLink,
  TextField,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  postConfirmSignUp,
  resendTokenSignUp,
} from "../../../redux/actions/creators/auth";
import { useState } from "react";
import { Routes } from "../../../shared/constants";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialValues = { token: "" };

enum ConfirmStatus {
  NOT_YET = 0,
  SENT = 1,
  RESENT = 2,
}

const TokenForm = ({ fromLogin }: any) => {
  const classes = useStyles();

  const [success, setSuccess] = useState(false);
  const [confirmStatus, setConfirmStatus] = useState<ConfirmStatus>(
    fromLogin ? ConfirmStatus.NOT_YET : ConfirmStatus.SENT
  );
  const confirmSignUpSuccessfully = () => {
    setSuccess(true);
    setConfirmStatus(ConfirmStatus.SENT);
  };
  const sendSuccessfully = () => {
    setConfirmStatus(ConfirmStatus.SENT);
  };
  const resendSuccessfully = () => {
    setConfirmStatus(ConfirmStatus.RESENT);
  };

  const { registeredAccount, errMess, successMessage } = useSelector(
    (state: any) => state.registerAccount
  );

  const email = registeredAccount?.email;

  const dispatch = useDispatch();

  const dispatchPostConfirmSignUp = (token: string) =>
    dispatch(postConfirmSignUp(email, token, confirmSignUpSuccessfully));

  const dispatchSendTokenSignUp = () =>
    dispatch(resendTokenSignUp(email, sendSuccessfully));

  const dispatchResendTokenSignUp = () =>
    dispatch(resendTokenSignUp(email, resendSuccessfully));

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      dispatchPostConfirmSignUp(values.token);
    },
  });
  return success ? (
    <>
      <Typography variant="h6" style={{ marginBottom: 12, color: "green" }}>
        {successMessage}
      </Typography>
      <Link to={Routes.LOGIN}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Quay l???i trang ????ng nh???p
        </Button>
      </Link>
    </>
  ) : (
    <form className={classes.form} onSubmit={formik.handleSubmit}>
      {confirmStatus !== ConfirmStatus.NOT_YET ? (
        <Typography variant="body2" style={{ alignSelf: "start" }}>
          {confirmStatus === ConfirmStatus.RESENT
            ? "M???t m?? k??ch ho???t kh??c"
            : "M?? k??ch ho???t"}{" "}
          ???? ???????c g???i t???i <b>{email}</b> (s??? h???t h???n sau 5 ph??t)
        </Typography>
      ) : (
        <Typography variant="subtitle1" style={{ alignSelf: "start" }}>
          <MuiLink
            style={{ cursor: "pointer", color: "#007bff" }}
            onClick={dispatchSendTokenSignUp}
          >
            G???i m?? k??ch ho???t
          </MuiLink>
        </Typography>
      )}
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="token"
        label="M?? k??ch ho???t"
        name="token"
        autoFocus
        onChange={formik.handleChange}
      />
      {errMess && (
        <Typography
          variant="body2"
          style={{ alignSelf: "start", marginTop: 12, color: "red" }}
        >
          {errMess}
        </Typography>
      )}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        K??ch ho???t
      </Button>
      <Typography variant="subtitle1" style={{ alignSelf: "start" }}>
        {"Kh??ng nh???n ???????c m??? "}
        <MuiLink
          style={{ cursor: "pointer", color: "#007bff" }}
          onClick={dispatchResendTokenSignUp}
        >
          G???i l???i m??
        </MuiLink>
      </Typography>
    </form>
  );
};

export default TokenForm;
