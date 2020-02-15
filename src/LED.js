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
      "100%": { bottom: "-65%" }
    },
    "@keyframes pulse_Shadow": {
      "50%": {
        boxShadow: "0px 0px 0px 0px"
      }
    },
    "@keyframes blink_Shadow": {
      "50%": { boxShadow: "unset" }
    },
    "@keyframes chase_Shadow": {
      "0%": { boxShadow: "0px 0px 0px 0px" },
      "50%": { boxShadow: "0px 0px 0px 0px" },
      "100%": { boxShadow: "0px 0px 0px 0px" }
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
  },
  strobe_Shadow: {
    animationDuration: "3.5s",
    animationName: "pulse_Shadow"
  },
  fastBlink_Shadow: {
    animationDuration: "0.80s",
    animationName: "blink_Shadow",
    animationTimingFunction: "step-start"
  },
  slowBlink_Shadow: {
    animationDuration: "2s",
    animationName: "blink_Shadow",
    animationTimingFunction: "step-start"
  },
  chase_Shadow: {
    animationDuration: "2s",
    animationName: "chase_Shadow",
    position: "absolute",
    animationTimingFunction: "linear"
  }
});

class LED extends React.Component {
  render() {
    let effectCSS = "";
    let effectCSS_Shadow = "";
    let effectStyles = {};
    effectStyles["opacity"] = (this.props.level / 10) * 0.6;
    let effect = this.props.effects.find(i => i.value === this.props.effect);
    if (!effect) {
      effect = {};
    }
    switch (effect.name) {
      case "Fast Blink":
        effectCSS += ` ${this.props.classes.fastBlink}`;
        effectCSS_Shadow += ` ${this.props.classes.fastBlink_Shadow}`;
        break;
      case "Slow Blink":
        effectCSS += ` ${this.props.classes.slowBlink}`;
        effectCSS_Shadow += ` ${this.props.classes.slowBlink_Shadow}`;
        break;
      case "Pulse":
        effectCSS += ` ${this.props.classes.strobe}`;
        effectCSS_Shadow += ` ${this.props.classes.strobe_Shadow}`;
        break;
      case "Chase":
        effectCSS += ` ${this.props.classes.chase}`;
        effectCSS_Shadow += ` ${this.props.classes.chase_Shadow}`;
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
    effectCSS_Shadow += ` ${this.props.classes.forever}`;

    return (
      <div
        className={this.props.classes.notificationLED + " " + effectCSS_Shadow}
        style={{
          ...this.props.style,
          overflow: "hidden",
          position: "relative",
          boxShadow:
            "0px 0px " +
            Math.ceil(this.props.level / 4) +
            "px 0px " +
            LED_COLORS[this.props.color]
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
            ...this.props.style,
            ...effectStyles
          }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(LED);
