# generative-art

generative art created with [processing](https://processing.org/) via [p5.js](https://p5js.org/).

you can view the art on [GitHub pages](https://maxphilips.github.io/generative-art/).

## art/

contains subdirectories that contain art

### Subdirectory inside art/

contains an artwork

* rendered `images`
* `index.html` acting as a generation client
  * Right arrow: regenerate artwork
  * S: save artwork
  * individual clients may add extra controls
* `{artwork}.js` containing the implementation of the artwork

## lib/

contains reusable code to make art with

## scripts/

contains scripts

### new_art.rb

creates a new artwork. set an optional title with -t or receive an artwork named TEMP.

    ruby scripts/new_art.rb -t title_of_work

### name_art.rb

rename the artwork named TEMP to its true title.

    ruby scripts/name_art.rb -t title_of_work
