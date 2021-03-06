/* global $ */

function sendRequest(type, route, data) {
  let formData = null;
  if (data) {
    if (data instanceof HTMLFormElement) formData = new FormData(data);
    else {
      formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }
  }
  
  if (formData)
    for (var value of formData.values()) {
      console.log(value);
    }

  return $.ajax({
    url: process.env.REACT_APP_SERVER_ROOT + route,
    data: formData,
    type,
    processData: false,
    contentType: false,
    xhrFields: {
      withCredentials: true,
    },
  });
}

function sendPost(route, data = null) {
  return sendRequest("POST", route, data);
}

function sendPut(route, data = null) {
  console.log(data);

  return sendRequest("PUT", route, data);
}

function sendDelete(route, data = null) {
  return sendRequest("DELETE", route, data);
}

function get(route, data = null) {
  let paramRoute = route;
  if (data) {
    paramRoute += "?";
    Object.entries(data).forEach(([key, value]) => {
      if (key && value) paramRoute += `&${key}=${value}`;
    });
  }
  return $.ajax({
    url: process.env.REACT_APP_SERVER_ROOT + paramRoute,
    type: "GET",
    xhrFields: {
      withCredentials: true,
    },
  });
}

export { sendPost, get, sendPut, sendDelete };
