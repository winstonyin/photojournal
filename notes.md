## TODO
* Add validation of config file, i.e. contents has to match actual contents
* Add detection of content change
* i18n
** For posts, fix language switcher flicker
** Formatted translation (date, n photos, etc.)
* Display number of subalbums
* Frontpage: newest albums and posts
* Light mode
* Pre-loading neighbouring images in modal
* Loading animation
* Hashing photo names
* Fix mobile post cover photo jitter
* Post gallery glob

site-config.json
* Configuration for the whole site
* Paths must start with . at the site root, with no trailing /

Compile TS scripts into JS before executing
npx tsc --resolveJsonModule --esModuleInterop scripts/[script].ts; npm run [script]

Whenever photos change, execute
npm run process
to generates thumbnails and remove orphaned thumbnails and empty directories

Before building the site, execute
npm run prebuild
to read the filesystem and generate json files containing site content

Build the site
npm run build