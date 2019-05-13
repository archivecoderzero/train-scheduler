$(document).ready(function () {
    var firebaseConfig = {
        apiKey: "AIzaSyB4weCpObFNyZWGcvhzrYDH08N8OWPPBSE",
        authDomain: "test-d7fd7.firebaseapp.com",
        databaseURL: "https://test-d7fd7.firebaseio.com",
        projectId: "test-d7fd7",
        storageBucket: "test-d7fd7.appspot.com",
        messagingSenderId: "736850118177"
      };
      firebase.initializeApp(firebaseConfig);
    var database = firebase.database();
    $('#submitBtn').on("click", function (event) {
        var name = $('#name').val().trim();
        var destination = $('#destination').val().trim();
        var time = $('#time').val().trim();
        var frequency = $('#frequency').val().trim();
        event.preventDefault();
            database.ref().push({
                "name": name,
                "destination": destination,
                "time": time,
                "frequency": frequency,
                "dateAdded": firebase.database.ServerValue.TIMESTAMP,


    });
});





    $(document.body).on("click", '.close', function () {
        console.log(this)
        $(this).parent().parent().addClass("d-none");
    });

    $(document.body).on("click", '#clear', function () {
        console.log("working")
        $("#result").empty();
    });




    database.ref().orderByChild("dateAdded").limitToLast(10).on("child_added", function (childSnapshot) {

        var sv = childSnapshot.val();
        var name = sv.name;
        var destination = sv.destination;
        var time = sv.time;
        var frequency = sv.frequency;

        var firstTimeConverted = moment(time, "HH:mm").subtract(1, "years");

        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

        var tRemainder = diffTime % frequency;

        var tMinutesTillTrain = frequency - tRemainder;

        var nextTrain = moment().add(tMinutesTillTrain, "minutes");

        var closeBtn = '<button type="button" class="close text-light" aria-label="Close"><span aria-hidden="true">&times;</span></button>';

        var dataSet = ("<tr><td>" + closeBtn +
            "</td><td data='name'>" + name +
            "</td><td data='destination'>" + destination +
            "</td><td data='frequency'>" + frequency +
            "</td><td data='time'>" + moment(nextTrain).format("hh:mm a") +
            "</td><td>" + tMinutesTillTrain + "</td></tr>");

        $("#result").append(dataSet);
    });

    database.ref().on("child_added", function (snapshot) {
        var sv = snapshot.val();
    });

});

$(".container-fluid").hide();
$("card.my-4.bg-info.text-dark.border").hide();
$(".jumbotron-fluid.weather").hide();

$(document).on("click","#locator" , getLocation);

$(document).on("click","#displayInfo" ,displayInfoSkip );

$(document).on("click","#hideWeather" , hideWeather);

$(document).on("click","#locatorInCard" , getLocation);


function displayInfoSkip() {
$(".container-fluid").show();
$("card.my-4.bg-info.text-dark.border").show();
$("#displayInfo").hide();
$(".jumbotron-fluid.weather").hide();
$("#locator").hide();
}


function hideWeather() {
    $("#displayInfo").hide();
    $(".jumbotron-fluid.weather").hide();
}

function displayInfo() {
    $(".container-fluid").show();
    $("card.my-4.bg-info.text-dark.border").show();
    $("#locator").text("Check The Current Weather");
    $("#displayInfo").hide();
    $(".jumbotron-fluid.weather").show();
    $("#locator").hide();


    }
  
    var temperature;
  
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
  
          var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&units=imperial&APPID=6f5733cd2bffb62eaa78ffbc321576e5";
          getWeather(queryURL);
          displayInfo();
        });
      } else {
        console.log("NO CONNECTION");
        displayInfo();
      }
    }
  
    function getWeather(queryURL) {
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function (response) {
        var city = response.name;
        temperature = Math.round(response.main.temp);
        var humidity = response.main.humidity;
        var condition = response.weather[0].main;
        var iconCode = "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
        var code = response.weather[0].icon;
  
            switch (code) {
              case '11d':
              case '11n':
                $('.card-img-top.weather').attr("src", "assets/images/stormy.png");
                $('.jumbotron-fluid.weather').css("background-image", "url('assets/images/stormy.gif')");
                $('.jumbotron-fluid.weather').css("background-position", "center");
                $('.jumbotron-fluid.weather').css("background-repeat", "no-repeat");
                $('.jumbotron-fluid.weather').css("background-size", "cover");
                break;
              case '09d':
              case '09n':
              case '10d':
              case '10n':
              $('.card-img-top.weather').attr("src", "assets/images/rain.png");
              $('.jumbotron-fluid.weather').css("background-image", "url('assets/images/rain.gif')");
              $('.jumbotron-fluid.weather').css("background-position", "center");
              $('.jumbotron-fluid.weather').css("background-repeat", "no-repeat");
              $('.jumbotron-fluid.weather').css("background-size", "cover");

              break;
              case '13d':
              case '13n':
              $('.card-img-top.weather').attr("src", "assets/images/snow.png");
              $('.jumbotron-fluid.weather').css("background-image", "url('assets/images/snow.gif')");
              $('.jumbotron-fluid.weather').css("background-position", "center");
              $('.jumbotron-fluid.weather').css("background-repeat", "no-repeat");
              $('.jumbotron-fluid.weather').css("background-size", "cover");

              break;
              case '01d':
              case '01n':
              $('.card-img-top.weather').attr("src", "assets/images/clear.png");
              $('.jumbotron-fluid.weather').css("background-image", "url('assets/images/clear.gif')");
              $('.jumbotron-fluid.weather').css("background-position", "center");
              $('.jumbotron-fluid.weather').css("background-repeat", "no-repeat");
              $('.jumbotron-fluid.weather').css("background-size", "cover");

              break;
              case '02d':
              case '02n':
              case '03d':
              case '03n':
              case '04d':
              case '04n':
              $('.card-img-top.weather').attr("src", "assets/images/cloudy.png");
              $('.jumbotron-fluid.weather').css("background-image", "url('assets/images/cloudy.gif')");
              $('.jumbotron-fluid.weather').css("background-position", "center");
              $('.jumbotron-fluid.weather').css("background-repeat", "no-repeat");
              $('.jumbotron-fluid.weather').css("background-size", "cover");

              break;    
              default:
              $('.card-img-top.weather').attr("src", "assets/images/placer.gif");
              $('.jumbotron-fluid.weather').css("background-image", "url('assets/images/placer.gif')");
              $('.jumbotron-fluid.weather').css("background-position", "center");
              $('.jumbotron-fluid.weather').css("background-repeat", "no-repeat");
              $('.jumbotron-fluid.weather').css("background-size", "cover");


                break;
            }
  
        $("#city").text(city);
        $("#condition").text(condition);
        $("#temp").text(temperature + '\u00B0');
        $("#humidity").text(humidity + '\u0025');
      });
  
    }
