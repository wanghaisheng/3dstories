# 3D Stories

## Overview

3D Stories is a powerful tool designed to present 3D models of historic garments from the textile collection at the Germanisches Nationalmuseum Nuremberg. Developed in collaboration with the Urban Complexity Lab of Potsdam, this tool provides an interactive and immersive experience for exploring historic textiles.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Applications Used](#applications-used)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version X.X.X or higher)
- [npm](https://www.npmjs.com/) (version X.X.X or higher)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/3D-Stories.git
   cd 3D-Stories
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

### Running the Application

To start the application, run the following command:

```bash
npm start
```

This will launch the development server and open the application in your default web browser.

### Exploring the Models

1. **Load a Model**: Navigate to the 'Models' section and select a historic garment to load its 3D representation.
2. **Interact with the Model**: Use your mouse or touchpad to rotate, zoom, and pan the 3D model for a detailed examination.
3. **View Information**: Click on various parts of the garment to view detailed information about its history, materials, and craftsmanship.

## Features

- **Interactive 3D Visualization**: Rotate, zoom, and explore historic garments in 3D.
- **Detailed Annotations**: Clickable hotspots on garments provide in-depth information.
- **User-Friendly Interface**: Intuitive controls and navigation for an enhanced user experience.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Applications Used

- **React Vite**: For building a fast and modern web application.
- **React Three Fiber**: For rendering 3D graphics using Three.js in React.
- **Theatre JS**: For animation and interactive experiences.
- **Blender**: For converting 3D models to glb/gltf format.

### Preview glTF Models

You can preview your glTF models using the following tools:

- [glTF Report](https://gltf.report/)
- [glTF Viewer from React Three Fiber](https://gltf.pmnd.rs/)
- [Simple glTF Viewer](https://gltf-viewer.donmccurdy.com/)

## Contributing

We welcome contributions! If you would like to contribute to this project, please follow these steps:

- Fork the repository.
- Create a new branch (`git checkout -b feature/YourFeature`).
- Make your changes and commit them (`git commit -m 'Add some feature'`).
- Push to the branch (`git push origin feature/YourFeature`).
- Open a Pull Request.
