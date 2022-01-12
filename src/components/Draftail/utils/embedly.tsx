const getJSON = (endpoint, data, successCallback) => {
  const request = new XMLHttpRequest();
  request.open("GET", endpoint, true);
  request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      successCallback(JSON.parse(request.responseText));
    }
  };
  request.send(data);
};

/* global EMBEDLY_API_KEY */
/* @ts-ignore */
const key = typeof EMBEDLY_API_KEY === "undefined" ? "key" : EMBEDLY_API_KEY;
const EMBEDLY_ENDPOINT = `https://api.embedly.com/1/oembed?key=${key}`;

const get = (url, callback) => {
  getJSON(`${EMBEDLY_ENDPOINT}&url=${encodeURIComponent(url)}`, null, callback);
};

export default {
  get
};
