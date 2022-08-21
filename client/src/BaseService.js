
export function Get(data, BaseUrl) {
    fetch(`${BaseUrl}`,{

      method: 'GET',
      headers: {
        accept: 'application/json',
      }})
      
    .then(response => response.json())
    .then((res) => data(res))
    
}

export function Delete (id, BaseUrl) {
    fetch(`${BaseUrl}/${id}`, {
        method: 'DELETE'
      })
          
    
}

export function Post(data, BaseUrl) {
    fetch(`${BaseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify(data),
    });
  }











  






