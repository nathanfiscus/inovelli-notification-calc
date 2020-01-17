import React from "react";
import PropTypes from "prop-types";
import { Tooltip } from "@material-ui/core";

const durationFormater = val => {
  switch (val) {
    case 255:
      return "Forever";
    case 1:
      return "1 second";
    default:
      if (val >= 60 && val < 120) {
        let minutes = val === 60 ? 1 : val - 60;
        return `${minutes} minute${minutes <= 1 ? "" : "s"}`;
      } else if (val >= 120) {
        let hours = val === 120 ? 1 : val - 120;
        let days = Math.floor(hours / 24);
        if (days > 0) {
          hours = hours % 24;
        }
        if (days === 0) {
          return `${hours} hour${hours === 1 ? "" : "s"}`;
        } else {
          return `${days} day${days === 1 ? "" : "s"} ${hours} hour${
            hours === 1 ? "" : "s"
          }`;
        }
      } else {
        return `${val} seconds`;
      }
  }
};

function ValueLabelTooltip(props) {
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

ValueLabelTooltip.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired
};

export default ValueLabelTooltip;
