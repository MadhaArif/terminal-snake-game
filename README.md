# 🐍 Terminal Snake Game

A classic Snake game implemented in Python using the curses library for terminal-based gameplay.

## Features

- **Classic Gameplay**: Control the snake to eat food and grow longer
- **Colorful Graphics**: Beautiful Unicode characters with color support
- **Smooth Controls**: Responsive arrow key navigation
- **Game States**: Pause, restart, and game over functionality
- **Score Tracking**: Keep track of your high score
- **Terminal Adaptive**: Works with different terminal sizes

## Requirements

- Python 3.6 or higher
- Terminal with color support
- Minimum terminal size: 40x10 characters

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/terminal-snake-game.git
   cd terminal-snake-game
   ```

2. Run the game:
   ```bash
   python3 snake_game.py
   ```

## How to Play

### Controls
- **Arrow Keys**: Move the snake (↑ ↓ ← →)
- **'p'**: Pause/Resume game
- **'q'**: Quit game
- **'r'**: Restart game

### Objective
- Control the green snake (█ ▓) to eat the red food (●)
- Each food eaten increases your score by 10 points
- Avoid hitting walls or the snake's own body
- Try to achieve the highest score possible!

### Game Elements
- **█** - Snake head (green, bold)
- **▓** - Snake body (green)
- **●** - Food (red, bold)
- **╔═══╗** - Game border

## Screenshots

The game features a clean, bordered interface with:
- Real-time score display
- Pause screen overlay
- Game over screen with restart option
- Colorful, easy-to-see game elements

## Technical Details

- Built with Python's built-in `curses` library
- Object-oriented design with clean separation of concerns
- Smooth gameplay with configurable speed
- Cross-platform compatibility (Linux, macOS, Windows with proper terminal)

## Contributing

Feel free to fork this repository and submit pull requests for improvements!

## License

This project is open source and available under the MIT License.

---

**Enjoy the game! 🎮**
