import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  withStyles,
} from "@material-ui/core";
import useForm from "./useForm";

const styles = (theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      minWidth: 230,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 230,
  },
  smMargin: {
    margin: theme.spacing(1),
  },
});

const initialFieldValues = {
  fullName: "",
  mobile: "",
  email: "",
  age: "",
  bloodGroup: "",
  address: "",
};

const DCandidateForm = ({ classes, ...props }) => {
  const validate = (fieldValues = values) => {
    let temp = {};
    if ("fullName" in fieldValues)
      temp.fullName = fieldValues.fullName ? "" : "This Field is required";
    if ("bloodGroup" in fieldValues)
      temp.bloodGroup = fieldValues.bloodGroup ? "" : "This Field is required";
    if ("mobile" in fieldValues)
      temp.mobile = fieldValues.mobile ? "" : "This Field is required";
    if ("email" in fieldValues)
      temp.email = /^$|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid";
    setError({
      ...temp,
    });
    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setError, handleInputChange } =
    useForm(initialFieldValues, validate);

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      window.alert("Validation succeeded");
    }
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={classes.root}
      onSubmit={handleSubmit}
    >
      <Grid container>
        <Grid item xs={6}>
          <TextField
            name="fullName"
            variant="outlined"
            label="Full Name"
            autoComplete="chrome-off"
            value={values.fullName}
            onChange={handleInputChange}
            {...(errors.fullName && {
              error: true,
              helperText: errors.fullName,
            })}
          />
          <TextField
            name="email"
            variant="outlined"
            label="Email"
            autoComplete="chrome-off"
            value={values.email}
            onChange={handleInputChange}
            {...(errors.email && { error: true, helperText: errors.email })}
          />
          <FormControl
            variant="outlined"
            className={classes.formControl}
            {...(errors.bloodGroup && { error: true })}
          >
            <InputLabel ref={inputLabel}>Blood Group</InputLabel>
            <Select
              name="bloodGroup"
              value={values.bloodGroup}
              onChange={handleInputChange}
              labelWidth={labelWidth}
            >
              <MenuItem value="">Select Blood Group</MenuItem>
              <MenuItem value="B+">B+</MenuItem>
              <MenuItem value="B-">B-</MenuItem>
              <MenuItem value="A+">A+</MenuItem>
              <MenuItem value="A-">A-</MenuItem>
              <MenuItem value="AB+">AB+</MenuItem>
              <MenuItem value="AB-">AB-</MenuItem>
              <MenuItem value="O+">O+</MenuItem>
              <MenuItem value="O-">O-</MenuItem>
              <MenuItem value="A1+">A1+</MenuItem>
              <MenuItem value="A1-">A1-</MenuItem>
              <MenuItem value="A1B+">A1B+</MenuItem>
              <MenuItem value="A1B-">A1B-</MenuItem>
              <MenuItem value="A2+">A2+</MenuItem>
              <MenuItem value="A2-">A2-</MenuItem>
              <MenuItem value="A2B+">A2B+</MenuItem>
              <MenuItem value="A2B-">A2B-</MenuItem>
            </Select>
            {errors.bloodGroup && (
              <FormHelperText>{errors.bloodGroup}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="mobile"
            variant="outlined"
            label="Mobile"
            autoComplete="chrome-off"
            value={values.mobile}
            onChange={handleInputChange}
            {...(errors.mobile && { error: true, helperText: errors.mobile })}
          />
          <TextField
            name="age"
            variant="outlined"
            label="Age"
            value={values.age}
            onChange={handleInputChange}
          />
          <TextField
            name="address"
            variant="outlined"
            label="Address"
            value={values.address}
            onChange={handleInputChange}
          />
          <div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.smMargin}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.smMargin}
            >
              Reset
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

export default withStyles(styles)(DCandidateForm);
