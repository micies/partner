import React, { useState, useEffect } from "react";
import { Get, GetById, Post } from "../BaseService";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "../componentsToFunctions";

export default function Properties() {
  const [actorById, setActorById] = useState({});
  const { id } = useParams();
  const [inputRemark, setInputRemark] = useState({});
  const urlProperties = "http://localhost:4000/actor/properties";
  let navigate = useNavigate();

  useEffect(() => {
    GetById("http://localhost:4000/actor", id, setActorById);
    Get(urlProperties, setInputRemark);
  }, []);
  console.log(actorById);

  const submitProperties = () => {
    Post(urlProperties, inputRemark);
    navigate('/home');
  };

  const handleChange = (event) => {
    setInputRemark({
      ...inputRemark,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <h2> Properties </h2>
      Id
      <Input value={actorById.id} name={"id"} disabled={true} />
      Name
      <Input value={actorById.name} name={"name"} disabled={true} />
      Gender
      <Input value={actorById.gender} name={"gender"} disabled={true} />
      Birthday
      <Input value={actorById.birthday} name={"birthday"} disabled={true} />
      <h4>Remark</h4>
      <Input
        value={inputRemark[id]}
        name={id}
        onChange={(e) => handleChange(e)}
        id="textarea"
      />
      <div>
        <div className="button">
          <button className="button-3" onClick={submitProperties}>
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
