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

app.controller("AudioPlayerCtrl", function ($scope, ) {
	
	const AudioFolder = "audio/";
	const AudioFormat = ".mp3";

	$("#player").attr('type', `audio/${AudioFormat.substring(1,1)}`);

	$scope.CurrentSong;

	$scope.Songs = Songs;

	$scope.Play = function (index, src) {
		console.log(AudioFolder+src+AudioFormat);

		$("#player").attr('src', AudioFolder+src+AudioFormat);
		$("#player")[0].play();	

		$(`.song:eq(${$scope.CurrentSong})`).removeClass('selected');
		$(`.song:eq(${index})`).addClass('selected');
		$scope.CurrentSong = index;
	}
		
	
})