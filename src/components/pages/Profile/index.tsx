import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FaceOutlinedIcon from "@material-ui/icons/FaceOutlined";
import { useFormik } from "formik";
import {
  Avatar,
  Container,
  makeStyles,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { putEditAccount } from "../../../redux/actions/creators/auth";

export type ProfileDetails = {
  id: string;
  address: string;
  name: string;
  dateOfBirth: Date;
  gender: 1 | 0;
};

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  textField: {
    "& .MuiInputBase-root.Mui-disabled": {
      color: "rgba(0, 0, 0, 0.87)",
    },
  },
  submit: {
    margin: theme.spacing(3, 2, 2, 0),
  },
}));

const Profile = () => {
  const classes = useStyles();
  const [isEditing, setEditing] = React.useState(false);
  const toggleEditing = () => {
    setEditing(!isEditing);
  };

  const account = useSelector((state: any) => state.loginAccount?.account);
  const dispatch = useDispatch();
  const dispatchPutEditAccount = (accountDetails: any) =>
    dispatch(putEditAccount(accountDetails, account.token));

  const initialValues: ProfileDetails = {
    id: account.id,
    name: account.name,
    dateOfBirth: account.dateOfBirth,
    address: account.address,
    gender: account.gender,
  };

  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      dispatchPutEditAccount(values);
    },
  });

  const onBackButtonClicked = (e: any) => {
    toggleEditing();
    formik.handleReset(e);
  };

  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FaceOutlinedIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          T??i kho???n c???a t??i
        </Typography>
        {!isEditing && (
          <Button variant="text" color="secondary" onClick={toggleEditing}>
            S???a ?????i
          </Button>
        )}
      </div>

      <form
        className={classes.form}
        onSubmit={formik.handleSubmit}
        onReset={onBackButtonClicked}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              name="name"
              variant="outlined"
              required
              fullWidth
              id="name"
              label="H??? v?? t??n"
              value={formik.values.name}
              onChange={formik.handleChange}
              autoFocus
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              select
              fullWidth
              name="gender"
              label="Gi???i t??nh"
              variant="outlined"
              value={formik.values.gender}
              onChange={formik.handleChange}
              disabled={!isEditing}
            >
              <MenuItem value={0}>Nam</MenuItem>
              <MenuItem value={1}>N???</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              variant="outlined"
              id="dateOfBirth"
              name="dateOfBirth"
              label="Ng??y sinh"
              type="date"
              fullWidth
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
              disabled={!isEditing}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              variant="outlined"
              required
              fullWidth
              id="address"
              label="?????a ch???"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              disabled={!isEditing}
            />
          </Grid>
        </Grid>
        {isEditing && (
          <Grid item container xs={12} sm={6} spacing={2}>
            <Grid item xs={6}>
              <Button
                className={classes.submit}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                L??u
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                className={classes.submit}
                type="reset"
                variant="outlined"
                color="primary"
                fullWidth
              >
                Quay l???i
              </Button>
            </Grid>
          </Grid>
        )}
      </form>
    </Container>
  );
};

export default React.memo(Profile);
