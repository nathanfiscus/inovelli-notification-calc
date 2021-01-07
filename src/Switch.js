import React from "react";
import lzw30sn from "./Inovelli-LZW30-SN.png";

import NotificationLED from "./NotificationLED";

class Switch extends React.Component {
  static propTypes = {};

  static defaultProps = {
    scenes: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      taps: 0,
      paddle_id: "",
    };
    this.timeout = null;
  }

  findScene(taps, paddle_id) {
    return this.props.scenes.find(
      (s) => s.taps === taps.toString() && s.paddle_id === paddle_id
    );
  }

  triggerScene = () => {
    const scene = this.findScene(this.state.taps, this.state.paddle_id);
    this.setState({ taps: 0, paddle_id: "null" });
    this.props.onSceneTriggered(scene);
  };

  tapCounter = (paddle_id) => (e) => {
    clearTimeout(this.timeout);
    this.setState(
      (lastState) => {
        if (paddle_id !== lastState.paddle_id) {
          return {
            taps: 1,
            paddle_id,
          };
        } else {
          return {
            taps: lastState.taps + 1,
            paddle_id,
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
        {this.props.images.map((img) => (
          <img
            key={img.id}
            alt={img.id}
            id={img.id}
            src={img.src}
            style={{
              position: "absolute",
              ...img.pos,
            }}
          />
        ))}
        {this.props.paddles.map((paddle) => (
          <span
            id={paddle.id}
            key={paddle.id}
            style={{
              position: "absolute",
              cursor: "pointer",
              ...paddle.pos,
            }}
            onClick={this.tapCounter(paddle.id)}
          />
        ))}
        {this.props.leds.map((led, index) => (
          <NotificationLED
            key={led.id}
            style={{
              position: "absolute",
              ...led.pos,
            }}
            range={led.colorRange}
            color={this.props.configs[index].color}
            effect={this.props.configs[index].effect}
            effects={this.props.effects}
            level={this.props.configs[index].level}
          />
        ))}
      </div>
    );
  }
}

export default Switch;
