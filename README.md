# KingdomCreator-New 
# based on Dominion Randomizer (aka Kingdom Creator) from Blake

https://71yeti.fr is a kingdom randomizer, or card picker, for Dominion, based on 
https://www.dominionrandomizer.com is a kingdom randomizer, or card picker, for Dominion.

Feel free to make any improvements you see fit and send me a pull request!

## Development
This is a static site served through GitHub Pages. Check the `/docs` directory in `master` to see the source currently being served at https://71yeti.fr

# Install globally to execute .coffee files anywhere:
npm install --global coffeescript
# npm-check-updates upgrades your package.json dependencies to the latest versions, ignoring specified versions.
npm install -global npm-check-updates

### Commands

set PATH=%PATH%;"%cd%\..\..\# Portable App\node-v18.9.0-win-x64"
$env:Path = (($env:Path -split ';') + ((Get-Location).ToString()+"/../../# Portable App\node-v19-win-x64")) -join ';'

`npm start` - Run the development server with hot reloading at `localhost:8080`

`npm run build` - Builds the static site and outputs the assets in `/docs`

`npm run serve-static` - Serves the build assets from `/docs` in case you want to check the built version

### Docker Container

Dominion Randomizer can also be served from a Docker container with the
following commands:

```shell
# Build the site
$ npm run build

# Build the Docker image
$ sudo docker build --tag "kingdom_creator:latest" .

# Start a container from the built image. This will be published on local port
# 9999, but that can be changed as needed.
$ sudo docker run \
    --detach \
    --name="kingdom_creator" \
    --publish="9999:80" \
    --volume="$(pwd)/docs://usr/share/nginx/html:ro" \
    "kingdom_creator:latest"
```

### To add a new set

to get images from dominionstrategy.com

add type if needed. You will need to code a bit
run either from directory "./process" : 
`node download.js`
but you will need to create some directories
or run it from kingdom_creator root directory : 
`node process/download.js`
Images will be created for english version.

to build kingdom file related to an expansion use
`coffee kigndom.coffee`
with in file kingdom.coffee
string variable set with kingdom list 
strings = ["Introduction: Cartographer, Crossroads, Develop, Jack of all Trades, Margrave, Nomads, Oasis, Spice Merchant, Stables, Weaver"]

== Active ==
to generate new translation files in process directory 
Use `node Build-translation-pages.js`
The source is 1 file for all the expansions
patern is `./process/resources/pages.csv`
It will create for each language defined at line 2 of page.csv, files in 
`src\i18n\messages\${lang}` for dominionrandomizer pages and
a file per set in `src\i18n\messages\${lang}\cards` with card name translation for this set.



== Deprecated ==
to translate cards in process directory 
Use `node extract-card-names.js`
to create `src\i18n\messages\cards.${lang}.json` with card name translation
The source is 1 file for all the expansions
patern is `./process/resources/cards_translations.csv`

== Deprecated ==
to translate cards in process directory 
Use `node extract-card-names-concat.js`
to create `src\i18n\messages\cards.${lang}.json` with card name translation
The source is 1 file for each expansion
pattern is `./process/resources/cards_translations - ${expansion}.csv`

== Deprecated ==
to translate set name in process directory 
Use `node extract-set-names.js`
to create `src\i18n\messages\sets.{lang}.json` with card name translation
The source is 1 file for all the expansions
patern is `./process/resources/sets_name.csv`