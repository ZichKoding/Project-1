const mainEl = $("#mainContainer");
let pastFuture = $("<div></div>").addClass("testingContainer").attr("id", "eventContainer");
let musicEl = $("<iframe></iframe>").addClass("music-video").attr("id", "searchedVid");


// place item into localStorage
function searchHistory() {
    let historyEl = $("#searchBar").val();
    localStorage.setItem("search history", JSON.stringify(historyEl));
    console.log(historyEl);
};


// allows pressing the enter key as an option for searching in addition to the search button
$("#searchBaR").keypress(function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      $("#search-button").click();
    }
});

function musicVideoData(musicVid) {
    fetch(musicVid)
    .then(response => response.json())
    .then(function(data) {
        // link to the youtube page
        console.log(data);
        // console.log("https://www.youtube.com/watch?v=" + data.items[0].id.videoId + "&ab_channel=" + data.items[0].snippet.channelTitle);
        // variable for embedding the video
        let mainVidEl = "https://www.youtube.com/embed/" + data.items[0].id.videoId + "?autoplay=1";
        // giving iframe the src path for the video
        musicEl.attr("src", mainVidEl);
        mainEl.append(musicEl);
    });
};

// seatgeek api for pulling up an artist's events
function getEvents(searchTerm){
    removeOld();
    fetch(`https://api.seatgeek.com/2/events?q=${searchTerm}&client_id=` + config.seatgeek )
    .then(response => response.json())
    .then(function(data) {
        console.log(data);

        if (data.events.length > 0) {
            for(let i = 0; i < data.events.length && i < 5; i++) {
                // Looping the event dates and displaying the above the list
                let pastFutureUL = $("<ul></ul>").attr("id", "eventDate").text("Date: " + data.events[i].datetime_local);
                // Looping through the title, address, and url and displaying them.
                // Title
                let eventTitle = $("<li></li>").text(`Title: ${data.events[i].title}`);
                pastFutureUL.append(eventTitle);
                // Address
                let eventAddress = $("<li></li>").text(`Address: ${data.events[0].venue.extended_address}`);
                pastFutureUL.append(eventAddress);
                // URL
                let uRL = $("<a></a>").attr("href", data.events[0].url).text("https://seatgeek.com/");
                let eventURL = $("<li></li>").text(`URL: `).append(uRL);
                pastFutureUL.append(eventURL);

                // Appending the <ul>
                if (i === 0) {
                    pastFuture.append($(`<h2></h2>`).text(`${searchTerm} Events`));
                }
                pastFuture.append(pastFutureUL);
                mainEl.append(pastFuture);
            }
        } else {
            pastFuture.append($(`<h2></h2>`).text(`${searchTerm} has no upcoming events`));
            mainEl.append(pastFuture);
        }
    });
};

// itunes api to get artist name and send to getEvents
function getArtistName(searchTerm) {
    fetch(`https://itunes.apple.com/search?term=${searchTerm}&limit=10`)
    .then(response => response.json())
    .then((data) => {
        console.log(data);
        // looping through the list if the list of arrays is something other than song to retrieve more accurate search for events and music video
        for (let i = 0; i < data.results.length; i++){
            if (data.results[i].kind === "song") {
                // retrieving events with artist name
                let returnedArtist = data.results[i].artistName;
                getEvents(returnedArtist);

                // adding artist name to the end of search to hopefully make a more accurate search
                let betterVidSearch = data.results[i].trackName + " by " + returnedArtist;
                console.log(betterVidSearch);
                let testMBKey = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelType=any&maxResults=10&order=relevance&q=' + betterVidSearch + '&type=video&key=' + config.youtube.chris;
                musicVideoData(testMBKey);
                break;
            }
        }
    });
};

function removeOld() {
    for(let i = 0; i < pastFuture.length; i++) {
        pastFuture[0].innerHTML = "";
    };
}


$("button").click((event) => {
    event.preventDefault();
    // adding audio to search
    let searchAudio = new Audio("./assets/audio/searchAudio.mp3");
    searchAudio.play();

    // added the variables here so everything will be loaded correctly. 
    let searchEl = $("#searchBar").val();
    console.log(searchEl);
    // retrieving artist name from iTunes api
    setTimeout(() => {
        getArtistName(searchEl)
        searchHistory();
        searchAudio.pause();
    }, 3500);
});


