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
  Tab,
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
import Switches from "./Switches";

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
    "rgb(255,0,0)",
  ],
  steps: 256,
  model: "rgb",
});

const LED_COLORS = gradient.toArray("hex");

const styles = (theme) => ({
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
        maxWidth: "480px",
      },
    },
  },
  switchContainer: {
    position: "relative",
  },
  colorHelper: {
    height: "10px",
    width: "100%",
    background:
      "linear-gradient(to right, rgb(255,0,0), rgb(255,125,0), rgb(255,255,0), rgb(125,255,0), rgb(0,255,0), rgb(0,255,125), rgb(0,255,255), rgb(0,125,255), rgb(0,0,255), rgb(125,0,255), rgb(255,0,255), rgb(255,0,125), rgb(255,0,0))",
  },
  credits: {
    display: "flex",
    position: "absolute",
    bottom: "0",
    right: "0",
    left: "0",
    padding: "15px",
    justifyContent: "space-between",
  },
  optionsContainer: {
    padding: theme.spacing(0, 3),
  },
  switchPicker: {
    marginBottom: theme.spacing(3),
  },
});

//Might Move to this calc in the future. More straight forward

const longToByteArray = function (/*long*/ long) {
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
      aboutDialogOpen: false,
      optionsDialogOpen: false,
      type: 0,
      tab: 0,
      selectedLED: 0,
      highlight: null,
      ledConfigs: JSON.parse(
        JSON.stringify(Switches[0].leds.map((l) => l.default))
      ),
      notificationConfigs: JSON.parse(
        JSON.stringify(Switches[0].leds.map((l) => l.defaultNotification))
      ),
    };
  }

  setValue = (param, value) => {
    if (param === "all") {
      this.setState(value, () => {
        this.setState((lastState) => ({
          value:
            parseInt(lastState.color) +
            lastState.level * 256 +
            lastState.duration * 65536 +
            lastState.effect * 16777216,
        }));
      });
    } else {
      this.setState({ [param]: value }, () => {
        if (this.state.type === "onoff" && this.state.effect === "5") {
          this.setState({ effect: "1" });
        }
        //83823359
        this.setState((lastState) => ({
          value:
            parseInt(lastState.color) +
            lastState.level * 256 +
            lastState.duration * 65536 +
            lastState.effect * 16777216,
        }));
      });
    }
  };

  setConfigValue = (key, attr, v) => {
    console.log(key, attr, v);
    this.setState((lastState) => {
      let config = lastState[key];
      if (attr === "all") {
        config[lastState.selectedLED] = { ...v };
      } else {
        config[lastState.selectedLED][attr] = v;
      }
      return { [key]: config };
    });
  };

  setSwitchType = (e) => {
    const configs = Switches[e.target.value].leds
      .map((l) => Object.assign({}, l.default))
      .slice();
    this.setState({
      type: e.target.value,
      selectedLED: 0,
      ledConfigs: JSON.parse(
        JSON.stringify(Switches[e.target.value].leds.map((l) => l.default))
      ),
      notificationConfigs: JSON.parse(
        JSON.stringify(
          Switches[e.target.value].leds.map((l) => l.defaultNotification)
        )
      ),
    });
  };

  setSelectedLED = (e) => {
    this.setState({ selectedLED: e.target.value });
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

  onSceneTrigger = (scene) => {
    this.setState({
      highlight: scene,
      tab: scene !== undefined ? 2 : this.state.tab,
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
        {({
          setTheme,
          themeType,
          formatType,
          setFormat,
          setCalculationMethod,
          calculationMethod,
        }) => (
          <div className={this.props.classes.root}>
            <CssBaseline />
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" style={{ flexGrow: "1" }}>
                  Inovelli Toolbox
                </Typography>
                <div style={{ flexShrink: "0", flexGrow: "0" }}>
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
                  leds={Switches[this.state.type].leds}
                  paddles={Switches[this.state.type].paddles}
                  configs={
                    this.state.tab !== 0
                      ? this.state.notificationConfigs
                      : this.state.ledConfigs
                  }
                  scenes={Switches[this.state.type].scenes}
                  effects={Switches[this.state.type].effects}
                  images={Switches[this.state.type].images}
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
                      {Switches.map((sw, index) => (
                        <MenuItem key={sw.displayName} value={index}>
                          {sw.displayName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {Switches[this.state.type].leds.length > 1 && (
                    <FormControl fullWidth={true} style={{ marginTop: "10px" }}>
                      <InputLabel>LED</InputLabel>
                      <Select
                        value={this.state.selectedLED}
                        onChange={this.setSelectedLED}
                      >
                        {Switches[this.state.type].leds.map((led, index) => (
                          <MenuItem key={led.name} value={index}>
                            {led.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
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
                    effects={Switches[this.state.type].effects}
                    byteOrder={Switches[this.state.type].byteOrder}
                    parameters={
                      Switches[this.state.type].leds[this.state.selectedLED]
                        .parameters
                    }
                    config={
                      this.state.notificationConfigs[this.state.selectedLED]
                    }
                    colorRange={
                      Switches[this.state.type].leds[this.state.selectedLED]
                        .colorRange
                    }
                    brightnessRange={
                      Switches[this.state.type].leds[this.state.selectedLED]
                        .brightnessRange
                    }
                    onChange={this.setConfigValue}
                    format={formatType}
                  />
                )}
                {this.state.tab === 2 && (
                  <SceneTable
                    highlight={this.state.highlight}
                    scenes={Switches[this.state.type].scenes}
                  />
                )}
                {this.state.tab === 0 && (
                  <StandardLEDTools
                    parameters={
                      Switches[this.state.type].leds[this.state.selectedLED]
                        .parameters
                    }
                    colorRange={
                      Switches[this.state.type].leds[this.state.selectedLED]
                        .colorRange
                    }
                    brightnessRange={
                      Switches[this.state.type].leds[this.state.selectedLED]
                        .brightnessRange
                    }
                    calculationMethod={calculationMethod}
                    config={this.state.ledConfigs[this.state.selectedLED]}
                    onChange={this.setConfigValue}
                    format={formatType}
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
              setCalculationMethod={setCalculationMethod}
              calculationMethod={calculationMethod}
            />
          </div>
        )}
      </ThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
