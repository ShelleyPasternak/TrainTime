//Initialize Firebase

var config = {
  apiKey: "AIzaSyD3SvAMsBXrUCXtR6yK324y3VC9H5fqjlg",
  authDomain: "traintime-b2cab.firebaseapp.com",
  databaseURL: "https://traintime-b2cab.firebaseio.com",
  projectId: "traintime-b2cab",
  storageBucket: "traintime-b2cab.appspot.com",
  messagingSenderId: "165452441849"
  };
  
  firebase.initializeApp(config);
  
  var dataRef = firebase.database();

  // Initial Values
  var trainName = "";
  var destination = "";
  var firstTrain = 0;
  var frequency = 0;
  
  // Capture Button Click
  $("#add-train").on("click", function(event) {
    event.preventDefault();
    //console.log("buttonclicked")
    trainName = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrain = $("#firstTrain-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    dataRef.ref().push({
        
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue
      });
    });
   
   //var currentTime = moment() 
   //var nextArrival = moment().diff(moment(firstTrain), frequency);
   //console.log(nextArrival);
   //var convertedTime = moment(nextArrival).format("HH:mm");

    dataRef.ref().on("child_added", function(childSnapshot) {
      
        // Log everything that's coming out of snapshot
        console.log(childSnapshot.val().trainName);
        console.log(childSnapshot.val().destination);
        console.log(childSnapshot.val().firstTrain);
        console.log(childSnapshot.val().frequency);
      
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;

    var currentTime = moment() 
    var nextArrival = moment().diff(moment(firstTrain), frequency);
    console.log(nextArrival);
    var minutesAway = nextArrival % frequency
    var convertedTime = moment(nextArrival).format("HH:mm");

     // Add each train's data into the table
  $("#timeTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + convertedTime + "</td><td>" + minutesAway + "</td><td>");   
            
      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);

    });

