import fetch from "node-fetch";
import fs from "fs";
import NodeCache from "node-cache";

const myCache = new NodeCache({ stdTTL: 300 });
const externalUrl = "https://api.tvmaze.com/shows/1/cast";

export function get() {
  if (myCache.keys().length > 1) {
    console.log("from cache");
    myCache.mget(myCache.keys());
  } else {
    fetch(externalUrl)
      .then((response) => response.json())
      .then((json) => {
        for (let element of json) {
          myCache.set(element.person.id, element);
          myCache.ttl(element.person.id, 300);
        }
        console.log("from api");
      });
  }
}
get();

export function getIdsToActors(req, res) {
  get();
  return res.send(myCache.keys());
}

export function getActor(req, res) {
  const { id } = req.params;
  return res.send(myCache.get(id));
}

export function deleteItem(req, res) {
  const { id } = req.params;
  myCache.del(id);
  return res.send("deleted");
}

export function changeTimeCache(req, res) {
  for (let element of myCache.keys()) {
    myCache.ttl(element, req.body.time);
  }
  get();
  res.send({ messages: `the ttl is ${req.body.time}` });
}

export function writeRemark(req, res) {
  const content = JSON.stringify(req.body);

  fs.writeFile(process.cwd() + "/properties.txt", content, (err) => {
    if (err) {
      console.error(err);
    }
    res.send("file written successfully");
  });
}

export function readRemark(req, res) {
  fs.readFile(process.cwd() + "/properties.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  });
}
