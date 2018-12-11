# liri-bot!
A simple digital assistant that recognizes a user's text input to return information.

[Demo] (https://drive.google.com/file/d/1nxmh1W8KCo9Gfuf4UJqt_cJUuzrDP90P/view?usp=sharing)

### COMMANDS

_concert-this artist name_

    concert-this nine inch nails

    Queries the Bandsintown API and returns upcoming concert information for Nine Inch Nails

_spotify-this-song song name_

    spotify-this-song under pressure

    Queries the Spotify API and returns song information for "Under Pressure"

_movie-this movie name_

    movie-this the goonies

    Queries the OMDB and returns movie information about "The Goonies"

_do-what-it-says_

    Calls the random.txt file and executes the function and user query contained within

### REMAINING BUGS

* do-what-it-says is only functional for the spotify-this-song action
* moment.js not implemented for date formatting in concert-this

