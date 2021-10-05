// Trying to pull the JSON formated data endpoints 
// However it's only returning xml data.
// Can we use xml data and if so how?
// Might have to look for another music video api
// YouTube Data API key = &key=AIzaSyAoAuZidiWzXoMS16M-thE7TaDJUGlS34w



let musicbrainzKey = "&token=DVnA1yF1utvshelsmWupGyyTK4DOhHdCbWBEzH7P";
let musicBrainz =  "https://musicbrainz.org/ws/2/artist?query=Chuck Berry&limit=5&offset=3" + musicbrainzKey;
// let testMBKey = "https://musicbrainz.org/ws/2/artist?query=name:chuckberry"+ musicbrainzKey;
// let testMBKey = "https://itunes.apple.com/search?term=all+star";
let testMBKey = "https://www.googleapis.com/youtube/v3/search?video=allstar&key=AIzaSyAoAuZidiWzXoMS16M-thE7TaDJUGlS34w";

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
}

mainElDynamic();

function musicBrainzData(musicbrainz) {
    fetch(musicbrainz)
    .then(response => response.json())
    .then(data => console.log(data));
};

musicBrainzData(testMBKey);