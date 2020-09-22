
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
        XMLHttpRequest.prototype.send = function () {
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
    l: (message) => {
        console.dir(message);
    }
};

