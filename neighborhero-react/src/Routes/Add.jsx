import React, { useReducer, useState, useEffect } from "react";
import './Add.css';
import { INITIAL_STATE, serviceReducer } from "../reducers/serviceReducer";
import upload from "../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const INITIAL_STATE_WITH_USER = {
    ...INITIAL_STATE,
    userId: currentUser?._id || "",
  };

  const [state, dispatch] = useReducer(serviceReducer, INITIAL_STATE_WITH_USER);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    dispatch({ type: "SET_USER_ID", payload: { userId: currentUser?._id || "" } });
  }, []);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log(err);
    }
  };

  const validateForm = () => {
    if (!state.title || !state.catigory || !state.desc || !state.price || !state.cover || !state.districts.length) {
      setError("All fields are required.");
      return false;
    }
    setError("");
    return true;
  };

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (service) => {
      return newRequest.post(`/service`, service);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["MyGigs"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      mutation.mutate(state);
      navigate("/MyGigs");
    }
  };

  return (
    <div className="add">
      <div className="addContainer">
        <h1>Add New Service</h1>
        <div className="AddSections">
          <div className="addSectionLeft">
            <label htmlFor="">Title</label>
            <input name="title" type="text" placeholder="I will do something" onChange={handleChange} />

            <label htmlFor="">Category</label>
            <select name="catigory" id="AddCats" onChange={handleChange}>
              <option value="">Select a category</option>
              <option value="Mechanics">Mechanics</option>
              <option value="Electrician">Electrician</option>
              <option value="Plumber">Plumber</option>
              <option value="Trainer">Personal Trainer</option>
              <option value="Designer">Designer</option>
              <option value="Driver">Driver</option>
              <option value="IT">IT Technician</option>
              <option value="Other">Other</option>
            </select>

            <label htmlFor="">Description</label>
            <textarea onChange={handleChange} name="desc" cols="30" rows="16" placeholder="A brief description for the service you want to share"></textarea>

            <button className="createServiceButton" onClick={handleSubmit}>Create</button>
            {error && <div className="error">{error}</div>}
          </div>

          <div className="addSectionRight">

          <label htmlFor="">Districts</label>
            <select name="districts" multiple={true} onChange={(e) => handleChange({
              target: {
                name: 'districts',
                value: Array.from(e.target.selectedOptions, option => option.value)
              }
            })}>
              <option value="Maltepe">Maltepe</option>
              <option value="Üsküdar">Üsküdar</option>
              <option value="Kadikoy">Kadikoy</option>
              <option value="Yenisahra">Yenisahra</option>
              <option value="Gebze">Gebze</option>
            </select>


            <div className="AddLeftFilesContaimer">
              <div className="imagesInput">
                <label htmlFor="">Cover Image</label>
                <input type="file" onChange={e => setSingleFile(e.target.files[0])} />

                <label htmlFor="">Upload Images</label>
                <input type="file" multiple onChange={e => setFiles(e.target.files)} />
              </div>
              <button onClick={handleUpload} className="imagesUploader">{uploading ? "Uploading" : "Upload"}</button>
            </div>
            <label htmlFor="">Price</label>
            <input name="price" className="priceAdd" type="number" min={1} onChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
