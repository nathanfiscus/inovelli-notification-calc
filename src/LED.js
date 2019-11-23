import React from "react";
import { withStyles } from "@material-ui/core";
import { DIMMER_EFFECTS, ONOFF_EFFECTS } from "./Effects";

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
    height: "39px",
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
    switch (this.props.effect) {
      case this.props.type === "dimmer"
        ? DIMMER_EFFECTS.FAST_BLINK
        : ONOFF_EFFECTS.FAST_BLINK:
        effectCSS += ` ${this.props.classes.fastBlink}`;
        break;
      case this.props.type === "dimmer"
        ? DIMMER_EFFECTS.SLOW_BLINK
        : ONOFF_EFFECTS.SLOW_BLINK:
        effectCSS += ` ${this.props.classes.slowBlink}`;
        break;
      case this.props.type === "dimmer"
        ? DIMMER_EFFECTS.PULSE
        : ONOFF_EFFECTS.PULSE:
        effectCSS += ` ${this.props.classes.strobe}`;
        break;
      case this.props.type === "dimmer" ? DIMMER_EFFECTS.CHASE : "":
        effectCSS += ` ${this.props.classes.chase}`;
        effectStyles.backgroundImage = `linear-gradient(transparent,${this.props.color},transparent)`;
        effectStyles.backgroundColor = "unset";
        effectStyles.boxShadow = "unset";
        effectStyles.zIndex = 0;
        effectStyles.height = "300px";
        break;
      default:
        break;
    }

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
            backgroundColor: this.props.color,
            color: this.props.color,
            position: "absolute",
            zIndex: "2",
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
