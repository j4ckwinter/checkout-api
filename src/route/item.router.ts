import express, { Request, Response } from "express";
import { ItemController } from "../controller";
import { CheckoutFailureError } from "../error/checkout-failure-error";

export class ItemRouter {
  public readonly router: express.Router;
  private readonly itemController: ItemController;

  constructor() {
    this.router = express.Router();
    this.itemController = new ItemController();
    this.routes();
  }

  private routes(): void {
    this.router.get("/", (req: Request, res: Response): void => {
      try {
        res.status(200).send(this.itemController.getItems());
      } catch (e) {
        if (e instanceof Error) {
          res.status(500).send(e.message);
        }
      }
    });
    this.router.post("/checkout", (req: Request, res: Response): void => {
      try {
        res.status(200).send(this.itemController.checkout(req.body));
      } catch (e) {
        if (e instanceof CheckoutFailureError) {
          res.status(400).send(e.response);
        } else {
          res.status(500).send("Internal Server Error");
        }
      }
    });
  }
}
