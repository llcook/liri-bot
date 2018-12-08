//At the top of the liri.js file, add code to read and set any environment variables with the dotenv package:
require("dotenv").config();

// Add the code required to import the keys.js file and store it in a variable.
var keys = require("./keys");

// You should then be able to access your keys information like so
// var spotify = new Spotify(keys.spotify);

var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
// var Spotify = require("node-spotify-api");

var action = process.argv[2];
var userInput = process.argv.slice(3).join("+");

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

// * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

// * Name of the venue

// * Venue location

// * Date of the Event (use moment to format this as "MM/DD/YYYY")

function concertThis() {

    var queryUrl = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=009247c0fab99bb363c92c77e63f724b";

    axios.get(queryUrl)
    .then(function(response) {

        var info = response.data;

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

// * This will show the following information about the song in your terminal/bash window

// * Artist(s)

// * The song's name

// * A preview link of the song from Spotify

// * The album that the song is from

// * If no song is provided then your program will default to "The Sign" by Ace of Base.

// * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.

function spotifyThisSong() {

}

// `node liri.js movie-this '<movie name here>'`

// * This will output the following information to your terminal/bash window:

// ```
//   * Title of the movie.
//   * Year the movie came out.
//   * IMDB Rating of the movie.
//   * Rotten Tomatoes Rating of the movie.
//   * Country where the movie was produced.
//   * Language of the movie.
//   * Plot of the movie.
//   * Actors in the movie.
// ```

// * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

// * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>

// * It's on Netflix!

// * You'll use the `axios` package to retrieve data from the OMDB API.
// omdb api key: trilogy

function movieThis() {

}

//`node liri.js do-what-it-says`

// * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

// * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

// * Edit the text in random.txt to test out the feature for movie-this and concert-this.

function doWhatItSays() {

}

