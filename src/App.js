import React from "react";
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
  Grid
} from "@material-ui/core";
import Brightness0 from "@material-ui/icons/Brightness2";
import Brightness7 from "@material-ui/icons/Brightness7";

import lzw30sn from "./Inovelli-LZW30-SN.gif";
let Gradient = require("gradient2");
let gradient = new Gradient({
  colors: ["red", "orange", "yellow", "green", "cyan", "blue", "violet", "red"],
  steps: 256,
  model: "rgb"
});

const LED_COLORS = gradient.toArray("hex");

const styles = theme => ({
  "@global": {
    "@keyframes pulse": {
      "50%": {
        background: "#CCCCCC"
      }
    },
    "@keyframes blink": {
      "50%": { opacity: "0.0" }
    }
  },
  switchWrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    "&>*": {
      minWidth: "400px"
    }
  },
  switchContainer: {
    position: "relative"
  },
  notificationLED: {
    position: "absolute",
    width: "7px",
    height: "38px",
    backgroundColor: "#CCCCCC",
    bottom: "161px",
    right: "129px"
  },
  colorHelper: {
    height: "10px",
    width: "100%",
    background:
      "linear-gradient(to right, red, orange , yellow, green, cyan, blue, violet,red)"
  },
  forever: {
    animationIterationCount: "infinite"
  },
  strobe: {
    animationDuration: "1s",
    animationName: "pulse"
  },
  fastBlink: {
    animationDuration: "0.80s",
    animationName: "blink",
    animationTimingFunction: "step-start"
  },
  slowBlink: {
    animationDuration: "2s",
    animationName: "blink",
    animationTimingFunction: "step-start"
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "1",
      duration: "255",
      level: "10",
      effect: "1",
      value: "33488897"
    };
    this.configValue = React.createRef();
  }

  setValue = key => (e, v) => {
    this.setState(
      { [key]: key === "color" || key === "level" ? v : e.target.value },
      () => {
        this.setState(lastState => ({
          value:
            parseInt(lastState.color) +
            lastState.level * 256 +
            lastState.duration * 65536 +
            lastState.effect * 16777216
        }));
      }
    );
  };

  handleCopy = () => {
    if (this.configValue.current) {
      this.configValue.current.select();
      document.execCommand("copy");
    }
  };

  render() {
    let effectCSS = "";
    let effectStyles = {};
    effectStyles["opacity"] = this.state.level / 10;
    switch (this.state.effect) {
      case "2":
        effectCSS += ` ${this.props.classes.fastBlink}`;
        break;
      case "3":
        effectCSS += ` ${this.props.classes.slowBlink}`;
        break;
      case "4":
        effectCSS += ` ${this.props.classes.strobe}`;
        break;
      default:
        break;
    }
    switch (this.state.duration) {
      default:
        effectCSS += ` ${this.props.classes.forever}`;
        break;
    }

    return (
      <div className={this.props.classes.root}>
        <Typography variant="h2">Inovelli Notification Calculator</Typography>
        <div className={this.props.classes.switchWrapper}>
          <div className={this.props.classes.switchContainer}>
            <img
              alt="Inovelli-LZW30-SN"
              src={lzw30sn}
              height="600px"
              width="400px"
            />
            <span
              id="notification-led"
              className={this.props.classes.notificationLED + effectCSS}
              style={{
                backgroundColor: LED_COLORS[parseInt(this.state.color)],
                zIndex: "2",
                ...effectStyles
              }}
            />
            <span
              id="notification-led"
              className={this.props.classes.notificationLED}
            />
          </div>
          <div>
            <Typography variant="h4" gutterBottom>
              Options
            </Typography>
            <Typography id="discrete-slider" gutterBottom>
              Color
            </Typography>
            <div className={this.props.classes.colorHelper} />
            <Slider
              defaultValue={1}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              min={1}
              max={255}
              value={this.state.color}
              onChange={this.setValue("color")}
            />

            <Typography gutterBottom>Brightness Level</Typography>
            <Grid container spacing={2}>
              <Grid item>
                <Brightness0 />
              </Grid>
              <Grid item xs>
                <Slider
                  value={this.state.level}
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
            <FormControl fullWidth={true} margin="normal">
              <InputLabel>Duration</InputLabel>
              <Select
                value={this.state.duration}
                onChange={this.setValue("duration")}
              >
                <MenuItem value="1">1 Seconds</MenuItem>
                <MenuItem value="2">2 Seconds</MenuItem>
                <MenuItem value="3">3 Seconds</MenuItem>
                <MenuItem value="4">4 Seconds</MenuItem>
                <MenuItem value="5">5 Seconds</MenuItem>
                <MenuItem value="6">6 Seconds</MenuItem>
                <MenuItem value="7">7 Seconds</MenuItem>
                <MenuItem value="8">8 Seconds</MenuItem>
                <MenuItem value="9">9 Seconds</MenuItem>
                <MenuItem value="10">10 Seconds</MenuItem>
                <MenuItem value="20">20 Seconds</MenuItem>
                <MenuItem value="30">30 Seconds</MenuItem>
                <MenuItem value="40">40 Seconds</MenuItem>
                <MenuItem value="50">50 Seconds</MenuItem>
                <MenuItem value="60">1 Minute</MenuItem>
                <MenuItem value="120">2 Minutes</MenuItem>
                <MenuItem value="180">3 Minutes</MenuItem>
                <MenuItem value="240">4 Minutes</MenuItem>
                <MenuItem value="255">Indefinitely</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth={true} margin="normal">
              <InputLabel>Effect</InputLabel>
              <Select
                value={this.state.effect}
                onChange={this.setValue("effect")}
              >
                {/* <MenuItem value="0">Off</MenuItem> */}
                <MenuItem value="1">Solid</MenuItem>
                <MenuItem value="2">Strobe\Fast Blink</MenuItem>
                <MenuItem value="3">Slow Blink</MenuItem>
                <MenuItem value="4">Pulse</MenuItem>
              </Select>
            </FormControl>
            <TextField
              style={{ marginTop: "60px" }}
              value={this.state.value}
              readOnly={true}
              label="Configuration Value"
              fullWidth={true}
              margin="normal"
              variant="outlined"
              inputRef={this.configValue}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={this.handleCopy}>
                      <SvgIcon>
                        <svg viewBox="0 0 24 24">
                          <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
                        </svg>
                      </SvgIcon>
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
