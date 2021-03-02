$(document).ready(() => {
  const wineratingForm = $("form.winerate");
  const aromaFruit = $("#fruit");
  const aromaHerbal = $("#herbal");
  const aromaEarth = $("#earth");
  const aromaFloral = $("#floral");
  const aromaSpice = $("#spice");
  const aromaChemical = $("#chemical");
  const wineId = $("#wineId").val();
  const reqObj = { wine_id: wineId };

  $.get(`/api/wines/${wineId}`).then((data) => {
    console.log(data);
    d3.select("#wineName")
      .text(data.wine_name)
      .style("background-color", "#441215")
      .style("color", "white");
  });

  wineratingForm.on("submit", (event) => {
    event.preventDefault();
    reqObj.overall_score = $("input:checked", ".allrating").val();
    reqObj.sweetness_score = $("input:checked", ".sweetness").val();
    reqObj.acidity_score = $("input:checked", ".acidity").val();
    reqObj.tannis_score = $("input:checked", ".tannins").val();
    reqObj.body_score = $("input:checked", ".wbody").val();

    reqObj.fruity = $(aromaFruit)[0].checked ? true : false;
    reqObj.herbal = $(aromaHerbal)[0].checked ? true : false;
    reqObj.earth = $(aromaEarth)[0].checked ? true : false;
    reqObj.floral = $(aromaFloral)[0].checked ? true : false;
    reqObj.spice = $(aromaSpice)[0].checked ? true : false;
    reqObj.chemical = $(aromaChemical)[0].checked ? true : false;

    const isFavorite = $("#favorite")[0].checked ? true : false;

    if (isFavorite) {
      //update in wine history
      $.ajax({
        type: "PUT",
        url: `/api/winehistory/${wineId}`,
        contentType: "application/json",
        data: JSON.stringify({ favorite: isFavorite }),
      })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          if (error.status === 401) {
            alert(error.responseText);
            window.location.href = "/";
          } else {
            console.log(error);
            alert("something went wrong when adding to favorite");
          }
        });
    }

    $.post("/api/reviews", reqObj)
      .then((data) => {
        console.log(data);
        window.location.href = `/winesummary-${wineId}`;
      })
      .catch((error) => {
        if (error.status === 401) {
          alert(error.responseText);
          window.location.href = "/";
        } else {
          console.log(error);
          alert("something went wrong when submitting a review");
        }
      });
  });
});
