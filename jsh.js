//intercept all ajax calls
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

//Monitor div change
var monitor = function(selectorContainer, selectorElement, f){
    var targetNode = document.querySelector(selectorContainer);
    var config = { attributes: true, childList: true, subtree: true };
    var callback = function(mutationsList, observer) {
        if(mutationsList[0].addedNodes){
            let el = mutationsList[0].addedNodes[0];
            if(el.id == selectorElement){
                f();
            }
        }
    };
    var observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
    //observer.disconnect();
}

monitor('#container', 'test2', function(){console.log('OKOKOK')});

let test1 = document.createElement('div');
test1.id="test1";
let test2 = document.createElement('div');
test2.id="test2";
setTimeout(()=>document.getElementById('container').appendChild(test1), 2001);
setTimeout(()=>document.getElementById('container').appendChild(test2), 2000);
