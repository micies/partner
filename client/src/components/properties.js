import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";
import { Get, Post } from "../BaseService";
import { GetInput } from "../componentsToFunctions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Properties() {
  const { data } = useLocation().state;

  const [inputData, setInputData] = useState({});

  useEffect(() => {
    Get(setInputData, "http://localhost:4000/actor/properties");
  }, []);

  const submitToProperties = () => {
    Post(inputData, "http://localhost:4000/actor/properties");
    toast.success(`the remark  ${inputData[data.id]} saved`);
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
      <GetInput value={data.id} name={"id"} disabled={true} />
      name
      <GetInput value={data.name} name={"name"} disabled={true} />
      country
      <GetInput value={data.country.name} name={"country"} disabled={true} />
      gender
      <GetInput value={data.gender} name={"gender"} disabled={true} />
      birthday
      <GetInput value={data.birthday} name={"birthday"} disabled={true} />
      <div>
        <h4>remark</h4>
        <input
          type="text"
          className="textarea"
          value={"" || inputData[data.id]}
          onChange={(e) => handleChange(e)}
          name={data.id}
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
