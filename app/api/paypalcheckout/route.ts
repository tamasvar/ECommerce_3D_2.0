import paypal from '@paypal/checkout-server-sdk';
import { NextResponse } from 'next/server';

const clientId = "";
const clientSecret = "";
const NODE_ENV = 'production';
const environment = new paypal.core.LiveEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

export async function POST() {
    try {
        const request = new paypal.orders.OrdersCreateRequest();

        request.requestBody({
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "EUR",
                        value: "100.00",
                        breakdown: {
                            item_total: {
                                currency_code: "EUR",
                                value: "100.00",
                            },
                            shipping: {
                                currency_code: "EUR",
                                value: "0.00",
                            },
                            tax_total: {
                                currency_code: "EUR",
                                value: "0.00",
                            },
                            discount: {
                                currency_code: "EUR",
                                value: "0.00",
                            },
                            handling: {
                                currency_code: "EUR",
                                value: "0.00",
                            },
                            insurance: {
                                currency_code: "EUR",
                                value: "0.00",
                            },
                            shipping_discount: {
                                currency_code: "EUR",
                                value: "0.00",
                            },
                            // Add any other required properties here
                        }
                    },
                    items: [
                        {
                            name: "test",
                            description: "asd",
                            quantity: "1",
                            unit_amount: {
                                currency_code: "EUR",
                                value: "50.00",
                            },
                            category: "PHYSICAL_GOODS"
                        },
                        {
                            name: "test",
                            description: "asd",
                            quantity: "1",
                            unit_amount: {
                                currency_code: "EUR",
                                value: "50.00",
                            },
                            category: "PHYSICAL_GOODS"
                        }
                    ]
                }
            ]
        });

        const response = await client.execute(request);
        console.log(response);

        if (response.statusCode !== 201) {
            console.error('Error:', response.result);
            return { status: 500, body: 'Error creating PayPal order' };
        }

        return { status: 200, body: { id: response.result.id } };
    } catch (error: any) { // Explicitly cast error to 'any'
        console.error('Error:', error.message);
        return { status: 500, body: 'Internal Server Error' };
    }
}
