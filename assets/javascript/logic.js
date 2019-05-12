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
        $(this).parent().parent().addClass("d-none");
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
        console.log(sv);

    });

});