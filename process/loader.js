const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

const tokenize = function(str) {
   return str.replace(/[\s'-\/]/g, '').toLowerCase();
};

const convertToCardId = function(setId, name) {
   return setId + '_' + tokenize(name);
};

const convertToEventId = function(setId, name) {
   return setId + '_event_' + tokenize(name);
};

const convertToLandmarkId = function(setId, name) {
   return setId + '_landmark_' + tokenize(name);
};

const convertToProjectId = function(setId, name) {
   return setId + '_project_' + tokenize(name);
};

const convertToBoonId = function(setId, name) {
   return setId + '_boon_' + tokenize(name);
};

const convertToWayId = function(setId, name) {
   return setId + '_way_' + tokenize(name);
};

const convertToAllyId = function(setId, name) {
   return setId + '_ally_' + tokenize(name);
};

const loadFilesFromDirectory = function(directory) {
   const values = {};
   const files = fs.readdirSync(directory);
   for (let i = 0; i < files.length; i++) {
	  if (files[i].includes("2-add")) continue
      const filename = path.join(directory, files[i]);
      const id = tokenize(path.basename(files[i], '.yaml'));
      /* js-yaml  v3 to v4
	  values[id] = yaml.safeLoad(fs.readFileSync(filename, 'utf8')); */
	  values[id] = yaml.load(fs.readFileSync(filename, 'utf8'));

   }
   return values;
};

const loadSets = function() {
   const sets = loadFilesFromDirectory(path.join(__dirname, '../sets'));

   // Add the id for each set.
   for (var setId in sets) {
      sets[setId].id = setId;
   }

   // Create an id for each card.
   for (var setId in sets) {
      var set = sets[setId];
      for (var i = 0; i < set.cards.length; i++) {
         var card = set.cards[i];
         card.id = convertToCardId(setId, card.name);
         card.shortId = tokenize(card.name);
         card.setId = setId;
         card.cardType="0 // supplies"
      }

      if (set.events) {
         for (var i = 0; i < set.events.length; i++) {
            var card = set.events[i];
            card.id = convertToEventId(setId, card.name);
            card.shortId = tokenize(card.name);
            card.setId = setId;
            card.cardType="1 // events"
         }
      }
      if (set.landmarks) {
         for (var i = 0; i < set.landmarks.length; i++) {
            var card = set.landmarks[i];
            card.id = convertToLandmarkId(setId, card.name);
            card.shortId = tokenize(card.name);
            card.setId = setId;
            card.cardType="2 // landmarks"
         }
      }
      if (set.projects) {
         for (var i = 0; i < set.projects.length; i++) {
            var card = set.projects[i];
            card.id = convertToProjectId(setId, card.name);
            card.shortId = tokenize(card.name);
            card.setId = setId;
            card.cardType="3 // projects"
         }
      }
      if (set.boons) {
         for (var i = 0; i < set.boons.length; i++) {
            var card = set.boons[i];
            card.id = convertToBoonId(setId, card.name);
            card.shortId = tokenize(card.name);
            card.setId = setId;
            card.cardType="4 // boons"
         }
      }
      if (set.ways) {
         for (var i = 0; i < set.ways.length; i++) {
            var card = set.ways[i];
            card.id = convertToWayId(setId, card.name);
            card.shortId = tokenize(card.name);
            card.setId = setId;
            card.cardType="5 // ways"
         }
      }
      if (set.allies) {
         for (var i = 0; i < set.allies.length; i++) {
            var card = set.allies[i];
            card.id = convertToAllyId(setId, card.name);
            card.shortId = tokenize(card.name);
            card.setId = setId;
            card.cardType="6 // allies"
         }
      }
      if (set.othercards) {
         for (var i = 0; i < set.othercards.length; i++) {
            var card = set.othercards[i];
            card.id = convertToCardId(setId, card.name);
            card.shortId = tokenize(card.name);
            card.setId = setId;
         }
      }
   }
   return sets;
};

const loadKingdoms = function() {
   const kingdoms = loadFilesFromDirectory(path.join(__dirname, '../kingdoms'));
   return kingdoms
};


module.exports = {
   tokenize: tokenize,
   convertToCardId: convertToCardId,
   convertToEventId: convertToEventId,
   convertToLandmarkId: convertToLandmarkId,
   convertToBoonId: convertToBoonId,
   convertToWayId: convertToWayId,
   convertToAllyId: convertToAllyId,
   loadSets: loadSets,
   loadKingdoms: loadKingdoms,
};