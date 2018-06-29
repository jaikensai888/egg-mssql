'use strict';
// todo:1.兼容多用户管理，2.兼容orm
const assert = require('assert');
const sql = require('jt-mssql');
module.exports = app => {
  if(!app.mssql){
    app.addSingleton('mssql', createClient);
  }
};
async function createClient(config) {
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