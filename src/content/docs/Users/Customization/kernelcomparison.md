---
title: Kernel Comparison
description: Compare the different kernels we offer
published: true
date: 2023-02-19T08:05:21.402Z
tags: customization, installation, kernels
editor: markdown
dateCreated: 2023-02-18T16:54:09.780Z
---

# Officially supported kernels

AerynOS officially supports the following kernels.

1.  Stable
2.  LTS
3.  Zen
4.  Hardened

Availability varies by repository. Use `moss search linux-` to see what is available in your current setup.

# Kernel comparisons 

Below we provide info on the supported and other popular 3rd party kernels. However it should be noted that the stable and LTS kernels are generally what we recommend to use.

As they are well tested and will generally work on most hardware.

## Stable

Vanilla Linux kernel and modules, with a few patches applied.

### How to install Stable

Stable should be installed by default.

```plaintext
sudo moss install linux-current
```

Afterwards be sure to boot from it during startup!

## LTS

Long-term support (LTS) Linux kernel and modules.

### How to install LTS

LTS can be installed with the command

```plaintext
sudo moss install linux-lts
```

Afterwards be sure to boot from it during startup!

## Zen Kernel

Result of a collaborative effort of kernel hackers to provide the best Linux kernel possible for everyday systems.

### How to install Zen

 Zen can be installed with the command

```plaintext
sudo moss install linux-zen
```

Afterwards be sure to boot from it during startup!

## Hardened kernel

A security-focused Linux kernel applying a set of hardening patches to mitigate kernel and userspace exploits. It also enables more upstream kernel hardening features than Linux.

### How to install Hardened kernel

Linux Hardened can be installed with the command

```plaintext
sudo moss install linux-hardened
```

Afterwards be sure to boot from it during startup!

## Clear

The Clear Linux kernel provides Patches from Intel's Clear Linux project which improves the performance and security of Intel CPUs in most cases.

### How to install Clear

The Clear kernel is not part of the default AerynOS repositories.
If you add a repository that provides it, install it with moss:

```plaintext
sudo moss install linux-clear
```

Afterwards be sure to boot from it during startup!

## TKG

A highly customizable kernel build system that provides a selection of patches and tweaks aiming for better desktop and gaming performance.

### How to install TKG

The TKG kernel is not part of the default AerynOS repositories.
If you add a repository that provides it, install it with moss:

```plaintext
sudo moss install linux-tkg
```

Afterwards be sure to boot from it during startup!

## Xanmod

Aiming to take full advantage in high-performance workstations, gaming desktops, media centers and others and built to provide a more rock-solid, responsive and smooth desktop experience.

### How to install Xanmod

The Xanmod kernel is not part of the default AerynOS repositories.
If you add a repository that provides it, install it with moss:

```plaintext
sudo moss install linux-xanmod
```

Afterwards be sure to boot from it during startup!

## Cacule

Cacule is a kernel that tries to enhance system performance, responsiveness and latency.

### How to install Cacule

The Cacule kernel is not part of the default AerynOS repositories.
If you add a repository that provides it, install it with moss:

```
sudo moss install linux-cacule
```

Afterwards be sure to boot from it during startup!

## Performance

Kernel performance varies by workload. The current kernel typically offers the best balance of
hardware enablement and responsiveness, while LTS favors long-term stability. Low-latency or
desktop-focused kernels (such as Zen, Xanmod, or Cacule) can improve interactivity for some
workloads but may trade off battery life or throughput. Benchmark your real workload before
switching and keep at least one known-good kernel installed for recovery.
