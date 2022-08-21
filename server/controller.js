import fetch from "node-fetch";
import fs from "fs";
import NodeCache from "node-cache";

const myCache = new NodeCache({ stdTTL: 300 });
const externalUrl = "https://api.tvmaze.com/shows/1/cast";

export function get() {
  if (myCache.has("data")) {
    myCache.get("data");
    console.log("from cache");
  } else {
    fetch(externalUrl)
      .then((response) => response.json())
      .then((json) => {
        myCache.set("data", json);
        console.log("from api");
      });
  }
}
get();



export function getData(req, res) {
  return res.send(myCache.get("data"));
}



export function deleteData(req, res) {
  const { id } = req.params;
  var a = myCache.get("data");
  for (const element of a) {
    if (element.person.id == id) {
      a.splice(element, 1);
      myCache.set("data", a);
      return res.send("deleted"); 
    }
  }
}
export function changeTtl(req, res) {
  const time = req.body.time;
  console.log(time)  
  myCache.ttl("data", time);
  res.send({ messages: `the ttl is ${time}` });
}

export function PostTxtFile(req, res) {
  const content = JSON.stringify(req.body);

  fs.writeFile(
    process.cwd()+"/properties.txt",
    content,
    (err) => {
      if (err) {
        console.error(err);
      }
      res.send("file written successfully");
    }
  );
}

export function getTxtFile(req, res) {
  try {
    const data = fs.readFileSync(
      process.cwd()+"/properties.txt",
      "utf8"
    );
    res.send(data);
  } catch (err) {
    console.error(err);
  }
}
