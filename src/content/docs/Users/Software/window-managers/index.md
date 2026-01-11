---
title: Window managers
summary: Quick guides on installing additional window managers on AerynOS
---

## Tiling window managers

Tiling window managers automatically arrange open application windows on your computer screen without any overlap.

### i3

Install i3 on AerynOS by running the following command:

```bash
# If you use AerynOS plasma, don't run this command
sudo moss install i3
```

:::tip

If you use AerynOS GNOME, you can use i3 with support for other GNOME functionality by selecting GNOME+i3 in the login screen.

:::

### Sway

Sway is a Wayland-only tiling window manager. To install Sway on AerynOS:

1. Run the following command:

   ```bash
   sudo moss install sway
   ```

2. Configure Sway. For more information, see the [Sway wiki](https://github.com/swaywm/sway/wiki).

### Hyprland

Hyprland is a Wayland-only tiling window manager. To install Hyprland on AerynOS:

1. Run the following command:

   ```bash
   sudo moss install -c desktop.hyprland
   ```

2. Configure Hyprland. For more information, see the [Hyprland wiki](https://wiki.hyprland.org/).

## Stacking window manager

Stacking window managers allow windows to overlap like papers on a desk, giving you full control over their position and size.

### Labwc

Labwc is a Wayland-only stacking window manager. To install Labwc on AerynOS:

1. Run the following command:

   ```bash
   sudo moss install labwc
   ```

2. Configure Labwc. For more information, see the [Labwc wiki](https://labwc.github.io/).
