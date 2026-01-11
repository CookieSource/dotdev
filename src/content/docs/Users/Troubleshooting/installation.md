---
title: Installation Issues
summary: Troubleshooting the AerynOS installation process
---

# Installation Issues

This article covers various issues that you may come across during installation of AerynOS.

## Can't install in EFI mode

The live ISO will attempt to install AerynOS by the same method it was booted. If it is unable to install the boot loader to the ESP, then it is likely booted in legacy mode. Ensure that the ISO has been created via a [supported method](/docs/user/quick-start/installation) and that an EFI boot is selected from the boot options.

You can check whether the AerynOS ISO has booted in EFI mode by checking the for the existence of `ls /sys/firmware/efi` (if it's not found, then it's booted in legacy mode).

## I can't boot into AerynOS after installation!

There are some misunderstandings with how legacy and EFI boot work (usually implemented as UEFI). These sections cover the common misconceptions.

### Legacy/BIOS installation

Legacy installations on AerynOS use the GRUB boot loader on an MBR disk. Only one boot loader can be used on an MBR disk, so if you haven't installed the AerynOS boot loader on the MBR, you will need to boot into the other OS and update GRUB prior to being able to boot AerynOS. This will also be required on each update of the kernel to ensure you're booting the latest release.

### EFI

EFI allows for multiple boot loaders to be installed, which means you can boot the AerynOS boot loader directly. To ensure you are booting AerynOS you need to boot `Linux Boot Manager` from the EFI options. Common keys for bringing up a boot menu or the options during boot are hitting `Esc/F2/F9/F10/F11/F12` during boot (this differs per motherboard). If a boot loader for another OS is not listed in the menu, then it is not correctly registered (and therefore not installed correctly). You can make the AerynOS boot menu appear via [Displaying the AerynOS boot menu on boot](/docs/user/quick-start/boot-management#display-the-boot-menu-by-default) which should be able to boot Windows (as it's registered with UEFI properly) as well as AerynOS, but not other systems.
