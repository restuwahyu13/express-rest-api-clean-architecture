(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('dotenv/config'), require('path')) :
    typeof define === 'function' && define.amd ? define(['dotenv/config', 'path'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global['express-rest-api'] = factory(null, global.path));
}(this, (function (config, path) {
    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var path__default = /*#__PURE__*/_interopDefaultLegacy(path);

    var pathEntitiesDir = !['production', 'staging'].includes(process.env.NODE_ENV) ? 'src/models/*.ts' : 'dist/models/*.js';
    var pathMigrationDir = !['production', 'staging'].includes(process.env.NODE_ENV) ? 'src/database/migrations' : 'dist/database/migrations';
    var entitiesDir = path__default['default'].resolve(process.cwd(), pathEntitiesDir);
    var migrationsDir = path__default['default'].resolve(process.cwd(), pathMigrationDir);
    var TypeormConfig = {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [entitiesDir],
        migrations: [migrationsDir],
        synchronize: !['production', 'staging'].includes(process.env.NODE_ENV) ? true : false,
        logger: !['production', 'staging'].includes(process.env.NODE_ENV) ? 'advanced-console' : undefined,
        logging: !['production', 'staging'].includes(process.env.NODE_ENV) ? true : false,
        cli: {
            entitiesDir: entitiesDir,
            migrationsDir: migrationsDir
        }
    };

    return TypeormConfig;

})));
