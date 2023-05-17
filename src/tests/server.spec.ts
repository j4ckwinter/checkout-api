import request from "supertest";
import express, { Express } from "express";
import { Router } from "../router";
import { CheckoutFailure } from "../model/response/checkout-failure.model";
import { FailureDetails } from "../model/response/failure-details.model";
import { CheckoutSuccess } from "../model/response/checkout-success.model";
import { ResponseItem } from "../model/response/response-item.model";

describe("API Tests", () => {
  let server: Express;

  beforeAll(() => {
    server = express();
    server.use(express.json());
    server.use("/api", new Router().router);
  });

  it("should successfully checkout items", async () => {
    // Given
    const expectedItems: ResponseItem[] = [
      {
        sku: "A304SD",
        name: "Alexa Speaker",
        quantity: 1,
      },
    ];
    const expectedResponse: CheckoutSuccess = {
      success: true,
      cost: 109.5,
      items: expectedItems,
    };
    // When
    const response: request.Response = await request(server)
      .post("/api/items/checkout")
      .send([
        { sku: "A304SD", name: "Alexa Speaker", price: 109.5, quantity: 1 },
      ]);

    // Then
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponse);
  });

  it("should handle an incorrect sku at checkout", async () => {
    // Given
    const expectedDetails: FailureDetails[] = [
      {
        sku: "Invalid sku",
        message: "No item exists for the sku you have provided.",
        name: "Google Home",
        exisQuantity: 0,
        reqQuantity: 1,
      },
    ];
    const expectedResponse: CheckoutFailure = {
      details: expectedDetails,
      success: false,
    };

    // When
    const response: request.Response = await request(server)
      .post("/api/items/checkout")
      .send([
        { sku: "Invalid sku", name: "Google Home", price: 49.99, quantity: 1 },
      ]);

    // Then
    expect(response.status).toBe(400);
    expect(response.body).toEqual(expectedResponse);
  });

  it("should handle not enough stock at checkout", async () => {
    const expectedDetails: FailureDetails[] = [
      {
        sku: "120P90",
        message: "Not enough stock for the amount you have requested.",
        name: "Google Home",
        exisQuantity: 10,
        reqQuantity: 20,
      },
    ];
    const expectedResponse: CheckoutFailure = {
      details: expectedDetails,
      success: false,
    };

    // When
    const response: request.Response = await request(server)
      .post("/api/items/checkout")
      .send([
        { sku: "120P90", name: "Google Home", price: 49.99, quantity: 20 },
      ]);

    // Then
    expect(response.status).toBe(400);
    expect(response.body).toEqual(expectedResponse);
  });

  describe("Promotions", () => {
    it("should successfully apply free item promotion", async () => {
      // Given
      const expectedItems: ResponseItem[] = [
        {
          sku: "43N23P",
          name: "MacBook Pro",
          quantity: 2,
        },
        {
          sku: "234234",
          name: "RaspBerry Pi B",
          quantity: 2,
          note: "Buy one MacBook Pro, get one RaspBerry Pi B for free promotion applied!",
        },
      ];
      const expectedResponse: CheckoutSuccess = {
        success: true,
        cost: 10799.98,
        items: expectedItems,
      };
      // When
      const response: request.Response = await request(server)
        .post("/api/items/checkout")
        .send([
          { sku: "43N23P", name: "MacBook Pro", price: 5399.99, quantity: 2 },
        ]);

      // Then
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedResponse);
    });

    it("should successfully apply three for two promotion", async () => {
      // Given
      const expectedItems: ResponseItem[] = [
        {
          sku: "120P90",
          name: "Google Home",
          quantity: 6,
          note: "3 for 2 Promotion Applied!!",
        },
      ];
      const expectedResponse: CheckoutSuccess = {
        success: true,
        cost: 199.96,
        items: expectedItems,
      };
      // When
      const response: request.Response = await request(server)
        .post("/api/items/checkout")
        .send([
          { sku: "120P90", name: "Google Home", price: 49.99, quantity: 6 },
        ]);

      // Then
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedResponse);
    });

    it("should successfully apply ten percent off promotion", async () => {
      // Given
      const expectedItems: ResponseItem[] = [
        {
          sku: "A304SD",
          name: "Alexa Speaker",
          quantity: 3,
          note: "10% Off Promotion Applied!!",
        },
      ];
      const expectedResponse: CheckoutSuccess = {
        success: true,
        cost: 295.65,
        items: expectedItems,
      };
      // When
      const response: request.Response = await request(server)
        .post("/api/items/checkout")
        .send([
          { sku: "A304SD", name: "Alexa Speaker", price: 109.5, quantity: 3 },
        ]);

      // Then
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedResponse);
    });
  });
});
