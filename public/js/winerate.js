const wineId = 1; //this should get from the page by either url

$(document).ready(() => {
  const reqObj = {};

  const wineratingForm = $("form.winerate");
  const aromaFruit = $("#fruit");
  const aromaHerbal = $("#herbal");
  const aromaEarth = $("#earth");
  const aromaFloral = $("#floral");
  const aromaSpice = $("#spice");
  const aromaChemical = $("#chemical");

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

    console.log(reqObj);

    $.post(`/api/reviews/wine/${wineId}/${userId}`, reqObj)
      .then((data) => {
        console.log(data);
        //should redirect to detail page for a wine
        // window.location.href = "/";
      })
      .catch((error) => console.log(error));
  });
});
