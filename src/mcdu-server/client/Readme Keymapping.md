# MCDU Keyboard mapping
This version of the MCDU has been modified to allow for direct keyboard input.
A particular use case is using a secondary machine to access the MCDU web interface (such as a Raspberri Pi) and provide inputs via a keyboard.

## Keymapping
The following lists the keyboard input and the corresponding mapping that is sent to the simulator.

All Alphanumeric inputs are send directly (i.e. pressing the "A" key will send the "A" key input directly to the sim.)

| Key | MCDU Input |
|---|---|
|Alphanumeric | Sent directly |

Non-Alphanumeric inputs require Alt and Ctrl to avoid conflict with many existing browser keybindings. For example, Alt-F4 would close the existing window and Ctrl-R would refresh the browser page, which is undesirable.

In the table below, for example, Ctrl-Alt-F1 would trigger the left line select key (L1).

| Key | MCDU Input |
|---|---|
|F1 | L1 |
|F2 | L2 |
| ...| ...|
|F7 | R1|
|F8 | R2|
|...|...|
|F12| R6|
|Q|DIR|
|W|PROG|
|E|PERF|
|...|...|
|A|F-PLN|
|S|RAD|
|...|...|
|H|MENU|
|Z|AIRPORT|

The follow keys can be enter with or without Alt+CTRL being pressed: Space, Backspace, Dot, Minus, Slash, Arrow keys

See src/mcdu-server/client/src/MapKey.jsx for full listing.
