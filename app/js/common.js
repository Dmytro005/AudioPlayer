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
	}

]

app.controller("AudioPlayerCtrl", function ($scope, $interval) {
	$scope.Time = 0;
	//Current song order index
	$scope.CurrentSong;

	//Array of songs
	$scope.Songs = Songs;

	$scope.IsPlaying = false;

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

	$scope.PlaySong = function (index, src) {
		// console.log(AudioFolder+src+AudioFormat);
		// console.log(index);

		$("#player").attr('src', AudioFolder+src+AudioFormat);
		$("#player")[0].play();	

		$(`.song:eq(${$scope.CurrentSong})`).removeClass('selected');
		$(`.song:eq(${index})`).addClass('selected');
		$scope.CurrentSong = index;
		$scope.IsPlaying = true;
	}


	$scope.NextSong = function() {

		let index = $scope.CurrentSong + 1;
		
		//If it`s the last song in playlist play the first song
		if (index == $scope.Songs.length) {
			index = 0;
		}
		let src = $scope.Songs[index].src;
		$scope.PlaySong(index, src);
	}

	// play next song in the end of play list
	$("#player").on('ended', function() {
		$scope.NextSong();
	});


	//update time
	$("#player").on("timeupdate", ()=>{
		$scope.$apply(function() { 
			$scope.Time = player.currentTime;
			$scope.CurrentTime = formatTime(player.currentTime);
			$scope.CurrentDuration = formatTime(player.duration);

			$("#UserTime").attr({
				"max": player.duration
			});
		});

	});

	// Touch the range chouse the time
	$scope.SetTime = function () {
		$("#player")[0].pause();
		$scope.NewTime = $scope.Time;
	}
	// Leave the range and play
	$scope.ApplyTime = function() {
		player.currentTime = $scope.Time;
		$("#player")[0].play();
		$scope.IsPlaying = true;
	}

	// PLay pasue toogling
	$scope.PlayPause = function() {

		if(!$scope.IsPlaying){
			$("#player")[0].play();	
			$scope.IsPlaying = true;
			console.log("PLay");

			return true
		}

		if($scope.IsPlaying){
			$("#player")[0].pause();	
			$scope.IsPlaying = false;
			console.log("Pause");

			return false
		}
		
	}


	// $scope.ChangeCurrentTime = function() {
	// 	$scope.player.currentTime = $scope.Time;
	// }

	// setInterval(()=>{
	// 	$scope.Time = player.currentTime;
	// 	console.log($scope.Time);
	// },1000)

	
})