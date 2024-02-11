# spacemouse-osc

An Electron App to generate OSC(Open-Sound-Control) from 3Dconnexion spacemouse compact datas  \
based on [https://github.com/microdee/hid.spacemouse](https://github.com/microdee/hid.spacemouse) 

"W-I-P!" 

# Installation 
`yarn install`

# Launch
`yarn start`


# or simply download [releases](https://github.com/dewiweb/spacemouse-osc/releases)(.exe and .AppImage) 


![Screenshot](/src/assets/screenshot.png)

#  LINUX

To use spacemouse-osc on linux OS you'll have to add UDEV rules. Create a `/etc/udev/rules.d/90-3dconnexion.rules` file(as root) containing :

    # 3D Connexion vendor devices   
    KERNEL=="hidraw*", ATTRS{idVendor}=="256f", ATTRS{idProduct}=="c603", MODE="0666"   
    KERNEL=="hidraw*", ATTRS{idVendor}=="256f", ATTRS{idProduct}=="c605", MODE="0666"   
    KERNEL=="hidraw*", ATTRS{idVendor}=="256f", ATTRS{idProduct}=="c606", MODE="0666"   
    KERNEL=="hidraw*", ATTRS{idVendor}=="256f", ATTRS{idProduct}=="c621", MODE="0666"   
    KERNEL=="hidraw*", ATTRS{idVendor}=="256f", ATTRS{idProduct}=="c623", MODE="0666"   
    KERNEL=="hidraw*", ATTRS{idVendor}=="256f", ATTRS{idProduct}=="c625", MODE="0666"   
    KERNEL=="hidraw*", ATTRS{idVendor}=="256f", ATTRS{idProduct}=="c626", MODE="0666"   
    KERNEL=="hidraw*", ATTRS{idVendor}=="256f", ATTRS{idProduct}=="c627", MODE="0666"   
    KERNEL=="hidraw*", ATTRS{idVendor}=="256f", ATTRS{idProduct}=="c628", MODE="0666"   
    KERNEL=="hidraw*", ATTRS{idVendor}=="256f", ATTRS{idProduct}=="c629", MODE="0666"   
    KERNEL=="hidraw*", ATTRS{idVendor}=="256f", ATTRS{idProduct}=="c62b", MODE="0666"   
    KERNEL=="hidraw*", ATTRS{idVendor}=="256f", ATTRS{idProduct}=="c62e", MODE="0666"   
    KERNEL=="hidraw*", ATTRS{idVendor}=="256f", ATTRS{idProduct}=="c62f", MODE="0666"   
    KERNEL=="hidraw*", ATTRS{idVendor}=="256f", ATTRS{idProduct}=="c631", MODE="0666"   
    KERNEL=="hidraw*", ATTRS{idVendor}=="256f", ATTRS{idProduct}=="c632", MODE="0666"   
    KERNEL=="hidraw*", ATTRS{idVendor}=="256f", ATTRS{idProduct}=="c633", MODE="0666"   
    KERNEL=="hidraw*", ATTRS{idVendor}=="256f", ATTRS{idProduct}=="c635", MODE="0666"   
    KERNEL=="hidraw*", ATTRS{idVendor}=="256f", ATTRS{idProduct}=="c636", MODE="0666"   
    KERNEL=="hidraw*", ATTRS{idVendor}=="256f", ATTRS{idProduct}=="c640", MODE="0666"   
    KERNEL=="hidraw*", ATTRS{idVendor}=="256f", ATTRS{idProduct}=="c652", MODE="0666"   

Then launch(as root) : `udevadm control --reload-rules`

# Buttons (only tested with a Spacemouse Pro)
In default, startup configuration, no changes.
When [Index] is bybassed, button messages are sent aswell, index will not change while bypassed.
OSC MSG: /button/bttn_ATTR VALUE
Where ATTR is the Button pressed (refer to Button_Mapping.txt)
And VALUE is either 0 (false) or 1 (true).

Note: 
The Number buttons (1-4) seem to be only momentary sending messages, not aslong as they are pressed (Firmware?).
Due to setup, only 1-2 buttons should be pressed at the same time, Messages get sticky and you might encouter ghosting.