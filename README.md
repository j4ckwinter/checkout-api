# Checkout API

This is a standalone application for a shopping cart checkout system. It supports different promotions and manages the inventory of items.

## Items

The system includes the following items:

| SKU    | Name           | Price     | Inventory Qty |
| ------ | -------------- | --------- | ------------- |
| 120P90 | Google Home    | $49.99    | 10            |
| 43N23P | MacBook Pro    | $5,399.99 | 5             |
| A304SD | Alexa Speaker  | $109.50   | 10            |
| 234234 | Raspberry Pi B | $30.00    | 2             |

## Promotions

The system implements the following promotions:

1. Each sale of a MacBook Pro comes with a free Raspberry Pi B.
2. Buy 3 Google Homes for the price of 2.
3. Buying more than 3 Alexa Speakers will have a 10% discount on all Alexa speakers.

## Usage

To use the shopping cart application, follow these steps:

1. Clone the repository to your local machine.
2. Build the docker image

```console
docker build -t checkout-api .
```

3. Run the docker container

```console
docker run -d -p 3001:3001 checkout-api
```

4. Access the application via the provided URL.

## API Endpoints

1. POST /api/items/checkout: Process the checkout and apply the promotions.

## Testing

The application includes api tests to ensure the correctness of the business logic and promotion calculations. You can run the tests using the following command:

```console
npm run test
```

## API Documentation

The API documentation can be found at the following location: http://localhost:3001/documentation/
