## TODO
* Add validation of config file, i.e. contents has to match actual contents

## UI structure
Sitewide:
* Main
  * Left vertical navbar
    * Logo
    * Albums
    * Posts
    * Language toggle
    * Day/night toggle
  * Content

Mainpage:
* Content
  * Rotating showcase
    * Individual photo square with info when hovered
    * ...

Albums:
* Content
  * Title (path)
  * Photo reel
    * Individual photo square
    * ...

Posts:
* Content
  * Banner
  * Title
  * Jump-to-text arrow
  * Main text
    * p
    * ...
    * Photo gallery
      * Individual photo square
      * ...
    * ...

Lightbox:
* Screen (darken/blur)
  * Close
  * Left arrow
  * Right arrow
  * Other controls
  * Photo
  * Description
    * Date/time
    * Location
    * Camera info
    * Linked from
    * Text description

site-config.json
* Configuration for the whole site
* Paths must start with . at the site root, with no trailing /

Compile TS scripts into JS before executing
npx tsc --resolveJsonModule --esModuleInterop scripts/prebuild.ts; npm run prebuild