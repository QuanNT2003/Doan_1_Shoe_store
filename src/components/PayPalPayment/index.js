import { PayPalButtons } from "@paypal/react-paypal-js";
import React, { useContext } from "react";
import { ToastContext } from '~/components/ToastContext';
import * as OrderServices from '~/apiServices/orderServices'
function PayPalPayMent({ data }) {
    const toastContext = useContext(ToastContext);
    const onApprove = (data, actions) => {
        return actions.order.capture().then(details => {
            update()
            toastContext.notify('info', 'Đã thanh toán, vui lòng đợi xác nhận từ quản trị viên');
        });
    };

    const update = async () => {
        const newObj = {
            ...data.obj,
            paymentPending: true
        }
        const result = await OrderServices.UpdateOrder(data.obj.orderId, newObj)
    }
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