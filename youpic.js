//h.debugDivEnabled = true;
var likeEnable = true;
h.intercept("", function (x) {
  if (x.status == 429) {
    h.l("Prenditi una pausa", true);
    likeEnable = false;
  }
});
var userList = [];
/*h.intercept('https://api3.youpic.com/user/1028252/fan/to', function(x) {
            let res = JSON.parse(x.response);
            let users = res.resource.User;
            users.forEach(function(u) {
                userList.push(u.displayName);
            });
            h.l(userList);
        })*/
h.intercept("https://api3.youpic.com/user/", function (x) {
  let userData = JSON.parse(x.response);
  let userFF = document.createElement("div");
  let delta =
    userData.resource.User[0].count.following -
    userData.resource.User[0].count.followers;
  let bg;
  if (delta > 100) {
    bg = "red";
  } else if (delta < -100) {
    bg = "green";
  } else {
    bg = "yellow";
  }
  userFF.style.borderBottom = "1px solid " + bg;
  userFF.innerText =
    "Following: " +
    userData.resource.User[0].count.following +
    " - Followers: " +
    userData.resource.User[0].count.followers;
  h.q(".user-modal").prepend(userFF);

});
//h.keydown('c', () => {console.log('c')});
//h.keydown(, () => {console.log('s')});

document.addEventListener("keydown", function (zEvent) {
  if (zEvent.altKey && zEvent.key === "ArrowLeft") {
    document
      .querySelectorAll(".user-modal .icon-action-fav")
      .forEach(function (e) {
        e.click();
        console.log("Like!");
      });
    zEvent.preventDefault();
  }

  if (zEvent.altKey && zEvent.key === "ArrowDown") {
    if (likeEnable) {
      document
        .querySelectorAll(
          ".detailed-feedback .feedback .feedback-container .cbutton"
        )
        .forEach(function (e) {
          let tot = Math.floor(Math.random() * 5) + 5;
          //tot = 10;
          for (ii = 0; ii < tot; ii++) {
            e.click();
          }
        });
      document.querySelectorAll(".favorite button").forEach(function (x) {
        x.click();
      });
    }
    zEvent.preventDefault();
  }
});
