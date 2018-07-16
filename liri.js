
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
    console.log(command + args);
    
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
                console.log("User Name: " + tweet.user.name);
                console.log("Tweet Time: " + tweet.created_at);
                console.log("Tweet Content: " + tweet.text);
            });
        }
        else {
            console.log("No Tweets to Show")
        }
    });

}

//Spotify Function
function spotify(args) {
    console.log(args);
    
    const spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: args, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        else {
            // var obj = JSON.parse(data)
            console.log("Artists: " + data.tracks.items[0].album.artists[0].name);
            console.log("Song Name: " + data.tracks.items[0].name);
            console.log("Preview Link: " + data.tracks.items[0].preview_url);
            console.log("Album Name: " + data.tracks.items[0].album.name);
        }
    });
}

//OMDB Function
function movie(args) {
    var queryUrl = "http://www.omdbapi.com/?t=" + args + "&apikey=trilogy";
    request(queryUrl, function (err, response, data) {

        if (!err && response.statusCode === 200) {

            var obj = JSON.parse(data)
            console.log("")
            console.log("Title: " + obj.Title);
            console.log("Release Year: " + obj.Year);
            console.log("IMDB Rating: " + obj.imdbRating);
            console.log("Rotten Tomatoes rating: " + obj.Ratings[1].Value);
            console.log("Production Location: " + obj.Country);
            console.log("Language: " + obj.Language);
            console.log("Movie Plot: " + obj.Plot);
            console.log("Main Actors: " + obj.Actors);
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