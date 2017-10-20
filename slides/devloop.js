'use strict';

let reveal_css = run({
  name: 'reveal.js themes',
  sh: 'grunt css-themes',
  cwd: './reveal.js',
  watch: 'css/theme/source/valwin.scss'
});

let adoc = run({
  name: 'asciidoc',
  sh: 'asciidoctor -r asciidoctor-diagram -T ~/.local/share/asciidoctor/asciidoctor-reveal.js/templates/slim/ index.adoc',
  watch: ['*.adoc', '*.js']
});

let server = runServer({
  httpPort,
  sh: `lserver -p ${httpPort}`,
})

server.dependsOn(reveal_css, adoc)
proxy(server, 8080)
