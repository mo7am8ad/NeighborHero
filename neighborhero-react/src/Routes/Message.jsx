import React from "react";
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../utils/newRequest.js";
import './Message.css';
import emptyImage from '../Assets/images/emptyProfile.jpeg';

function Message() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const { id } = useParams();
    const queryClient = useQueryClient();

    // Fetch messages for the conversation
    const { isLoading: messagesLoading, error: messagesError, data: messagesData } = useQuery({
        queryKey: ["messages", id],
        queryFn: () => newRequest.get(`/messages/${id}`).then(res => res.data),
    });

    // Fetch current user's data (already in localStorage)
    const currentUserData = currentUser;

    // Fetch other user's data based on the messages
    const otherUserId = messagesData && messagesData[0] ? messagesData[0].userId !== currentUser._id ? messagesData[0].userId : null : null;
    const { isLoading: otherUserLoading, error: otherUserError, data: otherUserData } = useQuery({
        queryKey: ["user", otherUserId],
        queryFn: () => newRequest.get(`/users/${otherUserId}`).then(res => res.data),
        enabled: !!otherUserId,
    });

    const mutation = useMutation({
        mutationFn: (message) => newRequest.post(`/messages`, message),
        onSuccess: () => queryClient.invalidateQueries(["messages", id]),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({
            conversationId: id,
            desc: e.target[0].value,
        });
        e.target[0].value = "";
    };

    if (messagesLoading || otherUserLoading) return "loading";
    if (messagesError || otherUserError) return "error";

    return (
        <div className="message">
            <div className="messageContainer">
                <span className="breadCrumbs">
                    <Link className="link" to={"/messages"}>Conversations</Link>  &gt; {messagesData.sellerId} 
                </span>
                <div className="messagesBox">
                    {messagesData.map((m) => (
                        <div className={m.userId === currentUser._id ? "messageItemOwner" : "messageItem"} key={m._id}>
                            <img src={m.userId === currentUser._id ? (currentUserData.img || emptyImage) : (otherUserData?.img || emptyImage)} alt="" />
                            <p>{m.desc}</p>
                        </div>
                    ))}
                </div>
                <hr className="hrMessage" />
                <form className="MessageLower" onSubmit={handleSubmit}>
                    <textarea name="" placeholder="Write a message"></textarea>
                    <button type="submit" className="messageSend">Send</button>
                </form>
            </div>
        </div>
    );
};

export default Message;
