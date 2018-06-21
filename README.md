# egg-mssql

<!--
Description here.
-->

## Install

```bash
$ npm i jt-egg-mssql --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.mssql = {
  enable: true,
  package: "egg-mssql"
};
//in controller or service
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

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
"use strict";
const mssql = require("mssql");
const Service = require("egg").Service;
class UserService extends Service {
  async get() {
    // use db1
    const request = new mssql.Request(await this.app.mssql.get("db1"));
    const rows = await request.query(
      "SELECT name FROM sysobjects where xtype = 'U';"
    );

    // use db2
    const request1 = new mssql.Request(await this.app.mssql.get("db2"));
    const rows1 = await request1.query(
      "SELECT name FROM sysobjects where xtype = 'U';"
    );
    console.log(rows, rows1);

    return "6";
  }
}

module.exports = UserService;
```

## Questions & Suggestions

Please open an issue [here](https://github.com/jaikensai888/egg-mssql/issues).

## License

[MIT](LICENSE)
