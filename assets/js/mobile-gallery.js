document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".gallery-grid");
    const thumbs = [...document.querySelectorAll(".gallery-item")];
    const fullImages = JSON.parse(grid.dataset.images);

    const viewer = document.getElementById("viewer");
    const viewerImg = document.getElementById("viewerImg");
    const viewerClose = document.getElementById("viewerClose");

    let index = 0;

    function openViewer(i) {
        index = i;
        viewerImg.src = fullImages[i] || thumbs[i].dataset.src;
        viewer.classList.remove("hidden");
    }

    thumbs.forEach((el, i) => {
        el.addEventListener("click", () => openViewer(i));
    });

    viewerClose.addEventListener("click", () => viewer.classList.add("hidden"));

    document.querySelector(".viewer-prev").addEventListener("click", () => {
        openViewer((index - 1 + thumbs.length) % thumbs.length);
    });

    document.querySelector(".viewer-next").addEventListener("click", () => {
        openViewer((index + 1) % thumbs.length);
    });

    // Swipe
    let startX = 0;
    viewer.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    });

    viewer.addEventListener("touchend", (e) => {
        const endX = e.changedTouches[0].clientX;
        if (endX - startX > 50) openViewer((index - 1 + thumbs.length) % thumbs.length);
        if (startX - endX > 50) openViewer((index + 1) % thumbs.length);
    });
});
