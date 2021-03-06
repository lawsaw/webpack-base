function loadScript(url, completeCallback) {
    var script = document.createElement('script'), done = false,
        head = document.getElementsByTagName("head")[0];
    script.src = url;
    script.onload = script.onreadystatechange = function(){
        if ( !done && (!this.readyState ||
            this.readyState == "loaded" || this.readyState == "complete") ) {
            done = true;
            completeCallback();

            // IE memory leak
            script.onload = script.onreadystatechange = null;
            head.removeChild( script );
        }
    };
    head.appendChild(script);
}

loadScript('js/script.min.js',
    function(){
        console.log('script loaded');
        // loadScript('js/fontawesome.min.js',
        //     function(){
        //         console.log('fontawesome loaded');
        //     }
        // );
    }
);