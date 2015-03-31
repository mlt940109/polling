/**
 * Created by ngtmuzi on 2015/3/30.
 */
var cons = {};

/**
 * Registering a special message id to the http.ServerResponse.
 * @public
 * @param {String} id
 * @param {Object} res
 */
function on(id, res) {
  if (res.socket && res.socket.writable) {
    if (!cons[id]) {
      cons[id] = [];
    }
    cons[id].push(res);
  } else {
    throw (new Error('res is unavailable'));
  }
}

/**
 * Find http.ServerResponse by the special message id and send the message.
 * @public
 * @param {String} id
 * @param {Object} msg
 */
function emit(id, msg) {
  process.nextTick(function () {
    while (cons[id] && cons[id].length) {
      var res = cons[id].pop();
      if (res.socket && res.socket.writable) {
        if (res.send)
          res.send(msg);
        else
          res.end(msg);
      }
    }
  });
}

/**
 * Remove a group listeners by the id.
 * @public
 * @param {String} id
 */
function remove(id) {
  if (cons[id]) {
    delete cons[id];
  }
}

var task;
/**
 * Set the interval of unavailable connection's clear task.
 * @public
 * @param {Number} interval
 */
function setClaerInterval(interval) {
  clearTimeout(task);
  task = setTimeout(function () {
    Object.keys(cons).forEach(function (id) {
      cons[id] = cons[id].filter(function (res) {
        return (res.socket && res.socket.writable);
      });
      if (cons[id].length === 0) delete cons[id];
    });
    task = setTimeout(arguments.callee, interval);
  }, interval);
}
//Default clear interval is 10 min.
setClaerInterval(1000 * 60 * 10);


module.exports.on = on;
module.exports.emit = emit;
module.exports.remove = remove;
module.exports.setClaerInterval = setClaerInterval;

