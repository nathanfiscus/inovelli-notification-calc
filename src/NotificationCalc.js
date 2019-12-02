import React from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  TextField,
  InputAdornment,
  IconButton,
  SvgIcon,
  Grid,
  Tooltip
} from "@material-ui/core";
import Brightness0 from "@material-ui/icons/Brightness2";
import Brightness7 from "@material-ui/icons/Brightness7";
import InfiniteIcon from "@material-ui/icons/AllInclusive";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import { DIMMER_EFFECTS, ONOFF_EFFECTS } from "./Effects";
import ValueLabelTooltip from "./ValueLabelTooltip";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
import DecoderDialog from "./DecoderDialog";

const styles = theme => ({
  colorHelper: {
    height: "10px",
    width: "100%",
    background:
      "linear-gradient(to right, rgb(255,0,0), rgb(255,125,0), rgb(255,255,0), rgb(125,255,0), rgb(0,255,0), rgb(0,255,125), rgb(0,255,255), rgb(0,125,255), rgb(0,0,255), rgb(125,0,255), rgb(255,0,255), rgb(255,0,125), rgb(255,0,0))"
  },
  switchPicker: {
    marginBottom: theme.spacing(3)
  }
});

const longToByteArray = function(/*long*/ long) {
  // we want to represent the input as a 8-bytes array
  var byteArray = [0, 0, 0, 0];

  for (var index = 0; index < byteArray.length; index++) {
    var byte = long & 0xff;
    byteArray[index] = byte;
    long = (long - byte) / 256;
  }

  return byteArray;
};

// const byteArrayToLong = function(/*byte[]*/ byteArray) {
//   var value = 0;
//   for (var i = byteArray.length - 1; i >= 0; i--) {
//     value = value * 256 + byteArray[i];
//   }

//   return value;
// };

class NotificationCalc extends React.Component {
  static propTypes = {
    color: PropTypes.number,
    level: PropTypes.number,
    duration: PropTypes.number,
    effect: PropTypes.number,
    value: PropTypes.number,
    onChange: PropTypes.func,
    type: PropTypes.string
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      decoderDialogOpen: false
    };
    this.configValue = React.createRef();
  }

  handleCopy = () => {
    if (this.configValue.current) {
      this.configValue.current.select();
      document.execCommand("copy");
    }
  };

  durationFormater = val => {
    switch (val) {
      case 255:
        return "Forever";
      case 1:
        return "1 second";
      default:
        if (val > 59) {
          return `${Math.floor(val / 60)}${val % 60} seconds`;
        } else {
          return `${val} seconds`;
        }
    }
  };

  setValue = key => (e, v) => {
    this.props.onChange(
      key,
      key !== "effect" && key !== "type" ? v : e.target.value
    );
  };

  openDecoder = () => {
    this.setState({ decoderDialogOpen: true });
  };

  handleDecoderDialogClose = () => {
    this.setState({ decoderDialogOpen: false });
  };

  handleDecode = value => {
    const arr = longToByteArray(value);
    this.props.onChange("all", {
      color: arr[0],
      level: arr[1],
      duration: arr[2],
      effect: arr[3].toString(),
      value: value
    });
    this.setState({ decoderDialogOpen: false });
  };

  render() {
    return (
      <div>
        <div style={{ textAlign: "right" }}>
          <Tooltip title="Decode a Value">
            <IconButton onClick={this.openDecoder}>
              <SettingsBackupRestoreIcon />
            </IconButton>
          </Tooltip>
        </div>
        <Typography gutterBottom>Color</Typography>
        <div className={this.props.classes.colorHelper} />
        <Slider
          defaultValue={1}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={1}
          min={1}
          max={255}
          value={this.props.color}
          onChange={this.setValue("color")}
        />

        <Typography gutterBottom>Brightness Level</Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Brightness0 />
          </Grid>
          <Grid item xs>
            <Slider
              value={this.props.level}
              valueLabelDisplay="auto"
              min={0}
              max={10}
              onChange={this.setValue("level")}
            />
          </Grid>
          <Grid item>
            <Brightness7 />
          </Grid>
        </Grid>
        <Typography gutterBottom>Duration</Typography>
        <Grid container spacing={2}>
          <Grid item>
            <TimelapseIcon />
          </Grid>
          <Grid item xs>
            <Slider
              value={this.props.duration}
              valueLabelDisplay="auto"
              valueLabelFormat={this.durationFormater}
              marks={[5, 10, 15, 20, 30, 45, 60, 120, 180, 240, 255]}
              min={1}
              max={255}
              onChange={this.setValue("duration")}
              ValueLabelComponent={ValueLabelTooltip}
            />
          </Grid>
          <Grid item>
            <InfiniteIcon />
          </Grid>
        </Grid>
        <FormControl fullWidth={true} margin="normal">
          <InputLabel>Effect</InputLabel>
          <Select value={this.props.effect} onChange={this.setValue("effect")}>
            {/* <MenuItem value="0">Off</MenuItem> */}
            <MenuItem
              value={
                this.props.type === "dimmer"
                  ? DIMMER_EFFECTS.SOLID
                  : ONOFF_EFFECTS.SOLID
              }
            >
              Solid
            </MenuItem>
            <MenuItem
              value={
                this.props.type === "dimmer"
                  ? DIMMER_EFFECTS.FAST_BLINK
                  : ONOFF_EFFECTS.FAST_BLINK
              }
            >
              Fast Blink
            </MenuItem>
            <MenuItem
              value={
                this.props.type === "dimmer"
                  ? DIMMER_EFFECTS.SLOW_BLINK
                  : ONOFF_EFFECTS.SLOW_BLINK
              }
            >
              Slow Blink
            </MenuItem>
            <MenuItem
              value={
                this.props.type === "dimmer"
                  ? DIMMER_EFFECTS.PULSE
                  : ONOFF_EFFECTS.PULSE
              }
            >
              Pulse
            </MenuItem>
            {this.props.type === "dimmer" && (
              <MenuItem value={DIMMER_EFFECTS.CHASE}>Chase</MenuItem>
            )}
          </Select>
        </FormControl>
        <TextField
          style={{ marginTop: "60px" }}
          value={this.props.value}
          readOnly={true}
          label="Configuration Value"
          fullWidth={true}
          margin="normal"
          variant="outlined"
          inputRef={this.configValue}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Copy to Clipboard">
                  <IconButton edge="end" onClick={this.handleCopy}>
                    <SvgIcon>
                      <svg viewBox="0 0 24 24">
                        <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
                      </svg>
                    </SvgIcon>
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            )
          }}
        />
        <DecoderDialog
          open={this.state.decoderDialogOpen}
          onClose={this.handleDecoderDialogClose}
          onDecode={this.handleDecode}
        />
      </div>
    );
  }
}

export default withStyles(styles)(NotificationCalc);
