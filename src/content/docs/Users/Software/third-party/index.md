---
title: Third Party
summary: Quick Installation guide for all of the Third Party applications AerynOS can help you install
---

# Third Party

The following applications are provided via our 3rd Party Repository to facilitate the installation and usage of them. These applications cannot be included in the primary repository due to licensing issues.

If these instructions fail to work please [file an issue](https://github.com/AerynOS/3rd-party/issues). To upgrade once installed simply run the commands again. If there is a new version it will be installed.

## Prerequisites

To run any of these commands, update your moss repository metadata first.

```bash
sudo moss repo update
```

## Browsers

### Google Chrome

```bash
sudo moss install google-chrome-stable
```

### Google Chrome (Beta)

```bash
sudo moss install google-chrome-beta
```

### Google Chrome (Dev/Unstable)

```bash
sudo moss install google-chrome-unstable
```

## Communication

### Franz

```bash
sudo moss install franz
```

### Slack

```bash
sudo moss install slack-desktop
```

### Viber

```bash
sudo moss install viber
```

## Multimedia

### Bitwig Studio

```bash
sudo moss install bitwig-studio
```

### Ocenaudio

```bash
sudo moss install ocenaudio
```

### Plex Media Server

```bash
sudo moss install plexmediaserver
sudo systemd-tmpfiles --create
sudo systemctl start plexmediaserver.service
```

**Note:** Optionally have it start on boot:

```bash
sudo systemctl enable plexmediaserver.service
```

### SunVox

```bash
sudo moss install sunvox
```

### Spotify

```bash
sudo moss install spotify
```

## Network

### AnyDesk

```bash
sudo moss install anydesk
```

### Insync

```bash
sudo moss install insync
```

### Spideroak

```bash
sudo moss install spideroak
```

### Synology Cloud Station Drive

```bash
sudo moss install synology-cloud-station-drive
```

### TeamViewer

```bash
sudo moss install teamviewer
sudo systemctl start teamviewerd.service
```

## Office

### Mendeley Desktop

```bash
sudo moss install mendeleydesktop
```

### Microsoft Core Fonts

```bash
sudo moss install mscorefonts
```

### Moneydance

```bash
sudo moss install moneydance
```

### PomoDoneApp

```bash
sudo moss install pomodoneapp
```

### Scrivener

```bash
sudo moss install scrivener
```

## Programming

### Android Studio

```bash
sudo moss install android-studio
```

### CLion

```bash
sudo moss install clion
```

### DataGrip

```bash
sudo moss install datagrip
```

### GitKraken

```bash
sudo moss install gitkraken
```

### IDEA

```bash
sudo moss install idea
```

### PhpStorm

```bash
sudo moss install phpstorm
```

### PyCharm

```bash
sudo moss install pycharm
```

### Rider

```bash
sudo moss install rider
```

### RubyMine

```bash
sudo moss install rubymine
```

### Sublime Text

```bash
sudo moss install sublime-text
```

### WebStorm

```bash
sudo moss install webstorm
```

## Security

### Enpass

```bash
sudo moss install enpass
```

## Other

### Google Earth

```bash
sudo moss install google-earth
```
