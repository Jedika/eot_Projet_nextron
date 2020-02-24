import React from "react";

const config = {
  // Display reference cube, useful for orienting the field
  showCube: false,
  // '2D' or '3D' particle field
  dimension: "3D",
  // 'bounce' or 'passthru'
  // 'bounce' will make particles behave like balls thrown at a wall when hitting canvas boundaries
  // 'passthru' particles will disappear after hitting canvas boundaries and be added back into the scene elsewhere
  boundaryType: "passthru",
  // Maximum velocity of particles
  velocity: 0.1,
  // Toggles antialiasing -- must be set during construction, cannot be changed after initial render
  // Slight performance optimization to set false, although lines will appear more jagged
  antialias: false,
  // Min/Max multipliers which constraint how particles move in each direction
  // The default values here allow for particles to move in completely random x, y, z directions
  // See the "Snowfall" preset for an example of how to use these values
  direction: {
    xMin: -2,
    xMax: 1,
    yMin: -1,
    yMax: 2,
    zMin: -1,
    zMax: 2
  },
  lines: {
    // 'rainbow' or 'solid' color of lines
    colorMode: "rainbow",
    // Color of lines if colorMode: 'solid', must be hex color
    color: "#d6a104",
    // Transparency of lines
    transparency: 0.9,
    // true/false limit the maximum number of line connections per particle
    limitConnections: true,
    maxConnections: 20,
    // Minimum distance needed to draw line between to particles
    minDistance: 150,
    // true/false render lines
    visible: false
  },
  particles: {
    // 'rainbow' or 'solid' color of particles
    colorMode: "rainbow",
    // Color of lines if colorMode: 'solid', must be hex color
    color: "#3FB568",
    // Transparency of particles
    transparency: 0.9,
    // 'square' or 'circle' shape of particles
    shape: "square",
    // The exact number of particles to render
    count: 30,
    // The minimum particle size
    minSize: 50,
    // The maximum particle size
    maxSize: 300,
    // true/false render particles
    visible: true
  },
  /*
   * The camera rig is comprised of Three.js OrbitControls
   * Pass any valid OrbitControls properties, consult docs for more info
   *
   * https://threejs.org/docs/#examples/controls/OrbitControls
   */
  cameraControls: {
    // Enable or disable all camera interaction (click, drag, touch etc)
    enabled: false,
    // Enable or disable smooth dampening of camera movement
    enableDamping: true,
    dampingFactor: 0.1,
    // Enable or disable zooming in/out of camera
    enableZoom: false,
    // Enable or disable constant rotation of camera around scene
    autoRotate: false,
    // Rotation speed -- higher is faster
    autoRotateSpeed: 0.1,
    // If true, camera position will be reset whenever any option changes (including this one)
    // Useful when turning off autoRotate, the camera will return to FOV where scene fits to canvas
    resetCameraFlag: false
  }
};

const animConfig = () => {
  return config;
};

export default config;
