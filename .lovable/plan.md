
## Fix: Arrow Keys Scrolling the Page During Maze Game

**Problem**: When playing the maze game on desktop, pressing the Up/Down arrow keys causes the browser page to scroll in addition to moving the player character.

**Solution**: Add `e.preventDefault()` to the keyboard event handler in `MazeGame.tsx` so that arrow key presses are intercepted and don't trigger the browser's default scroll behavior.

---

### Technical Details

**File**: `src/components/games/MazeGame.tsx` (lines 74-85)

The `handleKeyDown` function currently processes arrow key inputs but doesn't call `e.preventDefault()`. Adding this call for all four arrow keys will stop the page from scrolling when the maze is active.

The fix is a single line addition -- `e.preventDefault()` at the top of the switch block when an arrow key is matched.
