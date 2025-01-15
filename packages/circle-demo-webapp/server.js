
import { createRequestHandler } from "@remix-run/node";
import { installGlobals } from "@remix-run/node";
import * as build from "./build/server/index.js";

installGlobals();

const handler = createRequestHandler(build, process.env.NODE_ENV);

const port = process.env.PORT || 3000;

const app = require('express')();
app.all('*', handler);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on 0.0.0.0:${port}`);
});
