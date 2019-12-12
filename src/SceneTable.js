import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Snackbar
} from "@material-ui/core";
import Scenes from "./Scenes";
import SceneRow from "./SceneRow";
import Slide from "@material-ui/core/Slide";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

class SceneTable extends React.PureComponent {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      snackbarOpen: false,
      copyStatusText: ""
    };
  }

  handleOnCopy = success => {
    this.setState({
      snackbarOpen: true,
      copyStatusText: success
        ? "Copied to Clipboard"
        : "Unable to copy to clipboard. Check browser settings."
    });
  };

  handleSnackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };

  render() {
    return (
      <div>
        <div style={{ maxHeight: "400px", overflow: "auto" }}>
          <Table size="small" stickyHeader={true}>
            <TableHead>
              <TableRow>
                <TableCell>Button Press</TableCell>
                <TableCell align="right">Scene ID</TableCell>
                <TableCell align="right">Scene Data</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Scenes.map((row, index) => {
                const isHighlighted =
                  Object.values(this.props.highlight || {}).join(".") ===
                  Object.values(row).join(".");
                const isDisabled = [0, 1, 11, 12, 13, 14].indexOf(index) > -1;
                return (
                  <SceneRow
                    key={row.buttons}
                    isHighlighted={isHighlighted}
                    isDisabled={isDisabled}
                    row={row}
                    onCopy={this.handleOnCopy}
                  />
                );
              })}
            </TableBody>
          </Table>
        </div>
        <Typography variant="caption" color="textSecondary">
          Rows greyed out may require disabling the relay in order to function
          <br />
          or may not be supported by all hubs.
        </Typography>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          TransitionComponent={SlideTransition}
          open={this.state.snackbarOpen}
          autoHideDuration={4000}
          onClose={this.handleSnackbarClose}
          message={<span id="message-id">{this.state.copyStatusText}</span>}
        />
      </div>
    );
  }
}

export default SceneTable;
