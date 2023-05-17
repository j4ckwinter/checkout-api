import express from "express";
import { ItemRouter } from "./route";

export class Router {
  readonly router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.use("/items", new ItemRouter().router);
  }
}
