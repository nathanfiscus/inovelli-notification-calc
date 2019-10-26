import React from "react";
import PropTypes from "prop-types";
import {
  CssBaseline,
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
  Tooltip,
  AppBar,
  Toolbar
} from "@material-ui/core";
import Brightness0 from "@material-ui/icons/Brightness2";
import Brightness7 from "@material-ui/icons/Brightness7";
import InfiniteIcon from "@material-ui/icons/AllInclusive";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import ThemeProvider from "./ThemeProvider";
import InfoOutlined from "@material-ui/icons/InfoOutlined";
import AboutDialog from "./AboutDialog";

import lzw30sn from "./Inovelli-LZW30-SN.gif";
let Gradient = require("gradient2");
let gradient = new Gradient({
  colors: ["orangered", "yellow", "green", "cyan", "blue", "violet", "red"],
  steps: 256,
  model: "rgb"
});

const LED_COLORS = gradient.toArray("hex");

const durationFormater = val => {
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
      "linear-gradient(to right, orangered, yellow, green, cyan, blue, violet,red)"
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
      value: "33488897",
      aboutDialogOpen: false
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

  openAboutDialog = () => {
    this.setState({ aboutDialogOpen: true });
  };

  closeAboutDialog = () => {
    this.setState({ aboutDialogOpen: false });
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
      <ThemeProvider>
        {({ setTheme, themeType }) => (
          <div className={this.props.classes.root}>
            <CssBaseline />
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" style={{ flexGrow: "1" }}>
                  Inovelli LED Notification Calculator
                </Typography>
                <div>
                  <Tooltip title="Light\Dark Theme">
                    <IconButton
                      color="inherit"
                      onClick={() => {
                        setTheme(themeType === "dark" ? "light" : "dark");
                      }}
                    >
                      <SvgIcon>
                        {themeType === "light" ? (
                          <svg viewBox="0 0 24 24">
                            <path d="M20,11H23V13H20V11M1,11H4V13H1V11M13,1V4H11V1H13M4.92,3.5L7.05,5.64L5.63,7.05L3.5,4.93L4.92,3.5M16.95,5.63L19.07,3.5L20.5,4.93L18.37,7.05L16.95,5.63M12,6A6,6 0 0,1 18,12C18,14.22 16.79,16.16 15,17.2V19A1,1 0 0,1 14,20H10A1,1 0 0,1 9,19V17.2C7.21,16.16 6,14.22 6,12A6,6 0 0,1 12,6M14,21V22A1,1 0 0,1 13,23H11A1,1 0 0,1 10,22V21H14M11,18H13V15.87C14.73,15.43 16,13.86 16,12A4,4 0 0,0 12,8A4,4 0 0,0 8,12C8,13.86 9.27,15.43 11,15.87V18Z" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24">
                            <path d="M12,2A7,7 0 0,1 19,9C19,11.38 17.81,13.47 16,14.74V17A1,1 0 0,1 15,18H9A1,1 0 0,1 8,17V14.74C6.19,13.47 5,11.38 5,9A7,7 0 0,1 12,2M9,21V20H15V21A1,1 0 0,1 14,22H10A1,1 0 0,1 9,21M12,4A5,5 0 0,0 7,9C7,11.05 8.23,12.81 10,13.58V16H14V13.58C15.77,12.81 17,11.05 17,9A5,5 0 0,0 12,4Z" />
                          </svg>
                        )}
                      </SvgIcon>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="About">
                    <IconButton color="inherit" onClick={this.openAboutDialog}>
                      <InfoOutlined />
                    </IconButton>
                  </Tooltip>
                </div>
              </Toolbar>
            </AppBar>
            <div className={this.props.classes.switchWrapper}>
              <div className={this.props.classes.switchContainer}>
                <img alt="Inovelli-LZW30-SN" src={lzw30sn} />
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
                <Typography gutterBottom>Duration</Typography>
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
            <AboutDialog
              open={this.state.aboutDialogOpen}
              onClose={this.closeAboutDialog}
            />
          </div>
        )}
      </ThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
