//***************************************************************************
// BloggApp, all rights reserved, 2018-2020. Developed by Kirill Makeev.
//***************************************************************************
// Component: Memory Cache
// Type: Backend
//***************************************************************************

// Init
const rp = require('request-promise');
const mcache = require('memory-cache');

// Config
const system = require('../../../config');

// Methods
exports.cacheUrl = (duration) => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url;
    let cachedBody = mcache.get(key);

    if(cachedBody){
      res.send(cachedBody);
      return;
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body);
      }

      next();
    }
  }
}

module.exports = exports;
