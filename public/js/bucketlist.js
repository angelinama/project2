$(document).ready(() => {
  // Getting references to our form and input
  function fetchBucketlist() {
    const user = localStorage.getItem("user");
    const userId = JSON.parse(user).id;
    $.get(`/api/bucketlist/${userId}`)
      .then((data) => {
        //data contains id of wine in bucketlist of this user
        console.log(data);
        //make call to wine table for those ids - get all details of those wines refer :6.
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 401) {
          localStorage.removeItem("user");
          $("#logout").hide();
          window.location.replace("/");
        }
        res.status(500).send("Something went wrong");
      });
  }
  fetchBucketlist();
  // UPDATE
  const addtoHistoryBtns = document.querySelectorAll(".move-bucket");
  // Set up the event listener for deleting a cat.
  if (addtoHistoryBtns) {
    addtoHistoryBtns.forEach((button) => {
      button.addEventListener("click", (e) => {
        // Grabs the id of the element that goes by the name, "id"
        const id = e.target.getAttribute("data-id");
        const wineId = e.target.getAttribute("data-wine");
        $.post("/api/reviews", { wine_id: wineId }).then((response) => {
          // Check that the response is all good
          // Reload the page so the user can see the new state
          if (response.ok) {
            console.log(`moved wine: ${id}`);
            location.reload("/");
          } else {
            alert("something went wrong!");
          }
        });
      });
    });
  }
  // DELETE
  const deleteBtns = document.querySelectorAll(".delete-bucket");
  // Set up the event listener for deleting a cat.
  if (deleteBtns) {
    deleteBtns.forEach((button) => {
      button.addEventListener("click", (e) => {
        // Grabs the id of the element that goes by the name, "id"
        const id = e.target.getAttribute("data-id");

        fetch(`/api/bucketlists/${id}`, {
          method: "DELETE",
        }).then((response) => {
          // Check that the response is all good
          // Reload the page so the user can see the new state
          if (response.ok) {
            console.log(`deleted wine: ${id}`);
            location.reload("/");
          } else {
            alert("something went wrong!");
          }
        });
      });
    });
  }
});
