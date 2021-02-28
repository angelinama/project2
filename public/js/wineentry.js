$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const wine_name = $("input#wine_name");
  const category = $("input#category");
  const country = $("input#country");
  const region = $("input#region");
  const year = $("input#year");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", (event) => {
    event.preventDefault();
    const userData = {
      wine_name: wine_name.val().trim(),
      category: category.val().trim(),
      country: country.val().trim(),
      region: region.val().trim(),
      year: year.val().trim(),
    };
    if (
      !userData.wine_name ||
      !userData.category ||
      !userData.country ||
      !userData.year
    ) {
      $("#alert").text("all fields required");
      return;
    }
    enterWine(
      userData.wine_name,
      userData.category,
      userData.country,
      userData.region,
      userData.year
    );
    wine_name.val("");
    category.val("");
    country.val("");
    region.val("");
    year.val("");
  });
});
