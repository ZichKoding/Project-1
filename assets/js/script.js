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