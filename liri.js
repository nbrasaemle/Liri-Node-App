
//Requires for the npms
const dotenv = require("dotenv").config();
const keys = require("./keys.js");
const fs = require('fs');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require('request');

//Keys being used

const divider = "\n-------------------------------------------------------------------------------\n";
const divS = "\n- - - - - - - - -\n"

var command = process.argv[2];
var args = process.argv.slice(3).join('+');
runApp(command, args);
function runApp(command, args) {
    // console.log(command + args);

    switch (command) {
        case "my-tweets":
            printCommand();
            tweets();
            break;
        case "spotify-this-song":
            printCommand();
            spotify(args);
            break;
        case "movie-this":
            printCommand();
            if (args === "") {
                args = "Mr. Nobody";
                movie(args);
            }
            else {
                movie(args);
            }
            break;
        case "do-what-it-says":
            printCommand();
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
    client.get('statuses/user_timeline', function (error, tweets, response) {
        if (!error) {
            tweets.forEach(tweet => {
               
                // let username = tweet.user.name;
                // let tweetTime = tweet.created_at;
                // let tweetText = tweet.text;

                // console.log("\nUsername: " + username + "\nTweet Time: " + tweetTime + "\nTweet Content: " + tweetText);


                let tweets = [
                    "Username: " + tweet.user.name,
                    "Tweet Time: " + tweet.created_at,
                    "Tweet Content: " + tweet.text
                ].join('\n');

                console.log(tweets);
                fs.appendFile("log.txt", tweets + divider, function (err) {
                    if (err) throw err;
                });
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
    if (args.length === 0) {
        args = "The Call of the Mountains"; // this song works
        //args = "the sign"; // did not work
    }
    const spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: args, limit: 1 }, function (err, data) {


        if (err) {
            return console.log('Error occurred: ' + err);
        }
        else {

            let songData = [
                "Artists: " + data.tracks.items[0].album.artists[0].name,
                "Song Name: " + data.tracks.items[0].name,
                "Preview Link: " + data.tracks.items[0].preview_url,
                "Album Name: " + data.tracks.items[0].album.name
            ].join('\n');

            fs.appendFile("log.txt", songData + divider, function (err) {
                if (err) throw err;
            });

            console.log(songData);

        }
    });
}

//OMDB Function
function movie(args) {
    var queryUrl = "http://www.omdbapi.com/?t=" + args + "&apikey=trilogy";
    request(queryUrl, function (err, response, data) {

        if (!err && response.statusCode === 200) {

            var obj = JSON.parse(data)

            let movieData = [
                "Title: " + obj.Title,
                "Release Year: " + obj.Year,
                "IMDB Rating: " + obj.imdbRating,
                "Rotten Tomatoes rating: " + obj.Ratings[1].Value,
                "Production Location: " + obj.Country,
                "Language: " + obj.Language,
                "Movie Plot: " + obj.Plot,
                "Main Actors: " + obj.Actors
            ].join('\n');

            fs.appendFile("log.txt", movieData + divider, function (err) {
                if (err) throw err;
            });

            console.log(movieData + divider);

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

function printCommand() {
    fs.appendFile("log.txt", command + divS, function (err) {
        if (err) throw err;
    });
}