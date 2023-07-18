== Site map ==
* albums (`Albums`)
** if folder containing directories only: `FolderPage`
** if folder containing images only: `AlbumPage`
*** `...?photo=n` displays the modal for the n-th photo

== To-do ==
* Config in each folder (album name, cover photo, ordering, photo descriptions)
* Nested folders
* Posts rendered from markdown
* Lightbox navigation
* Metadata
* Image optimisation
* Loading animation
* Auto-generate config template in each folder
* i18n
* Mobile
* Advanced lightbox features (zooming, panning for panorama, transitions)

== Potential issues ==
* With `/albums/album_name?photo=4`, the same link will point to different photos when directory structure or ordering changes
* In posts or "virtual albums", what should the url of lightboxes be?
** `/posts/post_name?photo=3` or intercept `/albums/album_name?photo=4`? I think latter would be nice.