'use strict';

let npm = run({
  sh: `yarn install`,
  watch: 'package.json',
})

let server = runServer({
  httpPort,
  name: 'express',
  sh: `node src/server.js ${httpPort}`,
  watch: 'src/server.js',
})

proxy(server, 8080).dependsOn(npm)
