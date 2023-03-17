var mainListDiv = document.getElementById("mainListDiv"),
    mediaButton = document.getElementById("mediaButton");

mediaButton.onclick = function () {
    
    "use strict";
    
    mainListDiv.classList.toggle("show_list");
    mediaButton.classList.toggle("active");
};

function countdownTimer(dateString) {
    // Set the date we're counting down to
    var countDownDate = new Date(dateString).getTime();

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Calculate days and hours
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    // Output the result in an element with id="countdown"
    document.getElementById("countdown").innerHTML = "Days: " + days + " and Hours: " + hours;

    // If the count down is over, write some text
    if (distance < 0) {
      document.getElementById("countdown").innerHTML = "EXPIRED";
    }
  }
  
//   // Call countdownTimer() once the page has finished loading
//   window.onload = function() {
//     countdownTimer("Jun 17, 2023 00:00:00");
//   };

  // Call the countdownTimer function with the date string
  countdownTimer("June 17, 2023 00:00:00");