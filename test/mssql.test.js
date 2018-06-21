"use strict";
/** TODO:
 * 1.Why can not debug in describe it seems that some time will hit the breakpoint
 * 2.no easy to user tran to commit
 */
const mock = require("egg-mock");
const assert = require("assert");
const sql = require("mssql");
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

  it("test simple insert", function*() {
    const pool = yield app.mssql;
    const result = yield pool.request().query("select 1");
    assert(result.recordset[0] == 1);
  });
});
