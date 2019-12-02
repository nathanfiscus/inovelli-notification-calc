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
      if (val > 59) {
        return `${Math.floor(val / 60)} minutes ${val % 60} seconds`;
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
