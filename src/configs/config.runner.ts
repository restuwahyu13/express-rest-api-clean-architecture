import 'dotenv/config'
import shell from 'shelljs'

/**
 * @description script for compile and copy any file
 */
;(function () {
  // compile swagger doc openapi.yml into openapi.json
  shell.exec('rimraf openapi.json && swagger-cli bundle openapi.yml -o openapi.json -f')

  // compile ormconfig into js file
  shell.exec('rimraf ormconfig.js && bunchee src/configs/config.database.ts -o ./ormconfig.js -f umd --target node --no-sourcemap')

  // copy file html templates into dist directory
  shell.cp('-r', 'src/templates', 'dist/templates')

  // copy pm2 config into dist directory
  shell.cp('-r', 'pm2.config.js', 'dist')

  // copy openapi.json into dist directory
  shell.cp('-r', 'openapi.json', 'dist')
})()
