import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class Input extends Component {

  render() {
    return (
      <React.Fragment>
        <TextField
          id="full-width"
          InputLabelProps={{
            shrink: true
          }}
          placeholder="Type a message"
          fullWidth
          margin="normal"
          onChang= {(obj) => this.setState({})}
        />
      </React.Fragment>
    );
  }
}

export default Input;
