# generative-art

generative art created with [processing](https://processing.org/) via [p5.js](https://p5js.org/).

you can view the art on [GitHub pages](https://maxphilips.github.io/generative-art/).

## art/

Contains subdirectories that contain art

### Subdirectory inside art/

Contains an artwork

* rendered `images`
* `index.html` acting as a generation client
  * Right arrow: regenerate artwork
  * S: save artwork
  * individual clients may add extra controls
* `{artwork}.js` containing the implementation of the artwork

## lib/

Contains reusable code

### chaikin.js

Contains some line drawing algorithms

### color.js

Contains some palette generation algorithms

### helpers.js

Contains globally useful Javascript. Pulled into each generation client.

## scripts/

Contains scripts

### new_art.rb

Creates a new workspace for a new artwork. Accepts the title you want to set your directory to.

    ruby scripts/new_art.rb -t title-of-work
