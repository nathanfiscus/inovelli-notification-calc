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

import lzw30sn from "./Inovelli-LZW30-SN.gif";
let Gradient = require("gradient2");
let gradient = new Gradient({
  colors: ["red", "orange", "yellow", "green", "cyan", "blue", "violet", "red"],
  steps: 256,
  model: "rgb"
});

const LED_COLORS = gradient.toArray("hex");

const durationFormater = val => {
  console.log(val);
  switch (val) {
    case 255:
      return "Forever";
    case 1:
      return "1 second";
    default:
      if (val > 59) {
        return `${Math.floor(val / 60)} minutes ${val % 60} seconds`;
      } else {
        return `${val} seconds`;
      }
  }
};

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  const popperRef = React.useRef(null);
  React.useEffect(() => {
    if (popperRef.current) {
      popperRef.current.update();
    }
  });

  return (
    <Tooltip
      PopperProps={{
        popperRef
      }}
      open={open}
      enterTouchDelay={0}
      placement="top"
      title={durationFormater(value)}
    >
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired
};

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
    height: "39px",
    backgroundColor: "#CCCCCC",
    bottom: "162px",
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
  },
  credits: {
    display: "flex",
    position: "absolute",
    bottom: "0",
    right: "0",
    left: "0",
    padding: "15px",
    justifyContent: "space-between"
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 1,
      duration: 255,
      level: 10,
      effect: "1",
      value: "33488897"
    };
    this.configValue = React.createRef();
  }

  setValue = key => (e, v) => {
    this.setState({ [key]: key !== "effect" ? v : e.target.value }, () => {
      this.setState(lastState => ({
        value:
          parseInt(lastState.color) +
          lastState.level * 256 +
          lastState.duration * 65536 +
          lastState.effect * 16777216
      }));
    });
  };

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
            <Typography gutterBottom>Color</Typography>
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
            <Typography gutterBottom>Duration Level</Typography>
            <Grid container spacing={2}>
              <Grid item>
                <TimelapseIcon />
              </Grid>
              <Grid item xs>
                <Slider
                  value={this.state.duration}
                  valueLabelDisplay="auto"
                  valueLabelFormat={this.durationFormater}
                  marks={[5, 10, 15, 20, 30, 45, 60, 120, 180, 240, 255]}
                  min={1}
                  max={255}
                  onChange={this.setValue("duration")}
                  ValueLabelComponent={ValueLabelComponent}
                />
              </Grid>
              <Grid item>
                <InfiniteIcon />
              </Grid>
            </Grid>
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
          </div>
        </div>
        <div className={this.props.classes.credits}>
          <Typography>
            <a href="https://www.inovelli.com/">https://www.inovelli.com/</a>
          </Typography>
          <Typography variant="caption">Tool By: @nathanfiscus</Typography>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
