
//Requires for the npms
const dotenv = require("dotenv").config();
const keys = require("./keys.js");
const fs = require('fs');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require('request');

//Keys being used



var command = process.argv[2];
var args = process.argv.slice(3).join('+');
runApp(command, args);
function runApp(command, args) {
    // console.log(command + args);

    switch (command) {
        case "my-tweets":
            tweets();
            break;
        case "spotify-this-song":
            if (args === "") {
                args = "Ace of Base: The Sign";
                spotify(args);
            }
            else {
                spotify(args);
            }
            break;
        case "movie-this":
            if (args === "") {
                args = "Mr. Nobody";
                movie(args);
            }
            else {
                movie(args);
            }
            break;
        case "do-what-it-says":
            doSays();
            break;
        default:
            console.log("Command Error! \nPlease enter a valid command.")
            break;
    };
}

//Twitter function
function tweets() {
    const client = new Twitter(keys.twitter);
    client.get('statuses/home_timeline', function (error, tweets, response) {
        if (!error) {
            tweets.forEach(tweet => {
                
                let username = tweet.user.name;
                let tweetTime = tweet.created_at;
                let tweetText = tweet.text;

                console.log("\nUsername: " + username + "\nTweet Time: " + tweetTime + "\nTweet Content: " + tweetText);
    
             });
        }
        else {
            console.log("No Tweets to Show")
        }
    });

}

//Spotify Function
function spotify(args) {
    // console.log(args);

    const spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: args, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        else {
            // var obj = JSON.parse(data)
            let artists = data.tracks.items[0].album.artists[0].name;
            let songTitle =data.tracks.items[0].name;
            let link = data.tracks.items[0].preview_url;
            let album = data.tracks.items[0].album.name;

            console.log("\nArtists: " + artists + "\nSong Name: " + songTitle + "\nPreview Link: " + link + "\nAlbum Name: " + album);

        }
    });
}

//OMDB Function
function movie(args) {
    var queryUrl = "http://www.omdbapi.com/?t=" + args + "&apikey=trilogy";
    request(queryUrl, function (err, response, data) {

        if (!err && response.statusCode === 200) {

            var obj = JSON.parse(data)

            let movieTitle = obj.Title;
            let releaseYear = obj.Year;
            let imdb = obj.imdbRating;
            let rtRating = obj.Ratings[1].Value;
            let location = obj.Country;
            let language = obj.Language
            let plot = obj.Plot;
            let actors = obj.Actors;

            console.log("\nTitle: " + movieTitle + "\nRelease Year: " + releaseYear + 
                "\nIMDB Rating: " + imdb + "\nRotten Tomatoes rating: " + rtRating + 
                "\nProduction Location: " + location + "\nLanguage: " + language + "\nMovie Plot: " + plot + "\nMain Actors: " + actors);

        }
    });

}

//Do function
function doSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        var dataArray = data.split(",");
        console.log(dataArray);
        runApp(dataArray[0], dataArray[1]);

    });

}