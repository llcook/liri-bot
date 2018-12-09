//At the top of the liri.js file, add code to read and set any environment variables with the dotenv package:
require("dotenv").config();

// Add the code required to import the keys.js file and store it in a variable.
var keys = require("./keys");

var fs = require("fs");
var axios = require("axios");
var moment = require("moment");

// var Spotify = require("node-spotify-api");
// var spotify = new Spotify(keys.spotify);

var action = process.argv[2];
var userInput = process.argv.slice(3).join("+");

var info;

// Make it so liri.js can take in one of the following commands:

switch (action) {

    // concert-this
    case "concert-this":
    concertThis(userInput);
    break;

    // spotify-this-song
    case "spotify-this-song":
    spotifyThisSong(userInput);
    break;

    // movie-this
    case "movie-this":
    movieThis(userInput);
    break;

    // do-what-it-says
    case "do-what-it-says":
    doWhatItSays(userInput);
    break;

};

// `node liri.js concert-this <artist/band name here>`

// * Date of the Event (use moment to format this as "MM/DD/YYYY")

function concertThis() {

    var bandsKey = "009247c0fab99bb363c92c77e63f724b";

    var queryUrl = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=" + bandsKey;

    axios.get(queryUrl)
    .then(function(response) {

        info = response.data;

        for (var i = 0; i < response.data.length; i++) {
            var artist = info[i].lineup;
            var venue = info[i].venue.name;
            var location = info[i].venue.city;
            var date = info[i].datetime;
            
            console.log(`::::::::::::::::::\n\nArtist: ${artist}\nVenue: ${venue}\nLocation: ${location}\nDate: ${date}\n`);
        }
    })

}

// `node liri.js spotify-this-song '<song name here>'`

// * This will show the following information about the song in your terminal/bash window * Artist(s) * The song's name * A preview link of the song from Spotify * The album that the song is from * If no song is provided then your program will default to "The Sign" by Ace of Base.

function spotifyThisSong() {

}

// `node liri.js movie-this '<movie name here>'`

function movieThis() {

    var movieKey = "trilogy";

    var queryUrl = "http://www.omdbapi.com/?apikey=" + movieKey + "&t=" + userInput;

    axios.get(queryUrl)
    .then(function(response) {
        
        info = response.data;
        var title = info.Title;
        var year = info.Year;
        var imdbRate = info.imdbRating;
        var tomatoRate = info.Ratings[1].Value;
        var country = info.Country;
        var lang = info.Language;
        var plot = info.Plot;
        var actors = info.Actors;

        console.log(`::::::::::::::::::\n\nFilm: ${title}\nYear: ${year}\nIMDB rating: ${imdbRate}\nRotten Tomatoes rating: ${tomatoRate}\nCountry: ${country}\nLanguage: ${lang}\nPlot: ${plot}\nActors: ${actors}\n\n::::::::::::::::::`);

    })
}

//`node liri.js do-what-it-says`

// * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

// * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

// * Edit the text in random.txt to test out the feature for movie-this and concert-this.

function doWhatItSays() {

}

