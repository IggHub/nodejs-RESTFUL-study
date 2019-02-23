# NodeJS RESTful study 

Includes:
- [@babel/core](https://www.npmjs.com/package/@babel/core) for babel compiler
- [@babel/node](https://babeljs.io/docs/en/babel-node) for running ES(whatever) on local dev
- [@babel/present-env](https://babeljs.io/docs/en/babel-preset-env) for latest JS
- [nodemon](https://nodemon.io/) for automatic reload
- [dotenv](https://www.npmjs.com/package/dotenv) for secrets
- [cors](https://www.npmjs.com/package/cors) to enable [cors](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

To start, `npm install`. Create new `.env` file in root path and put `PORT=3000` (or whatever port number). Run `npm run start`

## What's inside
Once app is run, practice hitting each API (ex: `curl localhost:3000/messages`). There are examples of curl commands in `index.js`.
