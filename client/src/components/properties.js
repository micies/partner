import React, { useState, useEffect } from "react";

import { Get, GetById, Post } from "../BaseService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from 'react-router-dom';

export default function Properties() {
  const [actorById, setActorById] = useState({});
  const { id } = useParams();


  const [inputData, setInputData] = useState({});

  
  useEffect(() => {
    GetById('http://localhost:4000/actor', id, setActorById)
    Get(setInputData, "http://localhost:4000/actor/properties");
  }, []);
  console.log(actorById)

  const submitToProperties = () => {
    Post(inputData, "http://localhost:4000/actor/properties");
    toast.success(`the remark  ${inputData[id]} saved`);
  };

  const handleChange = (event) => {
    setInputData({
      ...inputData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <h2> Properties </h2>
      id
      <div className="form-group">
      <input className="form-group"  type="text" value={actorById.id} name={"id"} disabled />
      </div>
      name
      <div className="form-group">
      <input className="form-group" type="text" value={actorById.name} name={"name"} disabled />
      </div>
      gender
      <div className="form-group">
      <input className="form-group" type="text" value={actorById.gender} name={"gender"} disabled />
      </div>
      birthday
      <div className="form-group">
      <input className="form-group" type="text" value={actorById.birthday} name={"birthday"} disabled />
      </div>
      <div>
        <h4>remark</h4>
        <input
          type="text"
          className="textarea"
          value={inputData[id]}
          onChange={(e) => handleChange(e)}
          name={id}
        />

        <div className="button">
          <button className="button-3" onClick={() => submitToProperties()}>
            save
          </button>
          <ToastContainer />
        </div>
      </div>
      <a className="button-33" href="/home" rel="noreferrer">
        Back
      </a>
    </div>
  );
}
