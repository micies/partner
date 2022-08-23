export function Get(BaseUrl, data) {
  fetch(`${BaseUrl}`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((res) => data(res));
}

export function Delete(BaseUrl, id) {
  fetch(`${BaseUrl}/${id}`, {
    method: "DELETE",
  });
}

export function Post( BaseUrl, data) {
  fetch(`${BaseUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export const GetById = (BaseUrl, id, data) => {
  fetch(`${BaseUrl}/${id}`)
    .then((response) => response.json())
    .then((json) => {
      data(json.person);
    });
};
