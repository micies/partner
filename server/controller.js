import fetch from "node-fetch";
import fs from "fs";
import NodeCache from "node-cache";
const time = 300;
const myCache = new NodeCache({ stdTTL: time });
const externalUrl = "https://api.tvmaze.com/shows/1/cast";

export function get() {
  if (myCache.keys().length > 1) {
    console.log(myCache.keys());
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

export function getData(req, res) {
  get();
  return res.send(myCache.keys());
}

export function getById(req, res) {
  const { id } = req.params;
  return res.send(myCache.get(id));
}

export function deleteData(req, res) {
  const { id } = req.params;
  myCache.del(id);

  return res.send("deleted");
}

export function changeTtl(req, res) {
  for (let element of myCache.keys()) {
    myCache.ttl(element, req.body.time);

    console.log(myCache.getTtl(element));
  }

  res.send({ messages: `the ttl is ${req.body.time}` });
}


export function PostTxtFile(req, res) {
  const content = JSON.stringify(req.body);

  fs.writeFile(process.cwd() + "/properties.txt", content, (err) => {
    if (err) {
      console.error(err);
    }
    res.send("file written successfully");
  });
}

export function getTxtFile(req, res) {
  try {
    const data = fs.readFileSync(process.cwd() + "/properties.txt", "utf8");
    res.send(data);
  } catch (err) {
    console.error(err);
  }
}
