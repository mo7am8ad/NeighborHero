import React from "react";
import './MyGigs.css';
import { Link } from "react-router-dom";
import deletee from '../Assets/Logos/delete.png';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";

const MyGigs = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();

  const {isLoading, error, data} = useQuery({
    queryKey: ["myServices"],
    queryFn: () => 
        newRequest.get(
            `/service?userId=${currentUser._id}`
    ).then((res) => {
        return res.data;
    }),
  });

  const mutation = useMutation({
    mutationFn: (id) =>{
        return newRequest.delete(`/Service/${id}`);
    },
    onSuccess:()=>{
        queryClient.invalidateQueries(["myServices"]);
    }
  });

  const handleDelete = (id) =>{
    mutation.mutate(id);
  };
  
  return (
    <div className="myGigs">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Gigs</h1>
            <Link to={"/Add"}><button>Add New Gig</button></Link>
          </div>

          <table className="myGigsTable">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
            {data.map((Service) => ( 
              <tr key={Service.id}>
                <td>
                  <img className="img" src={Service.cover}/>
                </td>
                <td>{Service.title}</td>
                <td>{Service.price}</td>  
                <td>
                  <img className="deleteIcon" src={deletee} onClick={()=>handleDelete(Service._id)} />
                </td>
              </tr>
            ))
            }
          </table>
       </div>
        )
      }
    </div>
  );
};                      


export default MyGigs;


//

