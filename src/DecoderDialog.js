import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button
} from "@material-ui/core";

class DecoderDialog extends React.PureComponent {
  static propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    switchType: PropTypes.string,
    onDecode: PropTypes.func
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  componentDidUpdate(prevProps) {
    if (this.props.open !== prevProps.open) {
      this.setState({ value: "" });
    }
  }

  handleDecode = () => {
    this.props.onDecode(parseInt(this.state.value, Number(this.props.format)));
  };

  render() {
    const maxval = this.props.switchType === "dimmer" ? 100600575 : 83823359;
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <DialogTitle>Decode A Calculated Value</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a notification value below. This will decode the configuration
            value into the individual parameters and set options to the
            calculated parameters.
          </DialogContentText>
          <TextField
            fullWidth={true}
            autoFocus={true}
            onChange={this.handleChange}
            value={this.state.value}
            label={`Enter a value between 1 and ${maxval.toString(
              Number(this.props.format)
            )}`}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose}>Cancel</Button>
          <Button onClick={this.handleDecode}>Decode</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default DecoderDialog;
