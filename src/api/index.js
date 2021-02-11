function sendFeedbak(method, url, data) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = function() {
            if (xhr.readyState !== XMLHttpRequest.DONE) return;
            if (xhr.status === 200) {
                resolve();
            } else {
                reject();
            }
        };
        xhr.send(data);
    })
  }

module.exports = {
    sendFeedbak: sendFeedbak
}