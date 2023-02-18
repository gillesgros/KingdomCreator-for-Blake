fs = require("fs");
path = require('path');

Loader = require('./loader');

function transformName(name) {
  return name.toLowerCase().replace(/'/g, "");
}

function TestAndCreateDir(Path) {
  if (!fs.existsSync(Path)) fs.mkdirSync(Path);
}
// Read text file "UTF8" containing format
//sep=	
//PageName	id	en	nl	de	fr	es	pl
/*  Current PageName
  'languages',         'common',
  'page-boxes',        'page-index',
  'page-rules',        'page-sets',
  'sets',              '',
  'cards.baseset2',    'cards.baseset',
  'cards.intrigue2',   'cards.intrigue',
  'cards.seaside',     'cards.seaside2',
  'cards.alchemy',     'cards.prosperity',
  'cards.prosperity2', 'cards.cornucopia',
  'cards.hinterlands', 'cards.hinterlands2',
  'cards.promos',      'cards.darkages',
  'cards.guilds',      'cards.adventures',
  'cards.empires',     'cards.nocturne',
  'cards.renaissance', 'cards.menagerie',
  'cards.allies'     , 'cards.plunder',
*/

function usage() {
console.log("")
console.log("")
console.log("To run properly 'Build-translation-pages.js' you need to have a translation file")
console.log ("located and named './process/resources/pages.csv'.")
console.log("")
console.log("The format of this file is a comma separated value type file")
console.log("with the first line defining the separator character with the following syntax 'sep=(tab)'or 'sep=,'.")
console.log("the second line contains a line like 'PageName,en,fr,de,nl,es'.")
console.log("In this example the separator is the ',', but it can be (TAB).")
console.log("the list of language is not limited.")
console.log("")
console.log("The file contains all the following PageNames:")
console.log("")
console.log("  'languages',         'common',")
console.log("  'page-boxes',        'page-index',")
console.log("  'page-rules',        'page-sets',")
console.log("  'sets',               ")
console.log("  'cards.baseset2',    'cards.baseset',")
console.log("  'cards.intrigue2',   'cards.intrigue',")
console.log("  'cards.seaside',     'cards.seaside2',")
console.log("  'cards.alchemy',     'cards.prosperity',")
console.log("  'cards.prosperity2', 'cards.cornucopia',")
console.log("  'cards.hinterlands', 'cards.hinterlands2',")
console.log("  'cards.promos',      'cards.darkages',")
console.log("  'cards.guilds',      'cards.adventures',")
console.log("  'cards.empires',     'cards.nocturne',")
console.log("  'cards.renaissance', 'cards.menagerie',")
console.log("  'cards.allies'     , 'cards.plunder',")
console.log("")
console.log("The output are multiple files located at './src/i18n/messages/${lang}'")
console.log("depending on the languages found in the CSV file.")
console.log("One file for each PageName that do not start with 'cards'.")
console.log("")
console.log("At the location './src/i18n/messages/${lang}/cards',")
console.log("one file for each PageName that do start with 'cards' named 'cards.${lang}.${setname}.json'")
console.log("and 'cards.missing.json' file containing card name that miss a translation.")
console.log("")
console.log("For English language, the files are located at './src/i18n/messages'")
console.log("instead of './src/i18n/messages/${lang}' and the file 'sets.${lang}.json' is not generated.")
console.log("")
console.log("This translation generation is active.")
console.log("")
console.log("The CSV file is extract for an Excel spreadsheet named 'Pages.xlsx'.")
console.log("To add a language or add translation using this file might be easier")
console.log("")
console.log("")
}

usage()
const csv = fs.readFileSync("./process/resources/pages.csv", "utf8");
const lines = csv.replace(/"/g, "").split(/\r?\n/);
const names = {};
let separator=";"
let start_line=0
console.log(lines[start_line])
if (lines[start_line].includes("sep=")) {
  console.log("sep found")
  separator=(lines[start_line].split("="))[1];
  start_line+=1
} 
languages= lines[start_line].split(separator);

const pages=new Set ()

for (let i = start_line + 1; i < lines.length; i++) {
  const Line_splittted = lines[i].split(separator);
  names[Line_splittted[0]]={}
}
const resultPages = Object.keys(names);
console.log(resultPages)

TestAndCreateDir('./src');
TestAndCreateDir('./src/i18n');
TestAndCreateDir('./src/i18n/messages');



for (let i = 0; i < resultPages.length; i++) {
  const page = resultPages[i];
  if (page != "" ) {
    for (let n = 2; n < languages.length; n++) {
      if (languages[n] != "" ) names[languages[n]]={};
    }
    
    for (let i = 1; i < lines.length; i++) {
      const Line_splittted = lines[i].split(separator);
      if (Line_splittted[0] == page) {
//    names[Line_splittted[0]][Line_splittted[1]]=[]
        for (let j = 2 ; j < Line_splittted.length; j++) {
          if (Line_splittted[j] != '') names[languages[j]][Line_splittted[1]]= Line_splittted[j]
        }
      }
    }
    console.log(languages)
    const filenamesplitted=(resultPages[i]).split('.')
    for (let j= 2 ; j < languages.length; j++) {
      if (languages[j] != "" ) {
        lang=languages[j]
        if (lang=="en" && resultPages[i]=="sets") continue
        if (lang=="en") lang =""
        TestAndCreateDir(`./src/i18n/messages/${lang}`)
        if (filenamesplitted.length > 1 ) {
          if (filenamesplitted[0] == "cards") {
            TestAndCreateDir(`./src/i18n/messages/${lang}/cards`)
            filename = `./src/i18n/messages/${lang}/cards/${filenamesplitted[0]}.${languages[j]}.${filenamesplitted[1]}.json`
          } else filename = `./src/i18n/messages/${lang}/${filenamesplitted[0]}.${languages[j]}.${filenamesplitted[1]}.json`
        } else filename = `./src/i18n/messages/${lang}/${filenamesplitted[0]}.${languages[j]}.json`
        console.log(filename)
        fs.writeFileSync(filename, JSON.stringify(names[languages[j]], null, 2));
      }
    }
  }
}

usage()






