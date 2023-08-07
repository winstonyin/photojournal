== Site map ==
* albums (`Albums`)
** if folder containing directories only: `FolderPage`
** if folder containing images only: `AlbumPage`
*** `...?photo=n` displays the modal for the n-th photo

== To-do ==
* ~~Generate config in each folder (album name, cover photo, ordering, photo descriptions)~~
* ~~Read config from each folder~~
* ~~Nested folders~~
* ~~Use optional catch-all under `/albums` with `params` to match url to entry in json, deciding if directory or album is displayed~~
* ~~Cover image, total content of parent sourced from children (prebuild)~~
* ~~Breadcrumb~~
* ~~Links and formatting in breadcrumb~~
* optimise sizing of featured photo in post
* Hidden albums
* Check if json is processed at build time or runtime
* ~~Posts rendered from markdown~~
* ~~Cover photo(s) of each post~~
* Lightbox navigation
* Metadata
* ~~Image optimisation (basic)~~
* Loading animation
* Auto-generate config template in each folder
* i18n
* Mobile
* Advanced lightbox features (zooming, panning for panorama, transitions)

== Potential issues ==
* With `/albums/album_name?photo=4`, the same link will point to different photos when directory structure or ordering changes
* In posts or "virtual albums", what should the url of lightboxes be?
** `/posts/post_name?photo=3` or intercept `/albums/album_name?photo=4`? I think latter would be nice.