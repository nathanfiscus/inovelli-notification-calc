import React from "react";
import PropTypes from "prop-types";
import Brightness0 from "@material-ui/icons/Brightness2";
import Brightness7 from "@material-ui/icons/Brightness7";
import {
  Slider,
  Typography,
  Grid,
  withStyles,
  InputAdornment,
  Tooltip,
  IconButton,
  SvgIcon,
  TextField
} from "@material-ui/core";

const styles = theme => ({
  colorHelper: {
    height: "10px",
    width: "100%",
    background:
      "linear-gradient(to right, rgb(255,0,0), rgb(255,125,0), rgb(255,255,0), rgb(125,255,0), rgb(0,255,0), rgb(0,255,125), rgb(0,255,255), rgb(0,125,255), rgb(0,0,255), rgb(125,0,255), rgb(255,0,255), rgb(255,0,125), rgb(255,0,0))"
  },
  switchPicker: {
    marginBottom: theme.spacing(3)
  }
});

class StandardLEDTools extends React.PureComponent {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.configValueColor = React.createRef();
    this.configValueBrightness = React.createRef();
  }

  setValue = key => (e, v) => {
    this.props.onChange(key, v);
  };

  handleCopyColor = () => {
    if (this.configValueColor.current) {
      this.configValueColor.current.select();
      document.execCommand("copy");
    }
  };

  handleCopyBrightness = () => {
    if (this.configValueBrightness.current) {
      this.configValueBrightness.current.select();
      document.execCommand("copy");
    }
  };

  render() {
    return (
      <div>
        <Typography gutterBottom>Color</Typography>
        <div className={this.props.classes.colorHelper} />
        <Slider
          defaultValue={1}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={1}
          min={1}
          max={255}
          value={this.props.color}
          onChange={this.setValue("standardColor")}
        />

        <Typography gutterBottom>Brightness Level</Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Brightness0 />
          </Grid>
          <Grid item xs>
            <Slider
              value={this.props.brightness}
              valueLabelDisplay="auto"
              min={0}
              max={10}
              onChange={this.setValue("standardBrightness")}
            />
          </Grid>
          <Grid item>
            <Brightness7 />
          </Grid>
        </Grid>
        <TextField
          style={{ marginTop: "60px" }}
          value={this.props.color}
          readOnly={true}
          label="Color Value (Parameter 2)"
          fullWidth={true}
          margin="normal"
          variant="outlined"
          inputRef={this.configValueColor}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Copy to Clipboard">
                  <IconButton edge="end" onClick={this.handleCopyColor}>
                    <SvgIcon>
                      <svg viewBox="0 0 24 24">
                        <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
                      </svg>
                    </SvgIcon>
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            )
          }}
        />
        <TextField
          style={{ marginTop: "60px" }}
          value={this.props.brightness}
          readOnly={true}
          label="Brightness Value (Parameter 3)"
          fullWidth={true}
          margin="normal"
          variant="outlined"
          inputRef={this.configValueBrightness}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Copy to Clipboard">
                  <IconButton edge="end" onClick={this.handleCopyBrightness}>
                    <SvgIcon>
                      <svg viewBox="0 0 24 24">
                        <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
                      </svg>
                    </SvgIcon>
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            )
          }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(StandardLEDTools);
