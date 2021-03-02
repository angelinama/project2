$(document).ready(() => {
  // Getting references to our form and input
  function fetchHistorylist() {
    const user = localStorage.getItem("user");
    const userId = JSON.parse(user).id;
    $.get(`/api/winehistory/${userId}`)
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
  fetchHistorylist();
});
