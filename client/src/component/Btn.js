import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

const Btn = props => {
  const { classes } = props;
  return (
    <form onSubmit={props.onSubmit} {...props}>
      <Button size="small" className={classes.button} type="submit">
        {props.ButtonTitle}
      </Button>
    </form>
  );
};

Btn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Btn);
