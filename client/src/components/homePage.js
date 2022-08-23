import React, { useState, useEffect } from "react";
import { Delete, Get, Post } from "../BaseService";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { ModalDelete } from "../componentsToFunctions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function HomePage() {
  const [actors, setActors] = useState({});
  const [ttl, setTtl] = useState();
  
  console.log(actors);

  const urlActor = 'http://localhost:4000/actor'
  useEffect(() => {
    Get(urlActor, setActors);
  }, []);
  const deleteFiled = (id) => {
    Delete(urlActor, id);


    setActors((current) =>
      current.filter((actors) => {
        return actors !== id;
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Post( "http://localhost:4000/ttl", { time: ttl });
    toast.success(`the ttl is ${ttl}`);
  };

  return (
    <div>
      <h1>actors id</h1>
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
            {!!actors.length &&
              actors.map((item, i) => (
                <tr key={i}>
                  <td>{item}</td>
                  <td>
                    <Link
                      className="button-33"
                      to={`/properties/${item}`}
                    >
                      <BsSearch />
                    </Link>
                  </td>
                  <td>
                    <ModalDelete
                      confirmFunc={() => deleteFiled(item)}
                      text={`?${item} Are you sure you want to delete the`}
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
