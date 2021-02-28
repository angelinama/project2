$(document).ready(() => {
  console.log("start entering wine");
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const wine_name = $("input#wine_name");
  const category = $("input#category");
  const country = $("input#country");
  const region = $("input#region");
  const year = $("input#year");
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
  function enterWine(wine_name, category, country, region, year) {
    $.post("/api/wines", {
      wine_name: wine_name,
      category: category,
      country: country,
      region: region,
      year: year,
    }).then(() => {
      window.location.replace("/winerate");
      // If there's an error, handle it by throwing up a bootstrap alert
    });
  }
});
