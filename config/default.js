let path = require('path'),
    cache = require('koa-router-cache'),
    MemoryCache = cache.MemoryCache;

module.exports = {
  port: process.env.PORT || 3000,
  mongodb: {
    url: 'mongodb://127.0.0.1:27017/annual'
  },
  staticCacheConf: path.join(__dirname, '../view/publices'),
  renderConf: path.join(__dirname, '../view/config'),
  routerConf: 'routes',
  'GET /': {
    key: 'cache:index',
    expire: 10 * 1000,
    get: MemoryCache.get,
    set: MemoryCache.set,
    destroy: MemoryCache.destroy
  }
}
