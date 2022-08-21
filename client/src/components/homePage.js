import React, { useState, useEffect } from "react";
import { Delete, Get, Post } from "../BaseService";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { ModalDelete } from "../componentsToFunctions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function HomePage() {
  const [actors, setActors] = useState([]);
  const [ttl, setTtl] = useState();

  let arr = [];

  for (let i = 0; i < actors.length; i++) {
    arr.push(actors[i].person);
  }

  console.log(arr);

  useEffect(() => {
    Get(setActors, "http://localhost:4000/actor");
  }, []);
  const deleteFiled = (id) => {
    console.log(id);
    Delete(id, "http://localhost:4000/actor");
    setActors(delete actors.id);
    handleClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Post({ time: ttl }, "http://localhost:4000/ttl");
    toast.success(`the ttl is ${ttl}`);
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  return (
    <div>
      <h1>actorss id</h1>
      <div>
        <form onSubmit={handleSubmit}>
          enter time to refresh cache (in seconds):
          <input
            onChange={(e) => setTtl(e.target.value)}
            type="number"
            min={4}
          />
          <div className="button">
            <button className="button-3" type="submit">
              Submit time
            </button>
          </div>
          <ToastContainer />
        </form>
      </div>
      <div>
        <table className="center">
          <thead>
            <tr>
              <th>id</th>
              <th>view</th>
              <th>delete</th>
            </tr>
            {arr.map((item, i) => (
              <tr key={i}>
                <td>{item.id}</td>
                <td>
                  <Link
                    className="button-33"
                    state={{ data: item, index: i }}
                    to={`/properties/${item.id}`}
                  >
                    <BsSearch />
                  </Link>
                </td>
                <td>
                  <ModalDelete
                    confirmFunc={() => deleteFiled(item.id)}
                    text={`?${item.id} האם אתה בטוח שאתה מעוניין למחוק את`}
                  />
                </td>
              </tr>
            ))}
          </thead>
        </table>
      </div>
    </div>
  );
}
