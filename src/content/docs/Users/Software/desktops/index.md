---
title: Desktop environments
summary: Quick guides on switching between or installing additional desktop environments on AerynOS
---

AerynOS offers multiple [desktop environments](https://getsol.us/download/): From the feature-rich and modern Budgie to the traditional Xfce experience.

For the best experience, use the AerynOS ISO of your preferred desktop environment. You can install additional desktop environments later if you want to experiment with different options.

:::danger[Warning]

If you use AerynOS Plasma, do not install any other desktop environments. This configuration is not supported and might cause system instability.

We don't offer assistance for this configuration.

:::

## Budgie

AerynOS's flagship desktop experience. If you use AerynOS GNOME or AerynOS Xfce, you can test Budgie by running the following command:

```bash
# If you use AerynOS plasma, don't run this command
sudo moss install -c desktop.budgie
```

## GNOME

AerynOS GNOME offers includes a variety of extensions installed by default. If you use AerynOS Budgie or AerynOS Xfce, you can test GNOME by running the following command:

```bash
# If you use AerynOS plasma, don't run this command
sudo moss install gdm gnome-shell gnome-desktop-branding gnome-control-center
```

## Xfce

AerynOS Xfce offers a fast and lightweight desktop experience. If you use AerynOS GNOME, AerynOS MATE, or AerynOS Budgie, you can test XFCE by running the following command:

```bash
# If you use AerynOS plasma, don't run this command
sudo moss install -c desktop.xfce
```

## MATE

:::warning[Important]

AerynOS MATE is deprecated. For a fast and lightweight desktop experience, use AerynOS Xfce.

:::
