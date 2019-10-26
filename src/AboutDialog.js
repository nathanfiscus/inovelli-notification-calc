import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton
} from "@material-ui/core";
import Twitter from "@material-ui/icons/Twitter";
import GitHub from "@material-ui/icons/GitHub";
import LinkedIn from "@material-ui/icons/LinkedIn";

class AboutDialog extends React.Component {
  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <DialogTitle>About</DialogTitle>
        <DialogContent>
          <Typography variant="h6">About the Tool</Typography>
          <Typography variant="caption" gutterBottom={true}>
            This is a simple application to assist in calculating the
            configuration values to send to your Inovelli v2 ZWave Light
            switches. The values calculated by this tool can be used by any
            compatible ZWave controller. See your controller documentation for
            information on where to use the values produced by this tool.
            <br />
            <br />
          </Typography>
          <Typography variant="h6">Compatible Switches</Typography>
          <List dense={true}>
            <ListItem>
              <ListItemText
                primary="Inovelli LZW30"
                secondary="On/Off Switch"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Inovelli LZW31"
                secondary="Dimmer Switch"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Inovelli LZW30-SN-1"
                secondary="On/Off Switch + Scenes"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Inovelli  LZW31-SN-1"
                secondary="Dimmer Switch + Scenes"
              />
            </ListItem>
          </List>
          <Typography variant="h6">Credits</Typography>
          <Typography>Written By @nathanfiscus</Typography>
          <IconButton
            component="a"
            href="https://www.github.com/nathanfiscus/inovelli-notification-calc"
          >
            <GitHub />
          </IconButton>
          <IconButton component="a" href="https://www.twitter.com/nathanfiscus">
            <Twitter />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.linkedin.com/in/nathanfiscus"
          >
            <LinkedIn />
          </IconButton>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default AboutDialog;
