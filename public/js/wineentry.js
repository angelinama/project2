$(document).ready(() => {
  console.log("start entering wine");
  // Getting references to our form and input
  const wineentryForm = $("form.wineentry");
  const wine_name = $("input#wine_name");
  const category = $("input#category");
  const country = $("input#country");
  const region = $("input#region");
  const year = $("input#year");
  wineentryForm.on("keydown", (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      return false;
    }
  });
  wineentryForm.on("submit", (event) => {
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
      userData.year,
      event.originalEvent.submitter.id
    );
    wine_name.val("");
    category.val("");
    country.val("");
    region.val("");
    year.val("");
  });
  function enterWine(wine_name, category, country, region, year, next_page) {
    $.post("/api/wines", {
      wine_name: wine_name,
      category: category,
      country: country,
      region: region,
      year: year,
    })
      .then((data) => {
        if (next_page === "bucketlist") {
          $.post("/api/bucketlist", {
            wine_id: data.id,
          })
            .then(() => {
              window.location.replace("/bucketlist");
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          $.post("/api/winehistory", {
            wine_id: data.id,
          })
            .then(() => {
              window.location.replace("/winehistory");
            })
            .catch((err) => {
              console.log(err);
            });
        } // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch((err) => {
        console.log(err);
        $("#alert").show().text("Unable to create this wine log");
      });
  }
});
