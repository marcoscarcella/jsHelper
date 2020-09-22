const intercept = (urlmatch, callback) => {
    let send = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function() {
        this.addEventListener('readystatechange', function() {
            if (this.responseURL.includes(urlmatch) && this.readyState === 4) {
                callback(this);
            }
        }, false);
        send.apply(this, arguments);
    };
};
let users1 = [];
let users2 = new Object;
intercept('https://api3.youpic.com/user/1028252/fan/to', function(x) {
    let resp = JSON.parse(x.response);
    let userList = resp.resource.User;
    userList.forEach(function(u) {
        users1.push(u.name);
        users2[u.id] = [u.name];
    });
    
    console.log('users1');
    console.dir(users1.length);
    console.log('users2');
    console.dir(Object.keys(users2).length);

});
