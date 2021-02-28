$(document).ready(() => {
  // Getting references to our form and inputs
  const loginForm = $("form.login");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");
  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", (event) => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };
    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });
  function logOut() {
    console.log("I'm logging out");
    $.get("/logout")
      .then((data) => {
        console.log(data);
        localStorage.removeItem("user");
        $("#logout").hide();
        window.location.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.get("/api/users", {
      email: email,
      password: password,
    })
      .then((data) => {
        console.log(data);
        localStorage.setItem("user", JSON.stringify(data));
        $("#logout").show();
        $("#logout").click(logOut);
        window.location.replace("/welcome");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const user = localStorage.getItem("user");
  if (user) {
    $("#logout").show().click(logOut);
  } else {
    $("#logout").hide();
  }
});
