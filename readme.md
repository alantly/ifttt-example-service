# ifttt-example-service

Example service that integrates with the IFTTT protocol.

## Triggers
* Always Fire - Always fire a new event based on limit

## Actions
* Do Nothing - Does nothing

## Development
Running the typescript compiler and dist in watch mode proves hot reloading to the server.
* `yarn run build` - run tsc to build src into dist
* `yarn run bw` - watch for changes in src and run tsc on new changes
* `yarn run watch` - watch for changes in dist and restart the running node instance
* `yarn run clean` - remove the dist folder and node_modules
* `yarn start` - start the server using node.
