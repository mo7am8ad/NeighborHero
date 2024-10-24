import React from "react";
import { Link } from 'react-router-dom';
import "./serviceCard.css";
import newRequest from "../../utils/newRequest";
import { useQuery } from "@tanstack/react-query";
import emptyImage from '../../Assets/images/emptyProfile.jpeg';

const ServiceCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [`${item.userId}`],
    queryFn: () => 
      newRequest.get(`/users/${item.userId}`)
      .then((res) => {
        return res.data;
      }),
  });

  return (
    <Link className="link" to={`/gig/${item._id}`}>
      <div className='serviceCard'>
        <div className="serviceCardImageContainer">
          <img src={item.cover} alt={item.title} />
        </div>
        <div className="serviceCardLower">
          <div className='info'>
            {isLoading ? (
              "Loading..."
            ) : error ? (
              "Something went wrong"
            ) : (
              <div className='user'>
                <img src={data?.img || emptyImage} alt={data?.username || "Anonymous"} />
                <span>{data?.username || "Anonymous"}</span>
              </div>
            )}
            <p>{item.title}</p>
          </div>
          <hr />
          <div className='details'>
            <span>STARTING AT</span>
            <h2>${item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ServiceCard;
