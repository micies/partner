import React, { useState, useEffect } from "react";
import { Get, GetById, Post } from "../BaseService";
import { useParams, useNavigate } from "react-router-dom";
import { GetInput } from "../componentsToFunctions";

export default function Properties() {
  const [actorById, setActorById] = useState({});
  const { id } = useParams();
  const [inputData, setInputData] = useState({});
  const urlProperties = "http://localhost:4000/actor/properties";
  let navigate = useNavigate();

  useEffect(() => {
    GetById("http://localhost:4000/actor", id, setActorById);
    Get(urlProperties, setInputData);
  }, []);
  console.log(actorById);

  const submitToProperties = () => {
    Post(urlProperties, inputData);
    navigate('/home');
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
      <GetInput value={actorById.id} name={"id"} disabled={true} />
      name
      <GetInput value={actorById.name} name={"name"} disabled={true} />
      gender
      <GetInput value={actorById.gender} name={"gender"} disabled={true} />
      birthday
      <GetInput value={actorById.birthday} name={"birthday"} disabled={true} />
      <h4>remark</h4>
      <GetInput
        value={inputData[id]}
        name={id}
        onChange={(e) => handleChange(e)}
        id="textarea"
      />
      <div>
        <div className="button">
          <button className="button-3" onClick={submitToProperties}>
            save
          </button>
        </div>
      </div>
      <a className="button-33" href="/home" rel="noreferrer">
        Back
      </a>
    </div>
  );
}
