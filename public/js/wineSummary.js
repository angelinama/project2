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

      //display checkbox according to if its favorite is true in history
      addToFavorite(wineId);
      //get wine reviews
      return $.get(`api/reviews/${wineId}`);
    })
    .then((data) => {
      //data is a json object
      if (data) {
        const chartData = {};
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
          //data used to make graph
          if (typeof data[key] === "number") {
            chartData[key] = data[key];
          }
        }
        drawRadarChart(chartData);
      } else {
        const btn = d3
          .select("#reviewDetail")
          .append("button")
          .text("Review this wine")
          .attr("data-id", wineId)
          .classed("btn", true)
          .classed("btn-primary", true);

        btn.on("click", () => {
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

//TODO better handle null values
function drawRadarChart(data) {
  console.log(data);
  const ctx = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "radar",
    data: {
      labels: Object.keys(data),
      datasets: [
        {
          label: "wine rating",
          data: Object.values(data),
          backgroundColor: [
            "#e4999d",
            // "rgba(255, 99, 132, 0.2)",
            // "rgba(54, 162, 235, 0.2)",
            // "rgba(255, 206, 86, 0.2)",
            // "rgba(75, 192, 192, 0.2)",
            // "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "#441215",
            // "rgba(255, 99, 132, 1)",
            // "rgba(54, 162, 235, 1)",
            // "rgba(255, 206, 86, 1)",
            // "rgba(75, 192, 192, 1)",
            // "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
  console.log(myChart.width);
}

//add to favorite list
function addToFavorite(wineId) {
  const favoriteCheckbox = $("#favoriteCheckbox")[0];

  $.get(`/api/winehistory/wine/${wineId}`)
    .then((data) => {
      const isFavorite = data.favorite;
      if (isFavorite) {
        favoriteCheckbox.checked = true;
      } else {
        favoriteCheckbox.checked = false;
      }
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

  favoriteCheckbox.change(() => {
    favoriteCheckbox.checked = !favoriteCheckbox.checked;
    // $.ajax({
    //   type: "PUT",
    //   url: `/api/winehistory/${wineId}`,
    //   contentType: "application/json",
    //   data: JSON.stringify({ favorite: favoriteCheckbox.checked }),
    // })
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     if (error.status === 401) {
    //       alert(error.responseText);
    //       window.location.href = "/";
    //     } else {
    //       console.log(error);
    //       alert("something went wrong when adding to favorite");
    //     }
    //   });
  });
}
