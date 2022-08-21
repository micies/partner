import fetch from "node-fetch";
import fs from "fs";
import NodeCache from "node-cache";

const myCache = new NodeCache({ stdTTL: 300 });
const baseUrl = 'https://api.tvmaze.com/shows/1/cast'


  export function getData(req, res) {
 if (myCache.has("data")){
  return res.send(myCache.get("data"))
}
else {
  fetch(baseUrl)
    
  .then(response => response.json())
  .then((json) =>{
    myCache.set("data", json)
    res.send(myCache.data.data.v)
  }
  )}

}

export function deleteData(req, res) {
  const { id } = req.params;
  let allData; let partToFilter; let filtered; 
  for (let i = 0; i < myCache.data.data.v.length; i++) {
    allData = myCache.data.data.v
    if (myCache.data.data.v[i].person.id ==id){
      partToFilter = myCache.data.data.v[i]
      filtered = allData.filter(word => word !=  partToFilter);
      myCache.set("data", filtered)
      res.send(filtered)}
    }}

    export function changeTtl(req, res) {
      console.log(1233213213)
      const time = req.body.time
      myCache.ttl( "data", time  )
      res.send({messages: `the ttl is ${time}`})
    }



export function PostTxtFile(req, res) {
  const content = JSON.stringify(req.body);
    console.log(content) 

  fs.writeFile(
    "/home/alan/projects/jobPartner/server/properties.txt",
    content,
    (err) => {
      if (err) {
        console.error(err);
      }
      res.send( "file written successfully"); 
    }
  );
}

export function getTxtFile(req, res) {
  try {
    const data = fs.readFileSync(
      "/home/alan/projects/jobPartner/server/properties.txt",
      "utf8"
    );
    console.log(data);
    res.send(data);
  } catch (err) {
    console.error(err);
  }
}



