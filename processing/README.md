# processing

Generative art created via [processing](https://processing.org/), specifically [p5.js](https://p5js.org/).

## Individual directories

Contain artworks with:

* rendered `images`
* `index.html` acting as a rendering generation client
  * Right arrow: regenerate artwork
  * S: save artwork
* `{artwork}.js` containing the implementation of the artwork

## helpers.js

Contains globally useful Javascript. Pulled into each generation client.

## new_art.rb

Creates a new workspace for a new artwork. Accepts the title you want to set your directory to.

    ruby new_art.rb -t title-of-work

## update_download_directory.rb

Updates Google Chrome's Preferences JSON to change download directory. Doesn't work.
