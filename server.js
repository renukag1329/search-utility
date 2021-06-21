const express = require("express");

const app = express();
const port = 4000;

var FAILURE_COEFF = 10;
var MAX_SERVER_LATENCY = 200;

function getRandomBool(n) {
  var maxRandomCoeff = 1000;
  if (n > maxRandomCoeff) n = maxRandomCoeff;
  return Math.floor(Math.random() * maxRandomCoeff) % n === 0;
}

function getSuggestions(text) {
  var pre = "pre";
  var post = "post";
  var results = [];
  if (getRandomBool(2)) {
    results.push(pre + text);
  }
  if (getRandomBool(2)) {
    results.push(text);
  }
  if (getRandomBool(2)) {
    results.push(text + post);
  }
  if (getRandomBool(2)) {
    results.push(pre + text + post);
  }

  return new Promise((resolve, reject) => {
    var randomTimeout = Math.random() * MAX_SERVER_LATENCY;
    setTimeout(() => {
      if (getRandomBool(FAILURE_COEFF)) {
        reject();
      } else {
        resolve(results);
      }
    }, randomTimeout);
  });
}

app.get("/suggestions/:searchText", (req, res) => {
  const { searchText } = req.params;
  const suggestions = getSuggestions(searchText)
    .then((results) => {
      const data = { results };
      return res.json(data);
    })
    .catch((err) => {
      return res.send(err);
    });
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
