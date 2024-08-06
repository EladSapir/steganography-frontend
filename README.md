
# Steganography Tool Frontend

This is the frontend application for the Steganography Tool, which allows users to encode and decode images with watermarks using LSB (Least Significant Bit) steganography.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User-friendly interface for encoding and decoding watermarks.
- Responsive design suitable for desktop and mobile devices.

## Requirements

- Node.js 14+
- npm or yarn

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/steganography-frontend.git
    cd steganography-frontend
    ```

2. **Install the dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

## Environment Variables

Create a `.env` file in the root directory and set the following variable:

```
REACT_APP_BACKEND_URL=http://127.0.0.1:5000
```

## Running the Application

To start the development server, run:

```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`.


## Usage

1. **Encode a Watermark:**

    - Go to the application.
    - Select "Hide Watermark in Image".
    - Upload an image and enter the watermark text.
    - Click "Hide Watermark".
    - Download the encoded image.

2. **Decode a Watermark:**

    - Go to the application.
    - Select "Extract Watermark from Image".
    - Upload the encoded image.
    - Click "Extract Watermark".
    - View the decoded watermark text.

## Contributing

Contributions are welcome! Please read the contributing guidelines first.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
