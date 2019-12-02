import React from "react";
import lzw30sn from "./Inovelli-LZW30-SN.gif";
import NotificationLED from "./NotificationLED";
import Scenes from "./Scenes";

class Switch extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      taps: 0,
      direction: ""
    };
    this.timeout = null;
  }

  findScene(taps, direction) {
    return Scenes.find(
      s => s.taps === taps.toString() && s.direction === direction
    );
  }

  handleConfigClick = () => {
    const scene = this.findScene(1, "config");
    this.props.onSceneTriggered(scene);
  };

  triggerScene = () => {
    const scene = this.findScene(this.state.taps, this.state.direction);
    this.setState({ taps: 0, direction: "null" });
    this.props.onSceneTriggered(scene);
  };

  tapCounter = direction => e => {
    clearTimeout(this.timeout);
    this.setState(
      lastState => {
        if (direction !== lastState.direction) {
          return {
            taps: 1,
            direction
          };
        } else {
          return {
            taps: lastState.taps + 1,
            direction
          };
        }
      },
      () => {
        this.timeout = setTimeout(this.triggerScene, 500);
      }
    );
  };

  render() {
    return (
      <div style={{ position: "relative" }}>
        <img alt="Inovelli-LZW30-SN" src={lzw30sn} />
        <span
          id="auxButton"
          style={{
            position: "absolute",
            top: "162px",
            right: "129px",
            width: "10px",
            height: "57px",
            cursor: "pointer"
          }}
          onClick={this.handleConfigClick}
        />
        <span
          id="up-paddle"
          style={{
            position: "absolute",
            top: "162px",
            left: "135px",
            width: "120px",
            height: "100px",
            cursor: "pointer"
          }}
          onClick={this.tapCounter("up")}
        />
        <span
          id="down-paddle"
          style={{
            position: "absolute",
            bottom: "162px",
            left: "135px",
            width: "120px",
            height: "100px",
            cursor: "pointer"
          }}
          onClick={this.tapCounter("down")}
        />
        <NotificationLED
          style={{
            bottom: "162px",
            right: "129px",
            position: "absolute"
          }}
          type={this.props.type}
          color={this.props.color}
          effect={this.props.effect}
          level={this.props.level}
        />
      </div>
    );
  }
}

export default Switch;
