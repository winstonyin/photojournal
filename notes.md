## TODO
* Add validation of config file, i.e. contents has to match actual contents
* Add detection of content change
* Move content out of public/ (needs to modify pathToURL, etc)
* i18n
** Preserve language choice using cookie
** For posts, I think it should not be on the level of individual posts, but give config option to link each language version to the default language version
** 3 or more languages?

site-config.json
* Configuration for the whole site
* Paths must start with . at the site root, with no trailing /

Compile TS scripts into JS before executing
npx tsc --resolveJsonModule --esModuleInterop scripts/prebuild.ts; npm run prebuild