import React from "react";
import './gig.css';
import Slideshow from '../components/slide/slide.jsx';
import newRequest from "../utils/newRequest.js";
import { useQuery } from "@tanstack/react-query";
import {useParams, useNavigate } from "react-router-dom";
import emptyProfile from '../Assets/images/emptyProfile.jpeg';

function SingleGig() {
    const { id } = useParams();
    const navigate = useNavigate();
    const currentUser = localStorage.getItem("currentUser");

    const { isLoading, error, data } = useQuery({
        queryKey: ["gig", id],
        queryFn: () => 
            newRequest.get(`service/single/${id}`).then((res) => {
                return res.data;
            }),
    });

    const { isLoading: isLoadingUser, error: errorUser, data: dataUser } = useQuery({
        queryKey: ["user", data?.userId],
        queryFn: () => 
            newRequest.get(`/users/${data?.userId}`).then((res) => {
                return res.data;
            }),
        enabled: !!data?.userId, // Only run this query if data.userId is available
    });

    const handleOrderClick = () => {
        if (currentUser === "null") {
            alert("You need to sign in first!");
            navigate("/login", { state: { from: `/gig/${id}` } });
        } else {
            navigate(`/pay/${id}`);
        }
    };

    return (
        <div className="gig">
            {isLoading ? (
                "Loading..."
            ) : error ? (
                "Something went wrong!"
            ) : (
                <div className="SingleGigContainer">
                    <div className="Gigleft">
                        <div className="breadcrumbs">NeighborHero &gt; category </div>
                        <h1>{data.title}</h1>
                        <Slideshow images={data.images} /> 
                    </div>
                    <div className="GigRight">
                        {isLoadingUser ? (
                            "loading"
                        ) : errorUser ? (
                            "something went wrong!"
                        ) : (
                            <div className="GigUserProfile">
                                <img className="GigProfileImage" src={dataUser.img || emptyProfile} alt="Profile" />
                                <span>{dataUser.username}</span>
                            </div>
                        )}
                        <div className="GigDesc">
                            <p>{data.desc}</p>
                        </div>
                        <div className="GigRightButtonContainer">
                            <span className="priceSpan">price: ${data.price}</span>
                            <button className="gigButton" onClick={handleOrderClick}>
                                Order Service
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SingleGig;
