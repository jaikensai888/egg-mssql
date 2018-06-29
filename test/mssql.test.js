"use strict";

/** TODO:
 * 1.Why can not debug in describe it seems that some time will hit the breakpoint
 * 2.no easy to user tran to commit
 */
const {
  app,
  mock,
  assert
} = require('egg-mock/bootstrap');

describe("test/mssql.test.js", () => {
  it("singleton db connect test", async () => {
    const pool = await app.mssql.get('db1');
    const result = await pool.request().query("select 1 as a");
    assert(result.recordset[0].a == 1);
  });
  it("multiple db connect test", async () => {
    const pool = await app.mssql.get('db1');
    const result = await pool.request().query("select 1 as a");
    assert(result.recordset[0].a == 1);
    const pool2 = await app.mssql.get('db1');
    const result2 = await pool2.request().query("select 2 as a");
    assert(result2.recordset[0].a == 2);
  });
  it("transaction test", async () => {
    const pool = await app.mssql.get('db1');
    const transaction = pool.transaction();
    const b= await transaction.AsyncBegin(async err => {
      console.log("transaction begin",err);
      const result = await pool.request(transaction).query(`select 1 as a`);
      console.log(result.recordset[0].a);
      assert(result.recordset[0].a == 1);
      transaction.commit()
    });
  })
});