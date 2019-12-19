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
  IconButton,
  SvgIcon,
  Tooltip,
  AppBar,
  Toolbar,
  Tabs,
  Tab
} from "@material-ui/core";
import ThemeProvider from "./ThemeProvider";
import InfoOutlined from "@material-ui/icons/InfoOutlined";
import AboutDialog from "./AboutDialog";
import Switch from "./Switch";
import NotificationCalc from "./NotificationCalc";
import SceneTable from "./SceneTable";
import StandardLEDTools from "./StandardLEDTools";
import TuneIcon from "@material-ui/icons/Tune";
import OptionsDialog from "./Options";

let Gradient = require("gradient2");
let gradient = new Gradient({
  colors: [
    "rgb(255,0,0)",
    "rgb(255,125,0)",
    "rgb(255,255,0)",
    "rgb(125,255,0)",
    "rgb(0,255,0)",
    "rgb(0,255,125)",
    "rgb(0,255,255)",
    "rgb(0,125,255)",
    "rgb(0,0,255)",
    "rgb(125,0,255)",
    "rgb(255,0,255)",
    "rgb(255,0,125)",
    "rgb(255,0,0)"
  ],
  steps: 256,
  model: "rgb"
});

const LED_COLORS = gradient.toArray("hex");

const styles = theme => ({
  switchWrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: theme.spacing(3),
    marginBottom: theme.spacing(6),
    "&>*": {
      minWidth: "400px",
      "&:last-child": {
        maxWidth: "480px"
      }
    }
  },
  switchContainer: {
    position: "relative"
  },
  colorHelper: {
    height: "10px",
    width: "100%",
    background:
      "linear-gradient(to right, rgb(255,0,0), rgb(255,125,0), rgb(255,255,0), rgb(125,255,0), rgb(0,255,0), rgb(0,255,125), rgb(0,255,255), rgb(0,125,255), rgb(0,0,255), rgb(125,0,255), rgb(255,0,255), rgb(255,0,125), rgb(255,0,0))"
  },
  credits: {
    display: "flex",
    position: "absolute",
    bottom: "0",
    right: "0",
    left: "0",
    padding: "15px",
    justifyContent: "space-between"
  },
  optionsContainer: {
    padding: theme.spacing(0, 3)
  },
  switchPicker: {
    marginBottom: theme.spacing(3)
  }
});

//Might Move to this calc in the future. More straight forward

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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 1,
      duration: 255,
      level: 10,
      effect: "1",
      value: 33491457,
      aboutDialogOpen: false,
      type: "onoff",
      tab: 0,
      highlight: null,
      standardColor: 1,
      standardBrightness: 10
    };
  }

  setValue = (param, value) => {
    if (param === "all") {
      this.setState(value, () => {
        this.setState(lastState => ({
          value:
            parseInt(lastState.color) +
            lastState.level * 256 +
            lastState.duration * 65536 +
            lastState.effect * 16777216
        }));
      });
    } else {
      this.setState({ [param]: value }, () => {
        if (this.state.type === "onoff" && this.state.effect === "5") {
          this.setState({ effect: "1" });
        }
        //83823359
        this.setState(lastState => ({
          value:
            parseInt(lastState.color) +
            lastState.level * 256 +
            lastState.duration * 65536 +
            lastState.effect * 16777216
        }));
      });
    }
  };

  setSwitchType = e => {
    this.setState({ type: e.target.value });
  };

  openAboutDialog = () => {
    this.setState({ aboutDialogOpen: true });
  };

  closeAboutDialog = () => {
    this.setState({ aboutDialogOpen: false });
  };

  tabChange = (e, value) => {
    this.setState({ tab: value });
  };

  onSceneTrigger = scene => {
    this.setState({
      highlight: scene,
      tab: scene !== undefined ? 2 : this.state.tab
    });
  };

  openOptions = () => {
    this.setState({ optionsDialogOpen: true });
  };

  closeOptions = () => {
    this.setState({ optionsDialogOpen: false });
  };

  render() {
    return (
      <ThemeProvider>
        {({ setTheme, themeType, formatType, setFormat }) => (
          <div className={this.props.classes.root}>
            <CssBaseline />
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" style={{ flexGrow: "1" }}>
                  Inovelli Toolbox
                </Typography>
                <div style={{ flexShrink: "0", flexGrow: "0" }}>
                  {/* <Tooltip title="Light\Dark Theme">
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
                  </Tooltip> */}
                  <Tooltip title="Options">
                    <IconButton color="inherit" onClick={this.openOptions}>
                      <TuneIcon />
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
              <div>
                <Switch
                  type={this.state.type}
                  color={
                    LED_COLORS[
                      parseInt(
                        this.state.tab
                          ? this.state.color
                          : this.state.standardColor
                      )
                    ]
                  }
                  effect={this.state.tab ? this.state.effect : "1"}
                  level={
                    this.state.tab
                      ? this.state.level
                      : this.state.standardBrightness
                  }
                  onSceneTriggered={this.onSceneTrigger}
                />
              </div>
              <div className={this.props.classes.optionsContainer}>
                <div className={this.props.classes.switchPicker}>
                  <FormControl fullWidth={true} margin="normal">
                    <InputLabel>Switch Type</InputLabel>
                    <Select
                      value={this.state.type}
                      onChange={this.setSwitchType}
                    >
                      <MenuItem value="onoff">Standard On/Off</MenuItem>
                      <MenuItem value="dimmer">Dimmer</MenuItem>
                    </Select>
                  </FormControl>
                  <Tabs
                    value={this.state.tab}
                    indicatorColor="primary"
                    onChange={this.tabChange}
                    style={{ marginBottom: "10px" }}
                    variant="fullWidth"
                    centered
                  >
                    <Tab label="LED" />
                    <Tab label="Notifications" />
                    <Tab label="Scenes" />
                  </Tabs>
                </div>

                {this.state.tab === 1 && (
                  <NotificationCalc
                    color={this.state.color}
                    level={this.state.level}
                    duration={this.state.duration}
                    effect={this.state.effect}
                    value={this.state.value}
                    type={this.state.type}
                    onChange={this.setValue}
                    format={formatType}
                  />
                )}
                {this.state.tab === 2 && (
                  <SceneTable highlight={this.state.highlight} />
                )}
                {this.state.tab === 0 && (
                  <StandardLEDTools
                    color={this.state.standardColor}
                    brightness={this.state.standardBrightness}
                    onChange={this.setValue}
                    format={formatType}
                    type={this.state.type}
                  />
                )}
              </div>
            </div>
            <AboutDialog
              open={this.state.aboutDialogOpen}
              onClose={this.closeAboutDialog}
            />
            <OptionsDialog
              open={this.state.optionsDialogOpen}
              onClose={this.closeOptions}
              theme={themeType}
              format={formatType}
              setTheme={setTheme}
              setFormat={setFormat}
            />
          </div>
        )}
      </ThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
