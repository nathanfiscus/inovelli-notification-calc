import React from "react";
import PropTypes from "prop-types";
import Brightness0 from "@material-ui/icons/Brightness2";
import Brightness7 from "@material-ui/icons/Brightness7";
import {
  Slider,
  Typography,
  Grid,
  withStyles,
  InputAdornment,
  Tooltip,
  IconButton,
  SvgIcon,
  TextField,
  Menu,
  Snackbar,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import copyToClipboard from "./ClipboardAccess";
import YAML from "json-to-pretty-yaml";
import { CONFIG_PARAMETER } from "./Switches";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const styles = (theme) => ({
  colorHelper: {
    height: "10px",
    width: "100%",
    position: "relative",
    background:
      "linear-gradient(to right, rgb(255,0,0), rgb(255,125,0), rgb(255,255,0), rgb(125,255,0), rgb(0,255,0), rgb(0,255,125), rgb(0,255,255), rgb(0,125,255), rgb(0,0,255), rgb(125,0,255), rgb(255,0,255), rgb(255,0,125), rgb(255,0,0))",
  },
  colorHelperWhite: {
    height: "10px",
    width: "2px",
    position: "absolute",
    right: "0px",
    background: "white",
  },
  switchPicker: {
    marginBottom: theme.spacing(3),
  },
});

class StandardLEDTools extends React.PureComponent {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      anchor: null,
      anchorColor: null,
      snackbarOpen: false,
      copyStatusText: "",
    };
  }

  setValue = (key, attr) => (e, v) => {
    console.log(key, attr, v);
    this.props.onChange(key, attr, v);
  };

  toggleMenu = (e) => {
    const { target } = e;
    this.setState((lastState) => ({
      anchor: lastState.anchor ? null : target,
    }));
  };

  toggleMenuColor = (e) => {
    const { target } = e;
    this.setState((lastState) => ({
      anchorColor: lastState.anchorColor ? null : target,
    }));
  };

  handleOnCopy = (success, err) => {
    this.setState({
      snackbarOpen: true,
      copyStatusText: success
        ? "Copied to Clipboard"
        : "Unable to copy to clipboard. Check browser settings.",
    });
  };

  handleSnackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };

  handleCopyNumber = () => {
    this.setState({ anchor: null });
    copyToClipboard(this.props.config.level, this.handleOnCopy);
  };

  handleCopyYAML = () => {
    this.setState({ anchor: null });
    copyToClipboard(
      YAML.stringify({
        parameter: this.props.parameters[CONFIG_PARAMETER.BRIGHTNESS],
        value:
          this.props.format === "10"
            ? parseInt(
                this.props.config.level.toString(Number(this.props.format))
              )
            : this.props.config.level.toString(Number(this.props.format)),
      }),
      this.handleOnCopy
    );
  };

  handleCopyNumberColor = () => {
    this.setState({ anchorColor: null });
    copyToClipboard(this.props.config.color, this.handleOnCopy);
  };

  handleCopyYAMLColor = () => {
    this.setState({ anchorColor: null });
    copyToClipboard(
      YAML.stringify({
        parameter: this.props.parameters[CONFIG_PARAMETER.COLOR],
        value:
          this.props.format === "10"
            ? parseInt(
                this.props.config.color.toString(Number(this.props.format))
              )
            : this.props.config.color.toString(Number(this.props.format)),
      }),
      this.handleOnCopy
    );
  };

  adjustCalcMethod = (val) => {
    if (this.props.calculationMethod === "raw") {
      return val;
    } else {
      return Math.floor((val / 255) * 360);
    }
  };

  render() {
    return (
      <div>
        <Typography gutterBottom>Color</Typography>
        <div className={this.props.classes.colorHelper}>
          {this.props.colorRange[0] === 0 && (
            <div className={this.props.classes.colorHelperWhite} />
          )}
        </div>
        <Slider
          defaultValue={1}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={1}
          min={this.props.colorRange[0]}
          max={this.props.colorRange[1]}
          value={this.props.config.color}
          valueLabelDisplay={
            this.props.calculationMethod === "raw" ? "auto" : "off"
          }
          onChange={this.setValue("ledConfigs", "color")}
        />

        <Typography gutterBottom>Brightness Level</Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Brightness0 />
          </Grid>
          <Grid item xs>
            <Slider
              value={this.props.config.level}
              valueLabelDisplay="auto"
              min={0}
              max={10}
              onChange={this.setValue("ledConfigs", "level")}
            />
          </Grid>
          <Grid item>
            <Brightness7 />
          </Grid>
        </Grid>
        <TextField
          style={{ marginTop: "60px" }}
          value={this.adjustCalcMethod(this.props.config.color).toString(
            Number(this.props.format || 10)
          )}
          readOnly={true}
          label={`Color Value (Parameter ${
            this.props.parameters[CONFIG_PARAMETER.COLOR]
          })`}
          fullWidth={true}
          margin="normal"
          variant="outlined"
          inputRef={this.configValueColor}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Copy to Clipboard">
                  <IconButton edge="end" onClick={this.toggleMenuColor}>
                    <SvgIcon>
                      <svg viewBox="0 0 24 24">
                        <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
                      </svg>
                    </SvgIcon>
                  </IconButton>
                </Tooltip>
                <Menu
                  open={Boolean(this.state.anchorColor)}
                  anchorEl={this.state.anchorColor}
                  onClose={this.toggleMenuColor}
                >
                  <MenuItem onClick={this.handleCopyNumberColor}>
                    Copy Value
                  </MenuItem>
                  <MenuItem onClick={this.handleCopyYAMLColor}>
                    Copy as YAML
                  </MenuItem>
                </Menu>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          style={{ marginTop: "60px" }}
          value={this.props.config.level.toString(
            Number(this.props.format || 10)
          )}
          readOnly={true}
          label={`Brightness Value (Parameter ${
            this.props.parameters[CONFIG_PARAMETER.BRIGHTNESS]
          })`}
          fullWidth={true}
          margin="normal"
          variant="outlined"
          inputRef={this.configValueBrightness}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Copy to Clipboard">
                  <IconButton edge="end" onClick={this.toggleMenu}>
                    <SvgIcon>
                      <svg viewBox="0 0 24 24">
                        <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
                      </svg>
                    </SvgIcon>
                  </IconButton>
                </Tooltip>
                <Menu
                  open={Boolean(this.state.anchor)}
                  anchorEl={this.state.anchor}
                  onClose={this.toggleMenu}
                >
                  <MenuItem onClick={this.handleCopyNumber}>
                    Copy Value
                  </MenuItem>
                  <MenuItem onClick={this.handleCopyYAML}>
                    Copy as YAML
                  </MenuItem>
                </Menu>
              </InputAdornment>
            ),
          }}
        />
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          TransitionComponent={SlideTransition}
          open={this.state.snackbarOpen}
          autoHideDuration={4000}
          onClose={this.handleSnackbarClose}
          message={<span id="message-id">{this.state.copyStatusText}</span>}
        />
      </div>
    );
  }
}

export default withStyles(styles)(StandardLEDTools);
