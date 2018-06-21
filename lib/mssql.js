'use strict';
// todo:1.兼容多用户管理，2.兼容orm
const assert = require('assert');
const sql = require('mssql');
module.exports = app => {
  app.addSingleton('mssql', createOneClient);
};
async function createOneClient(config) {
  assert(config.server && config.user && config.password && config.server && config.database && config.port
    , `[egg-mssql] 'host: ${config.server}', 'port: ${config.port}', 'user: ${config.user}', 'database: ${config.database}' are required on config`);
  const pool = await sql.connect(config);
  return pool;
}
