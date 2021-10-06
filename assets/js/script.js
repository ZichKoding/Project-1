// let searchEl = $("#searchBar").text();
// let testMBKey = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelType=any&eventType=completed&maxResults=10&order=relevance&q=' + searchEl + '&key=' + config.youtube.brock;


function mainElDynamic() {
    const mainEl = $("#mainContainer");
    // The add class part look to the style.css to see what it contains
    let pastFuture = $("<div></div>").addClass("testingContainer");
    // Music video dynamic
    let musicEl = $("<iframe></iframe>").addClass("music-video");
    musicEl.attr("id", "searchedVid");
    // Appending the 3 main contents to the page.
    mainEl.append(pastFuture);
    mainEl.append(musicEl);
};

function musicBrainzData(musicbrainz) {
    fetch(musicbrainz)
    .then(response => response.json())
    .then(function(data) {
        // logging data to find endpoints
        console.log(data);
        // link to the youtube page
        console.log("https://www.youtube.com/watch?v=" + data.items[0].id.videoId + "&ab_channel=" + data.items[0].snippet.channelTitle);
        // variable for embedding the video
        let mainVidEl = "https://www.youtube.com/embed/" + data.items[0].id.videoId;
        // giving iframe the src path for the video
        $("#searchedVid").attr("src", mainVidEl);
    });
};


$("button").click((event) => {
    event.preventDefault();
    // added the variables here so everything will be loaded correctly. 
    let searchEl = $("#searchBar").val();
    let testMBKey = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelType=any&maxResults=10&order=relevance&q=' + searchEl + '&type=video&key=' + config.youtube.brock;
    // dynamically loading the video to the html
    mainElDynamic();
    musicBrainzData(testMBKey);
});