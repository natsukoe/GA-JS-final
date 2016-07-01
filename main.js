      // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // Creating my movie play list
      var myPlayList = ['0F4GDdanQNA', '45ETZ1xvHS0', 'mX91StxUMyA'];
      var index = 0;
      var currentMovie = myPlayList[index];
      console.log("initial movie playing: " + currentMovie);

      // Selecting a movie to play
      // for ( i=0; i<myPlayList.length; i++ ) {
      //   var currentMovie = myPlayList[i];
      //   console.log('current play: ' + currentMovie);
      //   // Waiting until the current movie ends
      //   //setTimeout(function(){ console.log("Fin."); }, getDuration() * 1000);
      // }

      // Setting the next movie buttons
      var movieNextBtn = document.getElementById('next');

      movieNextBtn.addEventListener('click', function() {
        player.pauseVideo();
        if ( index > myPlayList.length-2 ) {
          index = 0;
          currentMovie = myPlayList[index];
          console.log( 'next btn1: ' + currentMovie + ' index: ' + index );
          //onYouTubeIframeAPIReady();
          //onPlayerReady(event);
        }
        else {
          index++
          currentMovie = myPlayList[index];
          console.log( 'next btn2 (else): '  + currentMovie + ' index: ' + index ); 
          //onYouTubeIframeAPIReady();
          //onPlayerReady(event);
        }
      })

      // Setting the previous movie buttons
      var movieNextBtn = document.getElementById('prev');

        movieNextBtn.addEventListener('click', function() {
          player.pauseVideo();
          if ( index == 0 ) {
            index = myPlayList.length-1;
            currentMovie = myPlayList[index];
            console.log( 'next btn1: ' + currentMovie + ' index: ' + index );
            //onYouTubeIframeAPIReady();
            //onPlayerReady(event);
          }
          else {
            index--
            currentMovie = myPlayList[index];
            console.log( 'next btn2 (else): '  + currentMovie + ' index: ' + index ); 
            //onYouTubeIframeAPIReady();
            //onPlayerReady(event);
          }
        })

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      console.log( 'Current Movie: ' + currentMovie);

      var player;     
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: currentMovie, // 'M7lc1UVf-VE'
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }


      function onYouTubePlayerReady(currentMovie) {
       //var player = document.getElementById(playerApiId);
       window["onStateChange" + currentMovie] = function(state) {   
          switch(state) {
             case 0:                         
    var video_player = document.getElementById(player_id);
    video_player.loadVideoById(window[player_id].getNextVideo(), 0, "large"); 

        break;
          }
       };
       player.addEventListener("onStateChange", "onStateChange" + currentMovie);   
    }


      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
        // Obtaining movie duration
        var movieDuration = document.getElementById('movie-duration');
        movieDuration.innerHTML = event.target.getDuration() + 'sec';
      }


      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }
      }
      function stopVideo() {
        player.stopVideo();
      }


// Work Progress Counter
function workCompleted() {
	var movieLength = document.getElementsByClassName("movie-length");
	console.log("number of the targets: " + movieLength.length);
  var sum = 0;

	for ( var i = 0; i < movieLength.length; i++ ) {
    sum += parseInt(movieLength[i].innerText);	
	}
  console.log("All Movies: " + sum + "min");

}

workCompleted();







$(document).ready(function() {
  // create object instance of my Firebase database
  var myDBReference = new Firebase('https://natsuko-first-project.firebaseio.com/');

  var sourceTemplate = $('#list-template').html();
  var template = Handlebars.compile(sourceTemplate);

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB0oYDoogVP7A7oWI9uf0rQKAOSaqmNQa0",
    authDomain: "natsuko-first-project.firebaseapp.com",
    databaseURL: "https://natsuko-first-project.firebaseio.com",
    storageBucket: "natsuko-first-project.appspot.com",
   };

  // define submit event listener/handler
  $('#message-form').submit(function(event) {
    // prevents page refresh
    event.preventDefault();

    // grab user input
    var message = $('#message').val();
    var messagesReference = myDBReference.child('messages');
    messagesReference.push({
      message: message
    });
  });

  // Read functionality
  myDBReference.child('messages').on('child_added', function(results) {
    results.forEach(function(message) {

      var data = {
        message: message.val(),
        id: results.key(),
      };

      var templateHTML = template(data);

      var $templateHTML = $(templateHTML);

      $templateHTML.click(function() {
        var messageId = $(this).data('id');
        updateMessage(messageId);
      })
      $('#messages-list').append($templateHTML);

    });
  });

// Update Functionality
$(document.body).on('click', '.edit' ,function(){
    console.log('edit clicked!!');
});

  function updateMessage(id, message) {
    var messageReference = new Firebase('https://natsuko-first-project.firebaseio.com/messages/' + id);

    messageReference.update({
      message: 'pretending to be edited :)'
    });

  }


  // Delete functionality
  $(document.body).on('click', '.delete' ,function(){
    console.log('delete clicked!!');
  });

  function deleteMessage(id) {
    var messageReference = new Firebase('https://natsuko-first-project.firebaseio.com/messages/' + id);

    messageReference.remove();
  }

});

