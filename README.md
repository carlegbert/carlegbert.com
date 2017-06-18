### wwwterm-es6
##### Carl Egbert - egbertcarl@gmail.com

[wwwterm](https://github.com/carlegbert/wwwterm) rewritten in ES6. Transpiled to ES5 via babel/webpack.

[API documentation, generated by esdoc](https://carlegbert.github.io/wwwterm-es6)

#### building the project

* you will need webpack (`npm install -g webpack`)
* `npm install`
* to run the dev server: `npm dev` (page served at localhost:8080)
* for an optimized build: `npm build`

#### running tests

* start the dev server with `npm dev`
* `npm test`

#### building documentation page

* `npm run doc`
* docs will be in docs/

#### current working commands/features

* pwd
* whoami
* clear
* cd
* ls
* touch
* mkdir
* cat
* history navigation with up and down arrows
* echo
* redirect with >, >>
* tab autocompletion

### WIP:
* vi

#### TODO
* line wrapping for vi
* 'localstorage' dir
* refactor shell commands from Shell class into ShellCommand class?
* autocompletion with >, >>
* unit testing
* help
* pipe with |
* wire up to [wwwterm-api](https://github.com/carlegbert/wwwterm-api)
* results of ls are clickable & other user-friendliness
