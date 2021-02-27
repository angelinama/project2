$(document).ready(() => {
  console.log("hello 1");
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const nameInput = $("input#name-input");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");
  const confirmPassword = $("input#confirm-password");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", (event) => {
    console.log("Hello");
    event.preventDefault();

    const userData = {
      name: nameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      confirmPassword: confirmPassword.val().trim(),
    };

    if (!userData.name || !userData.email || !userData.password) {
      return;
    }
    if (!(userData.password === userData.confirmPassword)) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.name, userData.email, userData.password);
    nameInput.val("");
    emailInput.val("");
    passwordInput.val("");
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
        console.log(data);
        // window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
