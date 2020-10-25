
var h = {
    //Monitor div change
    /**
     *
     * @param {*} selectorContainer
     * @param {*} selectorElement
     * @param {*} f
     */
    monitor: (selectorContainer, selectorElement, f) => {
        var targetNode = document.querySelector(selectorContainer);
        if(targetNode){
            
            var config = { attributes: true, childList: true, subtree: true };
            var callback = function (mutationsList, observer) {
                if (mutationsList[0].addedNodes) {
                    let el = mutationsList[0].addedNodes[0];
                    if (el.id == selectorElement) {
                        f();
                    }
                }
            };
            var observer = new MutationObserver(callback);
            observer.observe(targetNode, config);
            //observer.disconnect();
        } else {
            console.log(selectorContainer + ' non esiste');
        }
 
    },
    //intercept all ajax calls
    /**
     *
     * @param {*} urlmatch
     * @param {*} callback
     */
    intercept: (urlmatch, callback) => {
        let send = XMLHttpRequest.prototype.send;
        XMLHttpRequest.prototype.send = function (x) {
            h.l(x);
            this.addEventListener(
                "readystatechange",
                function () {
                    if (this.responseURL.includes(urlmatch) && this.readyState === 4) {
                        callback(this);
                    }
                },
                false
            );
            send.apply(this, arguments);
        };
    },
    l: (message, debugDivSingle = false) => {
        console.dir(message);     
        if(h.debugDivEnabled || debugDivSingle){
            if(!document.querySelector('#debugDiv')){
                let createDebugDiv = document.createElement('div');
                createDebugDiv.id = 'debugDiv';
                createDebugDiv.style.position = 'fixed';
                createDebugDiv.style.top = '0';
                createDebugDiv.style.background = 'white';
                createDebugDiv.style.opacity = '0.8';
                createDebugDiv.style.zIndex = '999999';
                createDebugDiv.style.border = '1px red dashed';
                createDebugDiv.style.padding = '3px';
                createDebugDiv.style.minWidth = '100px';

                document.body.appendChild(createDebugDiv);
                createDebugDiv.addEventListener('click',function(){
                    this.remove();
                })
            }
            debugDiv = document.querySelector('#debugDiv');
            debugDiv.innerHTML += message + '<br>';
            
        }
    },
    debugDivEnabled: false, 
    makeButton: (text, f, style = false) => {
        let btn = document.createElement('button');
        if(!document.querySelector('#btnBar')){
            let btnBar = document.createElement('div');
            btnBar.id = 'btnBar';
            btnBar.style.position = 'absolute';
            btnBar.style.bottom = '0';     
            document.body.appendChild(btnBar);
        }
        btn.innerText = text;
        if(style){
            btn.style.cssText = style;
        }
        btn.addEventListener('click', f);
        btnBar.appendChild(btn);
    },
    q: (selector) => { return document.querySelector(selector); },
    qa: (selector) => { return document.querySelectorAll(selector); },
    keydown : (key = '', callback = () => {}) => {
        document.addEventListener("keydown", function (zEvent) {
            if (zEvent.key === key) {
                callback();
                zEvent.preventDefault();
              } 
        }); 
    }
};

/*Object.entries(h).forEach(function(x){
    window[x[0]] = x[1];
});

class x {
    yy = [];
    y(){
        console.dir('xx');
        this.yy.push('xx');
        console.dir(this.yy);
    }
}

xx = new x;
xx.y();
*/