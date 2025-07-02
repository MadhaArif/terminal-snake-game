#!/usr/bin/env python3
"""
Terminal Snake Game
A classic Snake game implemented in Python using the curses library.
Use arrow keys to control the snake and eat food to grow!
"""

import curses
import random
import time
from enum import Enum

class Direction(Enum):
    UP = (-1, 0)
    DOWN = (1, 0)
    LEFT = (0, -1)
    RIGHT = (0, 1)

class SnakeGame:
    def __init__(self, stdscr):
        self.stdscr = stdscr
        self.height, self.width = stdscr.getmaxyx()
        
        # Game boundaries (leave space for borders and score)
        self.game_height = self.height - 4
        self.game_width = self.width - 2
        
        # Initialize game state
        self.reset_game()
        
        # Configure curses
        curses.curs_set(0)  # Hide cursor
        stdscr.nodelay(True)  # Non-blocking input
        stdscr.timeout(150)  # Game speed (milliseconds)
        
        # Initialize colors if supported
        if curses.has_colors():
            curses.start_color()
            curses.init_pair(1, curses.COLOR_GREEN, curses.COLOR_BLACK)  # Snake
            curses.init_pair(2, curses.COLOR_RED, curses.COLOR_BLACK)    # Food
            curses.init_pair(3, curses.COLOR_YELLOW, curses.COLOR_BLACK) # Score
            curses.init_pair(4, curses.COLOR_WHITE, curses.COLOR_BLACK)  # Border
    
    def reset_game(self):
        """Reset the game to initial state"""
        # Snake starts in the middle
        start_y = self.game_height // 2
        start_x = self.game_width // 2
        
        self.snake = [(start_y, start_x), (start_y, start_x - 1), (start_y, start_x - 2)]
        self.direction = Direction.RIGHT
        self.score = 0
        self.game_over = False
        self.paused = False
        
        # Place first food
        self.place_food()
    
    def place_food(self):
        """Place food at a random location not occupied by snake"""
        while True:
            food_y = random.randint(1, self.game_height - 1)
            food_x = random.randint(1, self.game_width - 1)
            
            if (food_y, food_x) not in self.snake:
                self.food = (food_y, food_x)
                break
    
    def draw_border(self):
        """Draw the game border"""
        # Top and bottom borders
        for x in range(self.game_width + 1):
            self.stdscr.addch(0, x, '═', curses.color_pair(4))
            self.stdscr.addch(self.game_height + 1, x, '═', curses.color_pair(4))
        
        # Left and right borders
        for y in range(self.game_height + 2):
            self.stdscr.addch(y, 0, '║', curses.color_pair(4))
            self.stdscr.addch(y, self.game_width + 1, '║', curses.color_pair(4))
        
        # Corners
        self.stdscr.addch(0, 0, '╔', curses.color_pair(4))
        self.stdscr.addch(0, self.game_width + 1, '╗', curses.color_pair(4))
        self.stdscr.addch(self.game_height + 1, 0, '╚', curses.color_pair(4))
        self.stdscr.addch(self.game_height + 1, self.game_width + 1, '╝', curses.color_pair(4))
    
    def draw_snake(self):
        """Draw the snake on the screen"""
        for i, (y, x) in enumerate(self.snake):
            if i == 0:  # Head
                self.stdscr.addch(y, x, '█', curses.color_pair(1) | curses.A_BOLD)
            else:  # Body
                self.stdscr.addch(y, x, '▓', curses.color_pair(1))
    
    def draw_food(self):
        """Draw the food on the screen"""
        y, x = self.food
        self.stdscr.addch(y, x, '●', curses.color_pair(2) | curses.A_BOLD)
    
    def draw_score(self):
        """Draw the score and game info"""
        score_text = f"Score: {self.score}"
        self.stdscr.addstr(self.game_height + 2, 2, score_text, curses.color_pair(3))
        
        # Instructions
        instructions = "Arrow keys: Move | 'p': Pause | 'q': Quit | 'r': Restart"
        if len(instructions) < self.width - 2:
            self.stdscr.addstr(self.game_height + 3, 2, instructions)
    
    def draw_pause_screen(self):
        """Draw pause screen overlay"""
        pause_text = "PAUSED - Press 'p' to continue"
        text_y = self.game_height // 2
        text_x = (self.game_width - len(pause_text)) // 2
        
        # Draw pause text with background
        for i, char in enumerate(pause_text):
            self.stdscr.addch(text_y, text_x + i, char, 
                            curses.color_pair(3) | curses.A_REVERSE | curses.A_BOLD)
    
    def draw_game_over_screen(self):
        """Draw game over screen"""
        game_over_text = f"GAME OVER! Final Score: {self.score}"
        restart_text = "Press 'r' to restart or 'q' to quit"
        
        text_y = self.game_height // 2
        game_over_x = (self.game_width - len(game_over_text)) // 2
        restart_x = (self.game_width - len(restart_text)) // 2
        
        # Draw game over text
        for i, char in enumerate(game_over_text):
            self.stdscr.addch(text_y, game_over_x + i, char, 
                            curses.color_pair(2) | curses.A_REVERSE | curses.A_BOLD)
        
        for i, char in enumerate(restart_text):
            self.stdscr.addch(text_y + 2, restart_x + i, char, 
                            curses.color_pair(3) | curses.A_BOLD)
    
    def handle_input(self):
        """Handle user input"""
        try:
            key = self.stdscr.getch()
        except:
            return True
        
        if key == ord('q'):
            return False
        elif key == ord('p'):
            self.paused = not self.paused
        elif key == ord('r'):
            self.reset_game()
        elif not self.paused and not self.game_over:
            # Arrow key controls
            if key == curses.KEY_UP and self.direction != Direction.DOWN:
                self.direction = Direction.UP
            elif key == curses.KEY_DOWN and self.direction != Direction.UP:
                self.direction = Direction.DOWN
            elif key == curses.KEY_LEFT and self.direction != Direction.RIGHT:
                self.direction = Direction.LEFT
            elif key == curses.KEY_RIGHT and self.direction != Direction.LEFT:
                self.direction = Direction.RIGHT
        
        return True
    
    def move_snake(self):
        """Move the snake in the current direction"""
        if self.paused or self.game_over:
            return
        
        # Get current head position
        head_y, head_x = self.snake[0]
        
        # Calculate new head position
        dy, dx = self.direction.value
        new_head = (head_y + dy, head_x + dx)
        
        # Check for collisions
        if self.check_collision(new_head):
            self.game_over = True
            return
        
        # Add new head
        self.snake.insert(0, new_head)
        
        # Check if food was eaten
        if new_head == self.food:
            self.score += 10
            self.place_food()
        else:
            # Remove tail if no food eaten
            self.snake.pop()
    
    def check_collision(self, position):
        """Check if position collides with walls or snake body"""
        y, x = position
        
        # Wall collision
        if y <= 0 or y >= self.game_height + 1 or x <= 0 or x >= self.game_width + 1:
            return True
        
        # Self collision
        if position in self.snake:
            return True
        
        return False
    
    def render(self):
        """Render the entire game screen"""
        self.stdscr.clear()
        
        self.draw_border()
        self.draw_snake()
        self.draw_food()
        self.draw_score()
        
        if self.paused:
            self.draw_pause_screen()
        elif self.game_over:
            self.draw_game_over_screen()
        
        self.stdscr.refresh()
    
    def run(self):
        """Main game loop"""
        while True:
            # Handle input
            if not self.handle_input():
                break
            
            # Move snake
            self.move_snake()
            
            # Render game
            self.render()
            
            # Small delay for smooth gameplay
            time.sleep(0.01)

def main(stdscr):
    """Main function to initialize and run the game"""
    # Check minimum terminal size
    height, width = stdscr.getmaxyx()
    if height < 10 or width < 40:
        stdscr.addstr(0, 0, "Terminal too small! Need at least 40x10 characters.")
        stdscr.addstr(1, 0, "Press any key to exit...")
        stdscr.getch()
        return
    
    # Initialize and run game
    game = SnakeGame(stdscr)
    game.render()  # Initial render
    
    # Show welcome message
    welcome_text = "Welcome to Snake! Press any key to start..."
    welcome_y = game.game_height // 2
    welcome_x = (game.game_width - len(welcome_text)) // 2
    
    for i, char in enumerate(welcome_text):
        stdscr.addch(welcome_y, welcome_x + i, char, 
                    curses.color_pair(3) | curses.A_BOLD)
    
    stdscr.refresh()
    stdscr.getch()  # Wait for keypress
    
    # Start the game
    game.run()

if __name__ == "__main__":
    try:
        curses.wrapper(main)
    except KeyboardInterrupt:
        print("\nGame interrupted. Thanks for playing!")
    except Exception as e:
        print(f"An error occurred: {e}")
        print("Make sure your terminal supports color and is large enough (at least 40x10 characters).")
