h.debugDivEnabled = true;
  
h.intercept('', function (x) {
if (this.status == 429) {
    h.l('Prenditi una pausa');
}
});
         
document.addEventListener("keydown", function (zEvent) {

if (zEvent.altKey && zEvent.key === "ArrowLeft") {
    document.querySelectorAll('.user-modal .icon-action-fav').forEach(function (e) {
    e.click();
    console.log('Like!');
    });
    zEvent.preventDefault();
}

if (zEvent.altKey && zEvent.key === "ArrowDown") {
    document.querySelectorAll('.favorite button').forEach(function (x) {
    x.click();
    });
    document.querySelectorAll('.detailed-feedback .feedback .feedback-container .cbutton').forEach(function (e) {
    let tot = Math.floor(Math.random() * 8) + 1;
    //tot = 10;
    for (ii = 0; ii < tot; ii++) {
        e.click();
    }
    });
    zEvent.preventDefault();
}
});