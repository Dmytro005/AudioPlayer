var app = angular.module("AudioPlayerApp", []);
var Songs = [
	{
		artist: "Imagine Dragons",
		name:"Beliver",
		src: "Imagine Dragons – Believer"
	},
	{
		artist: "Imagine Dragons",
		name:"Dream",
		src: "Imagine Dragons – Dream"
	},
	{
		artist: "Ben Howard",
		name:"All Is Now Harmed",
		src: "Ben Howard – All Is Now Harmed"
	},
	{
		artist: "Ben Howard",
		name:"Oats In The Water",
		src: "Ben Howard – Oats In The Water"
	},
	{
		artist: "Ben Howard",
		name:"Promise",
		src: "Ben Howard – Promise"
	},
	{
		artist: "The Seige",
		name:"Prime",
		src: "The Seige – Prime"
	},

	{
		artist: "The Seige",
		name:"Animal",
		src: "The Seige – Animal"
	},

	{
		artist: "The Seige",
		name:"Ctrl+Alt+Del",
		src: "The Seige – Ctrl Alt Del Explicit"
	},

	{
		artist: "Coldplay",
		name:"Adventure Of A Lifetime",
		src: "Coldplay – Adventure Of A Lifetime"
	}
	,{
		artist: "ACDC",
		name:"Back in Black",
		src: "ACDC - Back in Black"
	}

]

app.controller("AudioPlayerCtrl", function ($scope, $interval) {
	// Current song Time in miliseconds
	$scope.Time = 0;
	
	// Current song formated time and duration
	$scope.CurrentTime
	$scope.CurrentDuration 

	//Current song order index
	$scope.CurrentSong = 0;

	//if we click on timeline
	$scope.Clicked = false

	//Array of songs
	$scope.Songs = Songs;

	$scope.CurrentTime = "00:00"
	$scope.CurrentDuration = "00:00"

	var PLayAtFirst = true;

	// Init player
	var player = document.getElementById("player");


	// Define format and type
	const AudioFolder = "audio/";
	const AudioFormat = ".mp3";

	//set type of songs
	$("#player").attr('type', `audio/${AudioFormat.substring(1,1)}`);	

	// format miliseconds to minutes and seconds
	function formatTime(seconds) {

		if (isNaN(seconds)) {
			seconds = 0;
		}

	    minutes = Math.floor(seconds / 60);
	    minutes = (minutes >= 10) ? minutes : "0" + minutes;
	    seconds = Math.floor(seconds % 60);
	    seconds = (seconds >= 10) ? seconds : "0" + seconds;
	    return minutes + ":" + seconds;
  	}

  	// PLay songs by index
	$scope.PlaySong = (index) => {
		// console.log($scope.Songs.length);
		// console.log(index);
		$("#PlayPause").addClass('pause-img');


		//If it`s the last song in playlist play the first song
		if (index == $scope.Songs.length) {
			index = 0;
		}

		// If it`s first song in playlist play the last song
		if (index == -1) {
			index = $scope.Songs.length - 1;
		}		

		let src = $scope.Songs[index].artist.replace(/\s/g,'');

		//Select the background
		$(".background").css("background-image",`url(img/backgrounds/${src}.jpg)` );

		//Load song
		$("#player").attr('src', AudioFolder+$scope.Songs[index].src+AudioFormat);

		$("#player")[0].play();	

		//Toggle class
		$(`.song:eq(${$scope.CurrentSong})`).removeClass('selected');
		$(`.song:eq(${index})`).addClass('selected');

		$scope.CurrentSong = index;

		PLayAtFirst = false;
	}



	// play next song in the end of play list
	$("#player").on('ended', () => {
		$scope.PlaySong($scope.CurrentSong+1);
	});


	//update time
	$("#player").on("timeupdate", ()=>{
		// diaply duration
		$("#UserTime").attr({
			"max": player.duration
		});
		if (player.played){
			$scope.$apply(function() { 
				$scope.Time = player.currentTime;
				$scope.CurrentTime = formatTime($scope.Time);
				$scope.CurrentDuration = formatTime(player.duration);
			});
		}

	});

	$scope.ApplyCurrnetTime = () => {
		if($scope.Clicked){
			$scope.CurrentTime = formatTime($scope.Time);
		}
	}

	// Touch the range chouse the time
	$scope.SetTime = () => {
		$scope.Clicked = true
		$("#player")[0].pause();
		//Remove icon
		$("#PlayPause").removeClass('pause-img');
		// $scope.$apply(function() { 
		// });
	}
	// Leave the range and play
	$scope.ApplyTime = () => {
		player.currentTime = $scope.Time;
		$("#player")[0].play();
		$("#PlayPause").addClass('pause-img');
		$scope.Clicked = false
	}

	// PLay pasue toogling
	$scope.PlayPause = () => {

		// Change icon
		$("#PlayPause").toggleClass('pause-img');
		
		// If we play and no one song is selected
		if(PLayAtFirst){
			// Play first song
			$scope.PlaySong(0)
			return true
		}

		//If pause -> play
		if(player.paused){
			$("#player")[0].play();	
			$scope.IsPlaying = true;
			// console.log("PLay");
			return true
		}

		// if played -> pause
		if(player.played){
			$("#player")[0].pause();
			// console.log("Pause");
			return false
		}
	}

	// Mute tettings
	$scope.SetMute = function () {
		player.volume = $scope.Mute;
	}

	$scope.MuteDisabled = function () {
		$scope.Mute	= 0;
		$scope.SetMute();
	}

	$scope.MuteEnable = function () {
		$scope.Mute	= 1;
		$scope.SetMute();
	}

	//Preload titles
	function Preload(){
		images = [];
		for (var i = 0; i <= $scope.Songs.length - 1; i++) {
			var src = `https://dmytro005.github.io/AudioPlayer/app/img/backgrounds/${$scope.Songs[i].artist}.jpg`.replace(/\s/g,'');
			images[i] = new Image();
			images[i].src = src;
		}
	}
	Preload();
	
})