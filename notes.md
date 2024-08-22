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
* Mobile UI

site-config.json
* Configuration for the whole site
* Paths must start with . at the site root, with no trailing /

Compile TS scripts into JS before executing
npx tsc --resolveJsonModule --esModuleInterop scripts/prebuild.ts; npm run prebuild