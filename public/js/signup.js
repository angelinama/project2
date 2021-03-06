$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const nameInput = $("input#name-input");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");
  const confirmPassword = $("input#confirm-password");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", (event) => {
    event.preventDefault();

    const userData = {
      name: nameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      confirmPassword: confirmPassword.val().trim(),
    };

    if (
      !userData.name ||
      !userData.email ||
      !userData.password ||
      !userData.confirmPassword
    ) {
      $("#alert").show().text("all fields required");
      return;
    }
    if (!(userData.password === userData.confirmPassword)) {
      $("#alert").show().text("passwords don't match");

      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.name, userData.email, userData.password);
    nameInput.val("");
    emailInput.val("");
    passwordInput.val("");
    confirmPassword.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(name, email, password) {
    $.post("/api/users", {
      name: name,
      email: email,
      password: password,
    }) // eslint-disable-next-line no-unused-vars
      .then((data) => {
        $.get("/api/users", {
          email: email,
          password: password,
        }).then((data) => {
          console.log("signin success", data);
          localStorage.setItem("user", JSON.stringify(data));
          window.location.replace("/welcome");
        });
        // console.log("Sign up success!", data);
        // localStorage.setItem("user", JSON.stringify(data));
        // window.location.replace("/welcome");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    const customErrorMessage = {
      ValidationisEmailonemailfailed: "Please input a valid email address",
    };
    const dbError = _.get(
      err,
      "responseJSON.error.errors[0].message"
    ).replaceAll(" ", "");
    $("#alert")
      .show()
      .text(customErrorMessage[dbError] || "Something went wrong");
    $("#alert").fadeIn(500);
  }
});
