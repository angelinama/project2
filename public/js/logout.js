if (
  window.location.pathname === "/" ||
  window.location.pathname === "/login" ||
  window.location.pathname === "/signup"
) {
  $("#logout").hide();
}
$("#logout").click(logOut);
function logOut() {
  console.log("I'm logging out");
  $.get("/logout")
    .then((data) => {
      console.log(data);
      clearClientSession();
      window.location.replace("/");
    })
    .catch((err) => {
      console.log(err);
    });
}
function clearClientSession() {
  localStorage.removeItem("user");
  $("#logout").hide();
}
