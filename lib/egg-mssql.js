'use strict';
// todo:1.兼容多用户管理，2.兼容orm
const assert = require('assert');
const sql = require('mssql');
const sqlTranslator = require('./sqlTranslator');
sql.Request.prototype.asyncQuery = function (sql, params, orderParams) {
  return this.query(sqlTranslator.execute(sql, params, orderParams));
}
sql.Request.prototype.asyncInsert = function (sql, params, orderParams) {
  return this.batch(sqlTranslator.insert(sql, params, option));
}
sql.Request.prototype.asyncBatch = function (sql, params, orderParams) {
  return this.batch(sqlTranslator.execute(sql, params, orderParams));
}
sql.Transaction.prototype.asyncBegin= function(isolationLevel, callback) {
  if (isolationLevel instanceof Function) {
    callback = isolationLevel
    isolationLevel = undefined
  }
  return new Promise((resolve, reject) => {
    this._begin(isolationLevel, async err => {
      if (err) return reject(err)
      this.emit('begin')
      debug('tran: begin ok')
      const result = await callback(err);
      resolve(result);
    })
  })
}

module.exports = app => {
  if (!app.mssql) {
    app.addSingleton('mssql', createClient);
  }
};
async function createClient(config, app) {
  assert(config.server && config.user && config.password && config.server && config.database && config.port, `[egg-mssql] 'host: ${config.server}', 'port: ${config.port}', 'user: ${config.user}', 'database: ${config.database}' are required on config`);
  const pool = new sql.ConnectionPool(config);
  const client = await pool.connect(config);
  pool.on('error', err => {
    app.coreLogger.error('mssqlpool', err);
  });
  sql.on('error', err => {
    app.coreLogger.error('mssqlglobal', err);
  })
  return client;
}