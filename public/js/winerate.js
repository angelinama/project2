let overAllScore = null,
  sweetnessScore = null,
  acidityScore = null,
  tannisScore = null,
  bodyScore = null;

$(document).ready(() => {
  const wineratingForm = $("form.winerate");
  // const aromaFruit = $("input#fruit");
  // const aromaHerbal = $("input#herbal");
  // const aromaEarth = $("input#earth");
  // const aromaFloral = $("input#floral");
  // const aromaSpice = $("input#spice");

  $("input[name='allrating']").on("click", () => {
    overAllScore = $("input:checked", ".allrating").val();
  });

  $("input[name='sweetness']").on("click", () => {
    sweetnessScore = $("input:checked", ".sweetness").val();
  });

  $("input[name='acidity']").on("click", () => {
    console.log($("input:checked", ".acidity").val() + "checked!");
    acidityScore = $("input:checked", ".acidity").val();
  });

  $("input[name='tannins']").on("click", () => {
    tannisScore = $("input:checked", ".tannins").val();
  });

  $("input[name='wbody']").on("click", () => {
    bodyScore = $("input:checked", ".wbody").val();
  });

  wineratingForm.on("submit", (event) => {
    event.preventDefault();
    $.post("/api/reviews", {
      user_id: 1,
      wine_id: 1,
      overall_score: overAllScore,
      sweetness_score: sweetnessScore,
      acidity_score: acidityScore,
      tannis_score: tannisScore,
      body_score: bodyScore,
    })
      .then((data) => {
        console.log(data);
        //should redirect to detail page for a wine
        // window.location.href = "/";
      })
      .catch((error) => console.log(error));
  });
});
