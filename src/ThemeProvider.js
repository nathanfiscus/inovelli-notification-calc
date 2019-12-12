import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

const primary = "#c21414";

class ThemeProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      themeType: window.localStorage.themeType || "light",
      formatType: window.localStorage.formatType || "10",
      setFormat: format => {
        this.setState({ formatType: format });
        window.localStorage.setItem("formatType", format);
      },
      setTheme: theme => {
        if (theme === "light" || theme === "dark") {
          this.setState({ themeType: theme });
          window.localStorage.setItem("themeType", theme);
        }
      }
    };
  }

  render() {
    const THEME = createMuiTheme({
      palette: {
        type: this.state.themeType,
        primary: { main: primary }
      }
    });
    return (
      <MuiThemeProvider theme={THEME}>
        {this.props.children(this.state)}
      </MuiThemeProvider>
    );
  }
}

export default ThemeProvider;
