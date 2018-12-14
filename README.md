# simple-dummy-api-server
A basic gzip json data server to use with localhost development.

This hasn't been tested in multiple environments and was used for a single local project, but to set up, after cloning, run `npm install` to install and `npm start` to start.  Then make ajax requests in your application to the `/api/${filename}.json` endpoint and a gzipped static json file can be served to the front end.
