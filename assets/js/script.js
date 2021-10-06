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

fetch(`https://api.seatgeek.com/2/events?q=${searchTerm}&client_id=MjM3NjEyMTB8MTYzMzQ3NjcxNi43MzYzMzA1`)
.then(function(response){
    console.log(fetch)
    console.log(response)
    return response.json
})
.then(function(json){
    

})