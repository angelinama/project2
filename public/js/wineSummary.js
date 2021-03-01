document.addEventListener("DOMContentLoaded", () => {
  const wineId = d3.select("#wineId").text();
  $.get(`/api/wines/${wineId}`)
    .then((data) => {
      console.log(data);
      d3.select("#wineName")
        .text(data.wine_name)
        .style("background-color", "#441215")
        .style("color", "white");
      d3.select("#category").text(`Category: ${data.category}`);
      d3.select("#year").text(`Year: ${data.year}`);
      d3.select("#country").text(`Country: ${data.country}`);
      if (data.region) {
        d3.select("#region").text(`Region: ${data.region}`);
      }
      //get wine reviews
      return $.get(`api/reviews/${wineId}`);
    })
    .then((data) => {
      //data is a json object
      if (data) {
        const divEl = d3.select("#reviewDetail");
        divEl
          .append("h2")
          .text("Review")
          .style("margin-bottom", "20px")
          .classed("h2", true);

        for (key in data) {
          if (
            key === "id" ||
            key === "wine_id" ||
            key === "user_id" ||
            key === "createdAt" ||
            key === "updatedAt"
          ) {
            continue;
          }
          divEl
            .append("h5")
            .text(key + ": " + data[key])
            .classed("h5", true);
        }
      } else {
        const btn = d3
          .select("#reviewDetail")
          .append("button")
          .text("Review this wine")
          .attr("data-id", wineId)
          .classed("btn", true)
          .classed("btn-primary", true);

        btn.on("click", () => {
          //TODO  hook it to review page
          window.location.href = `/winerate-${wineId}`;
        });
      }
    })
    .catch((error) => {
      if (error.status === 401) {
        alert(error.responseText);
        window.location.href = "/";
      } else {
        console.log(error);
        alert("Something went wrong when getting wine summary!");
      }
    });
});
