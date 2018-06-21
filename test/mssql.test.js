"use strict";
/** TODO:
 * 1.Why can not debug in describe it seems that some time will hit the breakpoint
 * 2.no easy to user tran to commit
 */
const mock = require("egg-mock");
const assert = require("assert");

// const { app, mock, assert } = require('egg-mock/bootstrap');

describe("test/mssql.test.js", () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: "apps/mssql-test"
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it("test singlonDb", function* () {
    // const pool = yield app.mssql;
    // const result = yield pool.request().query("select 1 as a");
    // assert(result.recordset[0].a == 1);
  });
  it("test mutiDb", async function () {
    const pool = await app.mssql.get('db1');
    console.log(pool);
    const result = await pool.request().query("select 1 as a");
    assert(result.recordset[0].a == 1);
    // const pool2 = await app.mssql.db2;
    // const result2 = await pool.request().query("select 2 as a");
    // assert(result2.recordset[0].a == 2);

  });
});