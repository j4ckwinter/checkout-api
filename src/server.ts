import express, { Express } from "express";
import { Router } from "./router";
import helmet from "helmet";
import swagger from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

const server: Express = express();
const router: express.Router = new Router().router;

// Json parsing
server.use(express.json());

// Security
server.use(helmet());

// Documentation
const swaggerDocument = YAML.load(
  path.resolve("./src/documentation/documentation.yaml")
);
server.use("/documentation", swagger.serve, swagger.setup(swaggerDocument));

// Routing
server.use("/api", router);

server.listen(3001, () => console.log("Listening on port 3001"));

export default server;
