# Thomas and the wolf

Small repository implementing the rules for the game "Thomas and the wolf" and a small api exposing the endpoints necessary to play it interactively.

## Rules

You are provided with a grid that Thomas needs to escape without the wolf eating him. This is a turn-based puzzle; Thomas takes a turn, then the wolf takes a turn, and so on. You control Thomas' movement; the wolf's movements are automatic (see below sub-points for wolf rules).

- The grid contains walls - neither Thomas, nor the wolf can pass through walls
- Thomas can move one space or can chose not to move for his turn
- The wolf can move up to two spaces towards Thomas
  - If the wolf and Thomas are on the same row, the wolf will only try to move horizontally towards Thomas
  - If the wolf and Thomas are on the same column, the wolf will only try to move vertically towards Thomas
  - If the wolf and Thomas are on different rows and columns, the wolf will move in whichever direction isn't blocked and moves it closer to Thomas (the wolf will favour vertical over horizontal if exactly diagonal)
  - If the wolf cannot move in any direction towards Thomas (e.g. due to walls), it will forfeit its turn and remain stationary
- Neither Thomas, nor the wolf can move diagonally - they can only move up, down, left and right
- The game is won if Thomas escapes the grid
- The game is lost if the wolf reaches Thomas during its turn

## Booting instructions

The repository has been developed with node v14.5.0 and npm v6.14.5; it should also work with other reasonably updated versions, but it has not been tested. The package.json offers the following convenience scripts:

- **start**: to execute a built version of the repository
- **dev**: for development, it starts nodemon on the source files directly
- **build**: compiles with babel the ECMAScript modules into CommonJS ones.
- **test**: to execute the repository's unit tests with jest
- **test:watch**: for development, it executes the tests in watch mode
- **lint**: runs eslint
- **format**: runs prettier

## API description

Once booted, the api starts by default on localhost:3000 and exposes 3 endpoints:

- `POST /game/load` which accepts a config and returns an initialized game state. An example game config can be found at [sample-config.json](/sample-config.json).
- `POST /game/move` which accepts an object with the shape of `{ player, move, puzzle, }` and returns the game state updated with the move provided. The correct values of each property are:
  - _player_: `Thomas` and `Wolf`
  - _move_: `Up`, `Down`, `Left`, `Right`, `Stay`
  - _puzzle_: a game state returned by `/game/load` or `/game/move`
- `POST /game/moveWolf` which accepts a game state where is the turn of the wolf and returns the move of the wolf.

## Next steps

This repository, like any other piece of code, can be improved and expanded. Here is a list of ideas on how to do this, presented in no particular order:

- **Known bugs**:

  - Right no the walls only block when going from the inside to the outside. I.e. a cell surrounded by 4 "internal" walls will allows you to get in but not to come out.
  - When trying to follow Thomas over a gap in the layout, the wolf will try to move into empty space rather than staying as it does when blocked by walls

- **Redesign**: the current design is modular and uses relatively-small files, but there are many places where it can be improved. In particular, I believe the code would benefit from:

  - A place to centralize layout logic: right now it is spread across most of the code base which makes it hard to change and reuse (it is not a coincidence that the known bugs are layout ones).
  - POJOs and functional programming: right now the internal state is kept by a confusing mix of object and functional programming (exemplified by the presence of `getPuzzle()` all over the code base). The repository's semantics is likely to improve if game state is more strictly kept within POJOs and game logic is centralized into objects that modify those POJOs.

- **UI**: an UI that would consume the endpoints of the api and expose them in a visual way for easy of interacting.

- **Autoplay**: when it comes to pathfinding, A* is the first algorithm that comes to mind; but a plain A* will ignore the wolf and result very naive solution. This can be palliated by increasing the cost of traversing cells closer to the wolf, but to truly be effective said cost would also need to take into account the future position of the wolf.

- **Deployment**: to make it easily playable by a non-developer audience.
