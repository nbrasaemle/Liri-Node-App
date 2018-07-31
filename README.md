# Liri-Node-App
An application for node similar to siri, but it prints to the console twitter, spotify, and OMDB files.

The commands to run this code are as follows:
 * "node liri.js" (this first part of the command line then the following after the liri.js)
    * "my-tweets"
        * This prints out the last 20 tweets of a certain user
        ![my tweets](/images/my-tweets.PNG)
    * "spotify-this-song"
        * after this command it can either be left blank and it will give you the song information for "The Call of the Mountains" by Eluveitie **or** if a song title is typed and the first one that the Spotify NPM comes up with will be printed out
        ![spotify this song](/images/spotify-this.PNG)
    * "movie-this"
        * similar to the spotify-this-song command, if there is no movie title after the "movie-this" command then the infor mation of Mr. Nobody is printed **or** if a movie title is written after the command, then the OMDB API pulls and prints the movie information
        ![movie this](/images/movie-this.PNG)
    * "do-what-it-says"
        * this command goes through a text file, and whatever command followed by an argument gets printed out
        ![do what it says](/images/doSays.PNG)

This application prints all the information to the console as well as to a log.txt file.

![my tweets and do what it says in log](/images/log1.PNG)
![movie this and spotify this song in log](/images/log2.PNG)