import React from "react";
import {
  TableRow,
  TableCell,
  withStyles,
  IconButton,
  Menu,
  MenuItem,
  SvgIcon,
  Tooltip
} from "@material-ui/core";
import YAML from "json-to-pretty-yaml";
import copyToClipboard from "./ClipboardAccess";

const styles = theme => ({
  disabled: {
    color: theme.palette.action.disabled + "!important"
  },
  highlighted: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  }
});

class SceneRow extends React.PureComponent {
  static defaultProps = {
    onCopy: () => {}
  };
  constructor(props) {
    super(props);
    this.state = {
      anchor: undefined
    };
    this.boxRef = React.createRef();
  }
  componentDidMount() {
    if (this.props.isHighlighted && this.boxRef.current) {
      this.boxRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.isHighlighted !== this.props.isHighlighted &&
      this.props.isHighlighted &&
      this.boxRef.current
    ) {
      this.boxRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
      });
    }
  }

  toggleMenu = e => {
    const { target } = e;
    this.setState(lastState => ({ anchor: lastState.anchor ? null : target }));
  };

  copyToYAML = () => {
    this.setState({ anchor: null });
    copyToClipboard(
      YAML.stringify({
        scene_data: parseInt(this.props.row.data),
        scene_id: parseInt(this.props.row.id)
      }),
      this.props.onCopy
    );
  };

  render() {
    const { isDisabled, isHighlighted, row } = this.props;
    return (
      <TableRow
        ref={this.boxRef}
        key={row.buttons}
        className={
          isHighlighted
            ? this.props.classes.highlighted
            : isDisabled
            ? this.props.classes.disabled
            : undefined
        }
      >
        <TableCell
          component="th"
          scope="row"
          className={
            isHighlighted
              ? this.props.classes.highlighted
              : isDisabled
              ? this.props.classes.disabled
              : undefined
          }
        >
          {row.buttons}
        </TableCell>
        <TableCell
          className={
            isHighlighted
              ? this.props.classes.highlighted
              : isDisabled
              ? this.props.classes.disabled
              : undefined
          }
          align="right"
        >
          {row.id}
        </TableCell>
        <TableCell
          className={
            isHighlighted
              ? this.props.classes.highlighted
              : isDisabled
              ? this.props.classes.disabled
              : undefined
          }
          align="right"
        >
          {row.data}
        </TableCell>
        <TableCell
          className={
            isHighlighted
              ? this.props.classes.highlighted
              : isDisabled
              ? this.props.classes.disabled
              : undefined
          }
        >
          <Tooltip title="Copy to Clipboard">
            <IconButton size="small" onClick={this.toggleMenu}>
              <SvgIcon>
                <svg viewBox="0 0 24 24">
                  <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
                </svg>
              </SvgIcon>
            </IconButton>
          </Tooltip>
          <Menu
            open={Boolean(this.state.anchor)}
            anchorEl={this.state.anchor}
            onClose={this.toggleMenu}
          >
            <MenuItem onClick={this.copyToYAML}>Copy as YAML</MenuItem>
          </Menu>
        </TableCell>
      </TableRow>
    );
  }
}

export default withStyles(styles)(SceneRow);
