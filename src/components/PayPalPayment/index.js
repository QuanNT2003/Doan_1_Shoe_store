import { PayPalButtons } from "@paypal/react-paypal-js";
import React from "react";
function PayPalPayMent({ data }) {
    // const createOrder = (data) => {
    //     // Order is created on the server and the order id is returned
    //     return fetch("http://localhost:3001/api/paypal/create-paypal-order", {
    //         method: "POST",
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         // use the "body" param to optionally pass additional order information
    //         // like product skus and quantities
    //         body: JSON.stringify({
    //             product: {
    //                 description: '123',
    //                 cost: '10.0'
    //             }
    //         }),
    //     })
    //         .then(function (res) {
    //             return res.json();
    //         }).then(function (res) {
    //             return res['orderId'];
    //         });
    // };
    const onApprove = (data) => {
        // Order is captured on the server and the response is returned to the browser
        return fetch("http://localhost:3001/api/paypal/capture-paypal-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderId: data.orderId
            })
        })
            .then((response) => response.json());
    };
    const createOrder = async (obj) => {
        try {
            const response = await fetch('http://localhost:3001/api/paypal/create-paypal-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    product: {
                        description: '123',
                        cost: obj.cost
                    }
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }
            return data.id;
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };
    return (
        <div>
            <PayPalButtons createOrder={
                (actions) => createOrder(data, actions)
            }
                onApprove={
                    (data, actions) => onApprove(data, actions)
                }
            />
        </div>
    );
}

export default PayPalPayMent;