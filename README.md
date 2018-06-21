# egg-mssql

<!--
Description here.
-->

## Install

```bash
$ npm i egg-mssql --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.mssql = {
  enable: true,
  package: "egg-mssql"
};
//in controller or service
const pool=await app.mssql;
const result=await pool.request().query('select 1 ');
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.mssql = {
  client: {
    user: "",
    password: "",
    server: "",
    database: "",
    port: ""
  }
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/jaikensai888/egg-mssql/issues).

## License

[MIT](LICENSE)
