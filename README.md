# Debug Demons: Tic Tac Toe Mobile Game

A Tic Tac Toe mobile game built with React Native and Expo.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo Go](https://expo.dev/client) app installed on your mobile device

## Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd tic-tac-toe
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npx expo start
```

## Running the App

1. Start the development server using the command above
2. Use your phone to scan the QR code displayed in the terminal
3. The app will open in Expo Go on your device

### Alternative Methods

- Press 'a' in the terminal to open on Android emulator
- Press 'i' to open in iOS simulator (macOS only)

## Project Structure

```
app/
├── components/           # Reusable UI components
│   ├── GameBoard.tsx    # Game board component
│   ├── ScoreBoard.tsx   # Score tracking component
│   └── themed/          # Themed UI components
├── screens/             # App screens
│   ├── game.tsx         # Main game screen
│   ├── game-over.tsx    # Game over screen
│   └── settings.tsx     # Settings screen
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
└── index.tsx           # App entry point
```

## Game Features

### Main Menu

- Choose your playing symbol (X or O)
- Start a new game
- Access settings

### Gameplay

- Tap empty cells to make your move
- Visual feedback for valid moves
- Turn indicator shows current player
- Score tracking for both players
- Reset game option
- Return to main menu

### Settings

- Toggle sound effects
- Toggle haptic feedback
- Persistent settings storage

## Development

### Built With

- React Native
- Expo
- AsyncStorage for data persistence
- Expo Haptics for tactile feedback
- Expo AV for sound effects

## License

This project is licensed under the MIT License - see the LICENSE file for details.
