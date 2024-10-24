import React from "react";
import './Orders.css';
import messageIcon from '../Assets/Logos/messageicon.jpg';
import newRequest from "../utils/newRequest";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Orders = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const navigate = useNavigate();

    const { isLoading, error, data } = useQuery({
        queryKey: ["orders"],
        queryFn: () => 
            newRequest.get(`/orders`).then((res) => {
                return res.data;
            }),
    });

    const handleContact = async (order) => {
        const sellerId = order.sellerId;
        const buyerId = order.buyerId;
        const id = sellerId + buyerId;

        try {
            const res = await newRequest.get(`/conversations/single/${id}`);
            navigate(`/message/${res.data.id}`);
        } catch (err) {
            if (err.response.status === 404) {
                const res = await newRequest.post(`/conversations`, {
                    to: currentUser.isSeller ? buyerId : sellerId,
                });
                navigate(`/message/${res.data.id}`);
            }
        }
    };

    return (
        <div className="orders">
            {isLoading ? (
                "loading"
            ) : error ? (
                "error"
            ) : (
                <div className="container">
                    <div className="title">
                        <h1>Orders</h1>
                    </div>

                    <table className="orderTable">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
                                <th>Contact</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(order => (
                                <tr key={order.id}>
                                    <td>
                                        <img className="img" src={order.img} alt={order.title} />
                                    </td>
                                    <td>{order.title}</td>
                                    <td>{order.price}</td>
                                    <td>{currentUser.isSeller ? order.buyerId : order.sellerId}</td>
                                    <td>
                                        <img className="messageIcon" src={messageIcon} alt="Message" onClick={() => handleContact(order)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Orders;
