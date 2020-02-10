import lzw36 from "./Hurricane.png";

export const CONFIG_PARAMETER = {
  COLOR: "color",
  BRIGHTNESS: "brightness",
  LED_EFFECT: "effect"
};

export default [
  {
    displayName: "Dimmer Switch",
    id: "dimmer",
    paddles: [
      {
        id: "up",
        pos: { top: "162px", left: "135px", width: "120px", height: "100px" }
      },
      {
        id: "down",
        pos: { bottom: "162px", left: "135px", width: "120px", height: "100px" }
      },
      {
        id: "config",
        pos: { top: "162px", right: "129px", width: "10px", height: "57px" }
      }
    ],
    images: [],
    leds: [
      {
        id: "led-0",
        name: "",
        pos: {
          height: "210px",
          bottom: "162px",
          right: "129px"
        },
        parameters: {
          [CONFIG_PARAMETER.COLOR]: 13,
          [CONFIG_PARAMETER.BRIGHTNESS]: 14,
          [CONFIG_PARAMETER.LED_EFFECT]: 16
        },
        default: {
          effect: 1,
          level: 10,
          color: 170,
          duration: 255
        }
      }
    ],
    effects: [
      { name: "Off (Notification Cleared)", value: 0 },
      { name: "Solid", value: 1 },
      { name: "Chase", value: 2, styles: { height: "300px" } },
      { name: "Fast Blink", value: 3 },
      { name: "Slow Blink", value: 4 },
      { name: "Pulse", value: 5 }
    ],
    scenes: [
      {
        buttons: "1 x Up",
        taps: "1",
        paddle_id: "up",
        id: "2",
        data: "7680",
        disabled: true
      },
      {
        buttons: "1 x Down",
        taps: "1",
        paddle_id: "down",
        id: "1",
        data: "7680",
        disabled: true
      },
      { buttons: "2 x Up", taps: "2", paddle_id: "up", id: "2", data: "7860" },
      {
        buttons: "2 x Down",
        taps: "2",
        paddle_id: "down",
        id: "1",
        data: "7860"
      },
      { buttons: "3 x Up", taps: "3", paddle_id: "up", id: "2", data: "7920" },
      {
        buttons: "3 x Down",
        taps: "3",
        paddle_id: "down",
        id: "1",
        data: "7920"
      },
      { buttons: "4 x Up", taps: "4", paddle_id: "up", id: "2", data: "7980" },
      {
        buttons: "4 x Down",
        taps: "4",
        paddle_id: "down",
        id: "1",
        data: "7980"
      },
      { buttons: "5 x Up", taps: "5", paddle_id: "up", id: "2", data: "8040" },
      {
        buttons: "5 x Down",
        taps: "5",
        paddle_id: "down",
        id: "1",
        data: "8040"
      },
      {
        buttons: "1 x Config",
        taps: "1",
        paddle_id: "config",
        id: "3",
        data: "7680"
      },
      {
        buttons: "Hold Up",
        taps: "0",
        paddle_id: "up",
        id: "2",
        data: "7800",
        disabled: true
      },
      {
        buttons: "Release Up",
        taps: "-1",
        paddle_id: "up",
        id: "2",
        data: "7740",
        disabled: true
      },
      {
        buttons: "Hold Down",
        taps: "0",
        paddle_id: "down",
        id: "1",
        data: "7800",
        disabled: true
      },
      {
        buttons: "Release Down",
        taps: "-1",
        paddle_id: "down",
        id: "1",
        data: "7740",
        disabled: true
      }
    ]
  },
  {
    id: "onoff",
    displayName: "On\\Off Switch",
    paddles: [
      {
        id: "up",
        pos: { top: "162px", left: "135px", width: "120px", height: "100px" }
      },
      {
        id: "down",
        pos: { bottom: "162px", left: "135px", width: "120px", height: "100px" }
      },
      {
        id: "config",
        pos: { top: "162px", right: "129px", width: "10px", height: "57px" }
      }
    ],
    leds: [
      {
        id: "led-0",
        name: "",
        pos: {
          height: "39px",
          bottom: "162px",
          right: "129px"
        },
        parameters: {
          [CONFIG_PARAMETER.COLOR]: 5,
          [CONFIG_PARAMETER.BRIGHTNESS]: 6,
          [CONFIG_PARAMETER.LED_EFFECT]: 8
        },
        default: {
          effect: 1,
          level: 10,
          color: 170,
          duration: 255
        }
      }
    ],
    images: [],
    effects: [
      { name: "Off (Notification Cleared)", value: "0" },
      { name: "Solid", value: "1" },
      { name: "Fast Blink", value: "2" },
      { name: "Slow Blink", value: "3" },
      { name: "Pulse", value: "4" }
    ],
    scenes: [
      {
        buttons: "1 x Up",
        taps: "1",
        paddle_id: "up",
        id: "2",
        data: "7680",
        disabled: true
      },
      {
        buttons: "1 x Down",
        taps: "1",
        paddle_id: "down",
        id: "1",
        data: "7680",
        disabled: true
      },
      { buttons: "2 x Up", taps: "2", paddle_id: "up", id: "2", data: "7860" },
      {
        buttons: "2 x Down",
        taps: "2",
        paddle_id: "down",
        id: "1",
        data: "7860"
      },
      { buttons: "3 x Up", taps: "3", paddle_id: "up", id: "2", data: "7920" },
      {
        buttons: "3 x Down",
        taps: "3",
        paddle_id: "down",
        id: "1",
        data: "7920"
      },
      { buttons: "4 x Up", taps: "4", paddle_id: "up", id: "2", data: "7980" },
      {
        buttons: "4 x Down",
        taps: "4",
        paddle_id: "down",
        id: "1",
        data: "7980"
      },
      { buttons: "5 x Up", taps: "5", paddle_id: "up", id: "2", data: "8040" },
      {
        buttons: "5 x Down",
        taps: "5",
        paddle_id: "down",
        id: "1",
        data: "8040"
      },
      {
        buttons: "1 x Config",
        taps: "1",
        paddle_id: "config",
        id: "3",
        data: "7680"
      },
      { buttons: "Hold Up", taps: "0", paddle_id: "up", id: "2", data: "7800" },
      {
        buttons: "Release Up",
        taps: "-1",
        paddle_id: "up",
        id: "2",
        data: "7740",
        disabled: true
      },
      {
        buttons: "Hold Down",
        taps: "0",
        paddle_id: "down",
        id: "1",
        data: "7800",
        disabled: true
      },
      {
        buttons: "Release Down",
        taps: "-1",
        paddle_id: "down",
        id: "1",
        data: "7740",
        disabled: true
      }
    ]
  },
  {
    id: "fanlightcombo",
    displayName: "Fan\\Light Combo Dimmer",
    paddles: [
      {
        id: "light",
        pos: {
          top: "162px",
          left: "135px",
          width: "120px",
          height: "135px"
        }
      },
      {
        id: "fan",
        pos: {
          bottom: "162px",
          left: "135px",
          width: "120px",
          height: "135px"
        }
      },
      {
        id: "light_rocker_up",
        pos: {
          top: "182px",
          left: "115px",
          width: "14px",
          height: "47px"
        }
      },
      {
        id: "light_rocker_down",
        pos: {
          top: "229px",
          left: "115px",
          width: "14px",
          height: "47px"
        }
      },
      {
        id: "fan_rocker_up",
        pos: {
          top: "325px",
          left: "115px",
          width: "14px",
          height: "47px"
        }
      },
      {
        id: "fan_rocker_down",
        pos: {
          top: "372px",
          left: "115px",
          width: "14px",
          height: "47px"
        }
      }
    ],
    leds: [
      {
        id: "led-0",
        name: "Light LED",
        pos: {
          top: "162px",
          right: "129px",
          height: "134px"
        },
        parameters: {
          [CONFIG_PARAMETER.COLOR]: 18,
          [CONFIG_PARAMETER.BRIGHTNESS]: 19,
          [CONFIG_PARAMETER.LED_EFFECT]: 24
        },
        default: {
          effect: 0,
          level: 10,
          color: 170,
          duration: 255
        }
      },
      {
        id: "led-1",
        name: "Fan LED",
        pos: {
          bottom: "162px",
          right: "129px",
          height: "134px"
        },
        parameters: {
          [CONFIG_PARAMETER.COLOR]: 20,
          [CONFIG_PARAMETER.BRIGHTNESS]: 21,
          [CONFIG_PARAMETER.LED_EFFECT]: 25
        },
        default: {
          effect: 0,
          level: 10,
          color: 170,
          duration: 255
        }
      }
    ],
    images: [
      {
        id: "lzw36-paddles",
        src: lzw36,
        pos: {
          left: "114px",
          width: "165px",
          top: "149px"
        }
      }
    ],
    effects: [
      { name: "Solid", value: "0" },
      { name: "Slow Blink", value: "1" },
      { name: "Fast Blink", value: "2" },
      { name: "Chase", value: "3", style: { height: "150px" } },
      { name: "Pulse", value: "4" }
    ],
    scenes: [
      {
        buttons: "1 x Light",
        taps: "1",
        paddle_id: "light",
        id: "3",
        data: "-"
      },
      { buttons: "1 x Fan", taps: "1", paddle_id: "fan", id: "6", data: "-" },
      { buttons: "2 x Fan", taps: "2", paddle_id: "fan", id: "6", data: "-" },
      { buttons: "3 x Fan", taps: "3", paddle_id: "fan", id: "6", data: "-" },
      { buttons: "4 x Fan", taps: "4", paddle_id: "fan", id: "6", data: "-" },
      { buttons: "5 x Fan", taps: "5", paddle_id: "fan", id: "6", data: "-" },
      {
        buttons: "Fan Hold",
        taps: "-1",
        paddle_id: "fan",
        id: "6",
        data: "-",
        disabled: true
      },
      {
        buttons: "Fan Release",
        taps: "-1",
        paddle_id: "fan",
        id: "6",
        data: "-",
        disabled: true
      },
      {
        buttons: "1 x Light Rocker Up",
        taps: "1",
        paddle_id: "light_rocker_up",
        id: "1",
        data: "-"
      },
      {
        buttons: "2 x Light Rocker Up",
        taps: "2",
        paddle_id: "light_rocker_up",
        id: "1",
        data: "-"
      },
      {
        buttons: "3 x Light Rocker Up",
        taps: "3",
        paddle_id: "light_rocker_up",
        id: "1",
        data: "-"
      },
      {
        buttons: "4 x Light Rocker Up",
        taps: "4",
        paddle_id: "light_rocker_up",
        id: "1",
        data: "-"
      },
      {
        buttons: "5 x Light Rocker Up",
        taps: "5",
        paddle_id: "light_rocker_up",
        id: "1",
        data: "-"
      },
      {
        buttons: "Light Rocker Up Hold",
        taps: "-1",
        paddle_id: "light_rocker_up",
        id: "1",
        data: "-",
        disabled: true
      },
      {
        buttons: "Light Rocker Up Release",
        taps: "-1",
        paddle_id: "light_rocker_up",
        id: "1",
        data: "-",
        disabled: true
      },
      {
        buttons: "1 x Light Rocker Down",
        taps: "1",
        paddle_id: "light_rocker_down",
        id: "2",
        data: "-"
      },
      {
        buttons: "2 x Light Rocker Down",
        taps: "2",
        paddle_id: "light_rocker_down",
        id: "2",
        data: "-"
      },
      {
        buttons: "3 x Light Rocker Down",
        taps: "3",
        paddle_id: "light_rocker_down",
        id: "2",
        data: "-"
      },
      {
        buttons: "4 x Light Rocker Down",
        taps: "4",
        paddle_id: "light_rocker_down",
        id: "2",
        data: "-"
      },
      {
        buttons: "5 x Light Rocker Down",
        taps: "5",
        paddle_id: "light_rocker_down",
        id: "2",
        data: "-"
      },
      {
        buttons: "Light Rocker Down Hold",
        taps: "-1",
        paddle_id: "light_rocker_down",
        id: "2",
        data: "-",
        disabled: true
      },
      {
        buttons: "Light Rocker Down Release",
        taps: "-1",
        paddle_id: "light_rocker_down",
        id: "2",
        data: "-",
        disabled: true
      },
      {
        buttons: "1 x Fan Rocker Up",
        taps: "1",
        paddle_id: "fan_rocker_up",
        id: "1",
        data: "-"
      },
      {
        buttons: "2 x Fan Rocker Up",
        taps: "2",
        paddle_id: "fan_rocker_up",
        id: "1",
        data: "-"
      },
      {
        buttons: "3 x Fan Rocker Up",
        taps: "3",
        paddle_id: "fan_rocker_up",
        id: "1",
        data: "-"
      },
      {
        buttons: "4 x Fan Rocker Up",
        taps: "4",
        paddle_id: "fan_rocker_up",
        id: "1",
        data: "-"
      },
      {
        buttons: "5 x Fan Rocker Up",
        taps: "5",
        paddle_id: "fan_rocker_up",
        id: "1",
        data: "-"
      },
      {
        buttons: "Fan Rocker Up Hold",
        taps: "-1",
        paddle_id: "fan_rocker_up",
        id: "1",
        data: "-",
        disabled: true
      },
      {
        buttons: "Fan Rocker Up Release",
        taps: "-1",
        paddle_id: "fan_rocker_up",
        id: "1",
        data: "-",
        disabled: true
      },
      {
        buttons: "1 x Fan Rocker Down",
        taps: "1",
        paddle_id: "fan_rocker_down",
        id: "2",
        data: "-"
      }
    ]
  }
];
