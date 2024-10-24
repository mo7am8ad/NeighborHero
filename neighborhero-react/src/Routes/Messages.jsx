import React from "react";
import './Messages.css';
import { Link } from "react-router-dom";
import newRequest from "../utils/newRequest.js";
import {QueryClientProvider, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";

function Messages(){

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const queryClient = useQueryClient();

    const {isLoading, error, data} = useQuery({
        queryKey: ["conversations"],
        queryFn: () => 
            newRequest.get(
                `/conversations`
        ).then((res) => {
            return res.data;
        }),
    });

    const mutation = useMutation({
        mutationFn: (id) =>{
            return newRequest.put(`/conversations/${id}`);
        },
        onSuccess:()=>{
            queryClient.invalidateQueries(["conversations"]);
        }
    });

    const handleRead = (id)=>{
        mutation.mutate(id);
    };

    return(
        <>  
            <div className="messages">
                {isLoading ? (
                    "loading"
                ) : error ? (
                    "error"
                ) : (   
                        <div className="container">
                            <div className="title">
                                <h1>Conversations</h1>
                            </div>

                            <table className="messgaesTable">
                                <thead>

                                
                                <tr>
                                    <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
                                    <th>Last message</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                
                                {data.map((c)=>(
                                <tr className={((currentUser.isSeller && !c.readBySeller) || 
                                    (!currentUser.isSeller && !c.readByBuyer)) && "active"} key={c.id}>
                                    <td>
                                        {currentUser.isSeller ? c.buyerId : c.sellerId}
                                    </td>
                                    <td>
                                        <Link className="link" to={`/message/${c.id}`}>
                                            {c?.lastMessage?.substring(0,100)}...
                                        </Link>
                                    </td>
                                    <td>{moment(c.updatedAt).fromNow()}</td>
                                    <td>
                                        {((currentUser.isSeller && !c.readBySeller) || 
                                        (!currentUser.isSeller && !c.readByBuyer)) && (
                                        <button onClick={()=>handleRead(c.id)}>
                                            Mark As Read
                                        </button>
                                        )}
                                    </td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    )
                }
            </div>
        </>
    );
};

export default Messages;
