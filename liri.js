// read and set any environment variables with the dotenv package
require("dotenv").config();

// add code required to import keys.js file store in variable
var keys = require("./keys");

var fs = require("fs");
var axios = require("axios");
var moment = require("moment");

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var action = process.argv[2];
var userInput = process.argv.slice(3).join("+");

var info;

// LIRI PROCESS

function runLiri(action) {

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
};

// LIRI FUNCTIONS

function concertThis() {

    var bandsKey = "009247c0fab99bb363c92c77e63f724b";

    var queryUrl = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=" + bandsKey;

    // query Bandsintown via user request
    axios.get(queryUrl)
        .then(function (response) {

            info = response.data;

            for (var i = 0; i < response.data.length; i++) {
                var artist = info[i].lineup;
                var venue = info[i].venue.name;
                var location = info[i].venue.city;
                var date = info[i].datetime;
                    // TO-DO: use moment to format date as "MM/DD/YYYY")

                console.log(`::::::::::::::::::\n\nArtist: ${artist}\nVenue: ${venue}\nLocation: ${location}\nDate: ${date}\n`);
            }
        })

}

function spotifyThisSong() {

    // if user doesn't input a request, it returns this as default
    if (!userInput) {
        userInput = "careful with that axe eugene"
        console.log(`\n\nYou didn't give me anything to search. Here's some psychedelic rock.\n\n`)
    }

    // query Spotify via user request
    spotify.search({ type: "track", query: userInput, limit: 10 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {

            for (var i = 0; i < 10; i++) {
                var info = data.tracks.items[i];
                var artist = info.artists[0].name;
                var song = info.name
                var preview = info.preview_url;
                var album = info.album.name;

                console.log(`::::::::::::::::::\n\nArtist: ${artist}\nSong: ${song}\nAlbum: ${album}\nSpotify preview: ${preview}\n`);
            }
        };
    });

}

function movieThis() {

    // if user doesn't input a request, it returns this as default
    if (!userInput) {
        userInput = "the color of pomegranates"
        console.log(`\n\nYou didn't give me anything to search. Have you seen this?.\n\n`)
    }

    // query OMDB via user request
    var movieKey = "trilogy";

    var queryUrl = "http://www.omdbapi.com/?apikey=" + movieKey + "&t=" + userInput;

    axios.get(queryUrl)
        .then(function (response) {

            info = response.data;
            var title = info.Title;
            var year = info.Year;
            var imdbRate = info.imdbRating;
            var tomatoRate = info.Ratings[1].Value;
            var country = info.Country;
            var lang = info.Language;
            var plot = info.Plot;
            var actors = info.Actors;

            console.log(`::::::::::::::::::\n\nFilm: ${title}\nYear: ${year}\nCountry: ${country}\nPlot: ${plot}\nActors: ${actors}\nLanguage: ${lang}\nIMDB rating: ${imdbRate}\nRotten Tomatoes rating: ${tomatoRate}\n\n::::::::::::::::::`);

        })
}

function doWhatItSays() {

    // read random.txt
    fs.readFile("random.txt", "utf8", function (error, data) {
    
        // turn the data into an array, divided by comma, with index 0 and 1
        var output = data.split(",");
        action = output[0];
        userInput = output[1];

        // plug the random.txt request into a function
        if (action === "spotify-this-song") {
            spotifyThisSong(action, userInput);
        }

        // TO DO: It should read the text in `random.txt` to call any of LIRI's commands

    });

}

runLiri(action);