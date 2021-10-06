var searchTerm = $("#searchBar")


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
function getEvents(){
    fetch(`https://api.seatgeek.com/2/events?q=${searchTerm}&client_id=MjM3NjEyMTB8MTYzMzQ3NjcxNi43MzYzMzA1`)
    .then(function(response){
        if(response.ok){
            console.log("ok")
        }else{
            console.log("not ok")
        }
        console.log(fetch)
        console.log(response)
        return response.json()
        
    })
    .then(function(json){
        console.log(json.venue)

    });
};

$("button").click((event) => {
    event.preventDefault();
    console.log($("#searchBar").val());
    // musicBrainzData(testMBKey);
    getEvents();
});