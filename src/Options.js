import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemText,
} from "@material-ui/core";

class OptionsDialog extends React.PureComponent {
  static propTypes = {};

  static defaultProps = {};

  handleThemeChange = (e) => {
    this.props.setTheme(e.target.value);
  };

  handleCalcChange = (e) => {
    this.props.setCalculationMethod(e.target.value);
  };

  handleFormatChange = (e) => {
    this.props.setFormat(e.target.value);
  };

  handleSceneMethodChange = (e) => {
    this.props.setSceneMethod(e.target.value);
  };

  render() {
    return (
      <Dialog
        open={this.props.open}
        fullWidth={true}
        onClose={this.props.onClose}
      >
        <DialogTitle>Options</DialogTitle>
        <DialogContent>
          <FormControl fullWidth={true} margin="normal">
            <InputLabel>Theme</InputLabel>
            <Select value={this.props.theme} onChange={this.handleThemeChange}>
              <MenuItem value="light">Light</MenuItem>
              <MenuItem value="dark">Dark</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth={true} margin="normal">
            <InputLabel>LED Value Calculation Method</InputLabel>
            <Select
              value={this.props.calculationMethod}
              onChange={this.handleCalcChange}
            >
              <MenuItem value="raw">
                <ListItemText
                  primary="Raw (Default)"
                  secondary="Home Assistant or any other non-device-handler based controller."
                />
              </MenuItem>
              <MenuItem value="driver">
                <ListItemText
                  primary="Device Handler"
                  secondary="SmartThings, Hubitat or other device-handler based controller."
                />
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth={true} margin="normal">
            <InputLabel>Scene Reference</InputLabel>
            <Select
              value={this.props.sceneMethod}
              onChange={this.handleSceneMethodChange}
            >
              <MenuItem value="ha">
                <ListItemText
                  primary="Home Assistant (OpenZWave 1.4)"
                  secondary="Home Assistant configurations using the legacy zwave integration."
                />
              </MenuItem>
              <MenuItem value="ozw">
                <ListItemText
                  primary="Home Assistant (OpenZWave 1.6)"
                  secondary="Home Assistant configurations using the new ozw integration. (Currently in beta)"
                />
              </MenuItem>
              <MenuItem value="driver">
                <ListItemText
                  primary="Device Handler References"
                  secondary="SmartThings, Hubitat or other device-handler based controller."
                />
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth={true} margin="normal">
            <InputLabel>Value Format</InputLabel>
            <Select
              value={this.props.format}
              onChange={this.handleFormatChange}
            >
              <MenuItem value="10">Decimal</MenuItem>
              <MenuItem value="16">Hex</MenuItem>
              <MenuItem value="2">Binary</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default OptionsDialog;
