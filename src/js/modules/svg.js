//Load svg-sprite

// var ajax = new XMLHttpRequest();
// ajax.open("GET", "/svg/sprite.svg", true);
// ajax.send();
// ajax.onload = function(e) {
//     var div = document.createElement("div");
//     div.style.display = 'none';
//     div.innerHTML = ajax.responseText;
//     document.body.insertBefore(div, document.body.childNodes[0]);
// }

function requireAll(r) { r.keys().forEach(r); }

requireAll(require.context('../../svg/', true, /\.svg$/));

fetch(`svg/sprite.svg`).then(res => {
    return res.text();
}).then(data => {
    let div = document.createElement("div");
    div.style.display = 'none';
    div.innerHTML = data;
    document.body.insertBefore(div, document.body.childNodes[0]);
    //document.getElementById('svg-icons').innerHTML = data;
});


