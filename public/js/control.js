let home = document.getElementById("home-control");
let reload = document.getElementById("reload-control");
// let close = document.getElementById("close-control");
let iframe = document.getElementById("uv-iframe");
let back = document.getElementById("back-control");
let forward = document.getElementById("forward-control");
let settings = document.getElementById("settings-control");

home.addEventListener("click", () => {
    //get orginal url from iframe
    window.location.reload();
});

reload.addEventListener("click", () => {
    //reload iframe
    iframe.contentWindow.location.reload();
});

back.addEventListener("click", () => {
    //go back in iframe
    iframe.contentWindow.history.back();
});

forward.addEventListener("click", () => {
    //go forward in iframe
    iframe.contentWindow.history.forward();
});

settings.addEventListener("click", () => {
    //go to settings page
    window.location = "/settings";
});


// close.addEventListener("click", () => {
//     //exit iframe
//     window.location.reload();
// });