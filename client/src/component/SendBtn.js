import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Send from '@material-ui/icons/Send';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});
const SendBtn = props => {
  const { classes } = props;
  return (
    <div>
        <Button variant="contained" color="primary" className={classes.button}  type="submit">
          <Send className={classNames(classes.leftIcon, classes.iconSmall)} />
            Send
        </Button>
    </div>
  );
}

SendBtn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SendBtn);
