import React from "react";
import LED from "./LED";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column"
  }
});

class NotificationLED extends React.Component {
  render() {
    const { type, color, effect, level, effects } = this.props;
    return (
      <div style={this.props.style}>
        <LED
          color={color}
          effect={effect}
          level={level}
          type={type}
          effects={effects}
        />
      </div>
    );
  }
}

export default withStyles(styles)(NotificationLED);
