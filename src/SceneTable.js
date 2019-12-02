import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  withTheme
} from "@material-ui/core";
import Scenes from "./Scenes";

class SceneTable extends React.PureComponent {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <div>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Button Press</TableCell>
              <TableCell align="right">Scene ID</TableCell>
              <TableCell align="right">Scene Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Scenes.map(row => {
              const isHighlighted =
                Object.values(this.props.highlight || {}).join(".") ===
                Object.values(row).join(".");
              return (
                <TableRow
                  key={row.buttons}
                  style={{
                    background: isHighlighted
                      ? this.props.theme.palette.primary.main
                      : undefined,
                    color: isHighlighted
                      ? this.props.theme.palette.primary.contrastText
                      : undefined
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    style={{
                      color: isHighlighted
                        ? this.props.theme.palette.primary.contrastText
                        : undefined
                    }}
                  >
                    {row.buttons}
                  </TableCell>
                  <TableCell
                    style={{
                      color: isHighlighted
                        ? this.props.theme.palette.primary.contrastText
                        : undefined
                    }}
                    align="right"
                  >
                    {row.id}
                  </TableCell>
                  <TableCell
                    style={{
                      color: isHighlighted
                        ? this.props.theme.palette.primary.contrastText
                        : undefined
                    }}
                    align="right"
                  >
                    {row.data}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default withTheme(SceneTable);
