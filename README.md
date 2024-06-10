# portfolio-semester-2
# Portfolio

Welcome to my portfolio! This repository showcases my projects and skills developed during the second semester.

## Features

1. JSON loader system built from scratch, loads in projects easily, including images and links.
2. Projects and buttons loaded in and able to be dynamically updated.

## Set up

Clone the repo and open _index.html_ in your web browser of choice.

`git clone https://github.com/Bloxmine/portfolio-semester-2`

## What this project consists of
The JSON loader is the heart of my website. (W.I.P)

## Technologies used

- HTML
- CSS
- JS
- GSAP (GreenShock Animation Platform)
- Marked.js
- Three.js (inc. OrbitalControls)

## Location of important elements

` /projects/projects.js `
- This is where the darkmode code, JSON loader and GSAP are located for the projects pages.

` /src/index.js `
- This is where the code for Three.js is located. This compiles into main.js located in the 'dist' folder.

## Notes

The Three.js globe requires a somewhat modern GPU. It has been tested to work on integrated Intel graphics from at least **2012** onwards, but it has shown _not to work_ when trying to render on a 2009 nVidia GPU. But YMMV.

Otherwise the website should work in any modern browser, but has been tested in Chromium, Firefox and Safari. But most likely will work in any Blink, Gecko or Webkit based browser.