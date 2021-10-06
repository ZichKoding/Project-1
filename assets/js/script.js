// let searchEl = $("#searchBar").text();
// let testMBKey = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelType=any&eventType=completed&maxResults=10&order=relevance&q=' + searchEl + '&key=' + config.youtube.brock;


// allows pressing the enter key as an option for searching in addition to the search button
$("#searchBaR").keypress(function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      $("#search-button").click();
    }
});


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

function musicVideoData(musicVid) {
    fetch(musicVid)
    .then(response => response.json())
    .then(function(data) {
        // link to the youtube page
        console.log("https://www.youtube.com/watch?v=" + data.items[0].id.videoId + "&ab_channel=" + data.items[0].snippet.channelTitle);
        getEvents(data.items[0].snippet.channelTitle);
        // variable for embedding the video
        let mainVidEl = "https://www.youtube.com/embed/" + data.items[0].id.videoId + "?autoplay=1";
        // giving iframe the src path for the video
        $("#searchedVid").attr("src", mainVidEl);
    });
};

// seatgeek api for pulling up an artist's events
function getEvents(searchTerm){
    fetch(`https://api.seatgeek.com/2/events?q=${searchTerm}&client_id=` + config.seatgeek)
    .then(response => response.json())
    .then(function(data) {
        console.log(data);
        console.log(
            data.events[0].title,
            data.events[0].venue.extended_address,
            data.events[0].datetime_local,
            data.events[0].url
            );
    });
};

// itunes api to get artist name and send to getEvents
// still looking on how to search for an artist by track name
function getArtistName(searchTerm) {
    fetch(`https://itunes.apple.com/search?term=${searchTerm}&limit=10`)
    .then(response => response.json())
    .then((data) => {
        console.log(data.results[0].artistName);
        let returnedArtist = data.results[0].artistName;
        getEvents(returnedArtist);
    })
};


$("button").click((event) => {
    event.preventDefault();
    // added the variables here so everything will be loaded correctly. 
    let searchEl = $("#searchBar").val();
    let testMBKey = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelType=any&maxResults=10&order=relevance&q=' + searchEl + '&type=video&key=' + config.youtube.chris;
    // dynamically loading the video to the html
    mainElDynamic();
    musicVideoData(testMBKey);
    getArtistName(searchEl);
});