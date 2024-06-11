import { PayPalButtons } from "@paypal/react-paypal-js";
import React, { useContext } from "react";
import { ToastContext } from '~/components/ToastContext';
function PayPalPayMent({ data }) {
    const toastContext = useContext(ToastContext);
    const onApprove = (data, actions) => {
        return actions.order.capture().then(details => {
            alert('Transaction completed by ' + details.payer.name.given_name);
        });
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
                toastContext.notify('info', 'Đã thanh toán, vui lòng đợi xác nhận từ quản trị viên');
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