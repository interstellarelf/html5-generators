

let Rest = {

  baseServer: 'UNKNOWN',

  baseUri: 'http://localhost:4100',

  //get 1 or more resources from the server
  get(uri, callback, options = {}) {

    if (!uri) return console.error('Request was called with no uri --1st argument');

    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {

      if (request.readyState == 4 && request.status == 200)
      callback(request.responseText)
      else {
        console.log('Request failed.  Returned status of ' + request.status);
      }
    };

    request.open("GET", this.baseUri + uri);
    request.send();
  },

  //add 1 or more data-resources to the server
  post(uri, callback, options = {}) {

    if (!uri || !options.data) return console.error('Request was called with no uri --1st argument');

    var request = new XMLHttpRequest();

    request.open('POST', this.baseUri + uri);
    request.setRequestHeader("Content-Type",  'application/x-www-form-urlencoded');
    request.onload = function () {
      if (request.readyState == 4 && request.status == 201) {

        return callback(false, JSON.parse(request.responseText));
      } else {
        console.log('Request failed.  Returned status of ' + request.status);
      }
    };

    request.send(JSON.stringify({data:options.data}));
  },

  //add 1 or more data-resources to the server
  postJSON(uri, callback, options = {}) {

    console.info(options);

    if (!uri || !options.data) return console.error('Request was called with no uri --1st argument');

    var request = new XMLHttpRequest();

    request.open('POST', this.baseUri + uri);
    request.setRequestHeader("Content-Type",  'application/json');

    request.onload = function () {
      if (request.readyState == 4 && request.status == 201 || request.status == 200 ) {
        return callback(JSON.parse(request.responseText));
      } else {
        console.log('Request failed.  Returned status of ' + request.status);
      }
    };

    request.send(jstr({data:options.data}));
  },

  //change 1 or more existing resources on the server
  put(uri, callback, options = {}) {

    if (!uri) return console.error('Request was called with no uri --1st argument');

    request.open('PUT', uri);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.onload = function () {
      if (request.readyState == 4 && request.status == 200) {

        return callback(false, JSON.parse(request.responseText));
      } else {
        alert('Request failed.  Returned status of ' + request.status);
      }
    };

    request.send(JSON.stringify(options.data || {}));
  },

  //delete 1 or more existing resources on the server
  delete(uri, callback, options = {}) {

    if (!uri) return console.error('Request was called with no uri --1st argument');

    request.open('DELETE', uri);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.onload = function () {
      if (request.readyState == 4 && request.status == 200) {

        return callback(false, JSON.parse(request.responseText));
      } else {
        alert('Request failed.  Returned status of ' + request.status);
      }
    };

    request.send(JSON.stringify(options.data || {}));
  }
};
//# sourceMappingURL=rest.js.map
