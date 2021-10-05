// Trying to pull the JSON formated data endpoints 
// However it's only returning xml data.
// Can we use xml data and if so how?
// Might have to look for another music video api
// YouTube Data API key = &key=AIzaSyAoAuZidiWzXoMS16M-thE7TaDJUGlS34w



// let musicbrainzKey = "&token=DVnA1yF1utvshelsmWupGyyTK4DOhHdCbWBEzH7P";
// let musicBrainz =  "https://musicbrainz.org/ws/2/artist?query=Chuck Berry&limit=5&offset=3" + musicbrainzKey;
// let testMBKey = "https://musicbrainz.org/ws/2/artist?query=name:chuckberry"+ musicbrainzKey;
// let testMBKey = "https://itunes.apple.com/search?term=all+star";
let searchEl = $(".search-bar").val();
let testMBKey = "https://www.googleapis.com/youtube/v3/search?part=snippet&video=" + $(".search-bar").val() + "&key=" + config.youtube;

function mainElDynamic() {
    const mainEl = $("main");

    // The add class part look to the style.css to see what it contains
    let pastFuture = $("<div></div>").addClass("testingContainer");

    // Artworkd dynamics
    let artEl = $("<div></div>").addClass("testingContainer");

    // Music video dynamic
    let musicEl = $("<div></div>").addClass("testingContainer");

    // Appending the 3 main contents to the page.
    mainEl.append(pastFuture);
    mainEl.append(artEl);
    mainEl.append(musicEl);
};

mainElDynamic();

function musicBrainzData(musicbrainz) {
    fetch(musicbrainz)
    .then(response => response.json())
    .then(function(data) {
        console.log(data);
        console.log(data.items[0].id.videoId);
        console.log(data.items[0].snippet.channelId);
        console.log("https://www.youtube.com/watch?v=" + data.items[0].id.videoId + "&ab_channel=" + data.items[0].snippet.channelId);
        let mainVidEl = "https://www.youtube.com/watch?v=" + data.items[0].id.videoId + "&ab_channel=" + data.items[0].snippet.channelId;
        $("#searchedVid").attr("src", mainVidEl);
    });
};

$(".search-button").click(() =>{
    musicBrainzData(testMBKey);
});
musicBrainzData(testMBKey);
