import React from "react";
import { withStyles } from "@material-ui/core";
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

export const LED_COLORS = gradient.toArray("hex");

const styles = theme => ({
  "@global": {
    "@keyframes pulse": {
      "50%": {
        background: "#CCCCCC",
        boxShadow: "0px 0px 0px 0px"
      }
    },
    "@keyframes blink": {
      "50%": { opacity: "0.0" }
    },
    "@keyframes chase": {
      "0%": { bottom: "-60%" },
      "50%": { bottom: "30%" },
      "100%": { bottom: "-60%" }
    }
  },
  notificationLED: {
    width: "7px",
    height: "100%",
    backgroundColor: "#CCCCCC"
  },
  forever: {
    animationIterationCount: "infinite"
  },
  strobe: {
    animationDuration: "3.5s",
    animationName: "pulse"
    //animationTimingFunction: "linear"
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
  chase: {
    animationDuration: "2s",
    animationName: "chase",
    position: "absolute",
    animationTimingFunction: "linear"
  }
});

class LED extends React.Component {
  render() {
    let effectCSS = "";
    let effectStyles = {};
    effectStyles["opacity"] = this.props.level / 10;
    let effect = this.props.effects.find(i => i.value === this.props.effect);
    if (!effect) {
      effect = {};
    }
    switch (effect.name) {
      case "Fast Blink":
        effectCSS += ` ${this.props.classes.fastBlink}`;
        break;
      case "Slow Blink":
        effectCSS += ` ${this.props.classes.slowBlink}`;
        break;
      case "Pulse":
        effectCSS += ` ${this.props.classes.strobe}`;
        break;
      case "Chase":
        effectCSS += ` ${this.props.classes.chase}`;
        effectStyles.backgroundImage = `linear-gradient(transparent,${
          LED_COLORS[this.props.color]
        },transparent)`;
        effectStyles.backgroundColor = "unset";
        effectStyles.boxShadow = "unset";
        effectStyles.zIndex = 0;
        break;
      case "Solid":
        break;
      case "Off (Notification Cleared)":
        effectStyles.backgroundColor = "unset";
        break;
      default:
        console.log(
          "Effect " + effect.name + " not supported. Defaulting to Solid."
        );
        break;
    }

    effectStyles = { ...effectStyles, ...effect.styles };

    effectCSS += ` ${this.props.classes.forever}`;

    return (
      <div
        className={this.props.classes.notificationLED}
        style={{
          ...this.props.style,
          overflow: "hidden",
          position: "relative"
        }}
      >
        <span
          id="notification-led"
          className={this.props.classes.notificationLED + effectCSS}
          style={{
            backgroundColor: LED_COLORS[this.props.color],
            color: LED_COLORS[this.props.color],
            position: "absolute",
            zIndex: "2",
            height: "100%",
            boxShadow: "0px 0px 5px 0px",
            ...this.props.style,
            ...effectStyles
          }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(LED);
