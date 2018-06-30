# egg-mssql

## Description

Mssql Plugin for Egg FrameWork



## version

ver1.0.2



## Install

```bash
$ npm i jt-egg-mssql --save
```



## Usage

### Configuration

```js
// {app_root}/config/plugin.js
exports.mssql = {
  enable: true,
  package: "egg-mssql"
};
//in controller or service
```

see [config/config.default.js](config/config.default.js) for more detail.

---

## Example

## Connection

<!-- example here -->

- Single Database

```js
// {app_root}/config/config.default.js
client: {
  server: 'host',
  port: 'port',
  user: 'user',
  password: 'password',
  database: 'database',
},
// {app_root}/service/user.js
const pool=await app.mssql;
const result=await pool.request().query('select 1 ');
```

- Multi Databases

```js
// {app_root}/config/config.default.js
clients: {
  db1: {
    server: 'host',
    port: 'port',
    user: 'user',
    password: 'password',
    database: 'database',
  },
  db2: {
    server: 'host',
    user: 'user',
    password: 'password',
    database: 'database',
  },
},
// {app_root}/service/user.js



describe("test/mssql.test.js", () => {
  it("singletonDb Test", async () => {
    const pool = await app.mssql.get('db1');
    const result = await pool.request().query("select 1 as a");
    assert(result.recordset[0].a == 1);
  });
  it("multipleDb  Test", async () => {
    const pool = await app.mssql.get('db1');
    const result = await pool.request().query("select 1 as a");
    assert(result.recordset[0].a == 1);
    const pool2 = await app.mssql.get('db1');
    const result2 = await pool2.request().query("select 2 as a");
    assert(result2.recordset[0].a == 2);
  });
  it("asyncQuery Test", async () => {
    const pool = await app.mssql.get('db1');
    const result = await pool.request().asyncQuery("select TemplateId from myTable2 where id=@id", {
      id: 1
    });
    assert(result.recordset[0].TemplateId == 1);
  });
  it("asyncInsert Test", async () => {
    const pool = await app.mssql.get('db1');
    const result = await pool.request().asyncInsert(`insert into myTable2 (TemplateId) values(@TemplateId) ; select SCOPE_IDENTITY() as id`, [{
      Templateid: 1
    }]);
    assert(result.recordset[0].id !== undefined);
  });

  it("asyn transaction test", async () => {
    const pool = await app.mssql.get('db1');
    const transaction = pool.transaction();
    await transaction.asyncBegin(async err => {
      try {
        const result = await transaction.request().asyncQuery(`insert into myTable2 (TemplateId) values(@TemplateId) ; select SCOPE_IDENTITY() as id`, {
          Templateid: 1
        });
        console.log(result.recordset[0].id);
        assert(result.recordset[0].id !== undefined);
        const result2 = await transaction.request().asyncQuery(`insert into myTable (TemplateName) values(@TemplateName) ; select SCOPE_IDENTITY() as id`, {
          TemplateName: "abc"
        });
        assert(result2.recordset[0].id !== undefined);
        transaction.commit()
      } catch (error) {
        console.log(error);
        transaction.rollback();
      }
    });
  })
});
```

---

## QueryExtension

- jt-mssql - Plugin Already Extension by [jt-mssql](https://github.com/jaikensai888/node-mssql) package

```js
it("asyn transaction test", async () => {
  const pool = await app.mssql.get("db1");
  const transaction = pool.transaction();
  await transaction.asyncBegin(async err => {
    try {
      const result = await transaction
        .request()
        .asyncQuery(
          `insert into myTable2 (TemplateId) values(@TemplateId) ; select SCOPE_IDENTITY() as id`,
          {
            Templateid: 1
          }
        );
      console.log(result.recordset[0].id);
      assert(result.recordset[0].id !== undefined);
      const result2 = await transaction
        .request()
        .asyncQuery(
          `insert into myTable (TemplateName) values(@TemplateName) ; select SCOPE_IDENTITY() as id`,
          {
            TemplateName: "abc"
          }
        );
      assert(result2.recordset[0].id !== undefined);
      transaction.commit();
    } catch (error) {
      console.log(error);
      transaction.rollback();
    }
  });
});
```

## Questions & Suggestions

Please open an issue [here](https://github.com/jaikensai888/egg-mssql/issues).

## License

[MIT](LICENSE)
