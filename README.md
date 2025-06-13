# Free Dictionary App

## Overview
This project is a technical test implementing a dictionary web application using the Free Dictionary API. The app allows users to search for word definitions, hear pronunciations, and manage their search history with a modern, responsive interface.

## Features
- Search for word definitions with real-time validation
- Listen to word pronunciations when available
- View detailed word information including definitions, examples, and parts of speech
- Toggle between light and dark themes
- Switch between different font styles (serif, sans serif, monospace)
- Responsive design for all device sizes
- Search history tracking with timestamps
- Interactive UI with proper hover and focus states

## Technology Stack
- Next.js
- React
- Redux for state management
- TailwindCSS for styling
- Jest for testing

## Getting Started

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm or yarn

### Installation
1. Clone the repository:
´bash
git clone https://github.com/yourusername/free-dictionary-app.git
cd free-dictionary-app
´

2. Install dependencies:
´bash
npm install
# or
yarn install
´

3. Start the development server:
´bash
npm run dev
# or
yarn dev
´

4. Open your browser and navigate to `http://localhost:3000` to see the application.

### Building for Production
´bash
npm run build
# or
yarn build
´

### Running Tests
´bash
npm test
# or
yarn test
´

## Feature Details

* Search for words using the input field
* View the Free Dictionary API response for the searched word
* See a form validation message when attempting to submit a blank form
* Play the audio file of a word when available
* Switch between serif, sans serif, and monospace fonts
* Toggle between light and dark themes
* View the optimal interface layout based on the device screen size
* See hover and focus states for all interactive elements on the page
* Implement a search history functionality that includes the date and time of each search

