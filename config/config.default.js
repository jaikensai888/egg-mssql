"use strict";

/**
 * egg-mssql default config
 * @member Config#mssql
 * @property {String} SOME_KEY - some description
 */

// Single Database
// client: {
//   server: 'host',
//   port: 'port',
//   user: 'user',
//   password: 'password',
//   database: 'database',
// },

// Multi Databases
// clients: {
//   db1: {
//     server: 'host',
//     port: 'port',
//     user: 'user',
//     password: 'password',
//     database: 'database',
//   },
//   db2: {
//     server: 'host',
//     user: 'user',
//     password: 'password',
//     database: 'database',
//   },
// },
exports.mssql = {
    clients: {
        db1:{
            user: 'rep',
            password: 'SQL+Server',
            server: '59.39.71.105',
            database: 'CustomerServerSys_Import',
            port: 14433,
            connectionTimeout: 180000,
            requestTimeout: 180000,
        },
        db2:{
            user: 'rep',
            password: 'SQL+Server',
            server: '59.39.71.105',
            database: 'CustomerServerSys_Import',
            port: 14433,
            connectionTimeout: 180000,
            requestTimeout: 180000,
        }
    }
}