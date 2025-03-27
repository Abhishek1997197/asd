document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("videoUrl");
    const startBtn = document.getElementById("start");
    const container = document.getElementById("videoContainer");

    function createVideoPlayers(url) {
        container.innerHTML = ""; // Clear previous videos
        for (let i = 0; i < 4; i++) {
            let iframe = document.createElement("iframe");
            iframe.src = url;
            iframe.allow = "autoplay";
            container.appendChild(iframe);
        }
    }

    function simulateClicks() {
        const iframes = document.querySelectorAll("iframe");
        iframes.forEach(iframe => {
            try {
                let doc = iframe.contentDocument || iframe.contentWindow.document;
                let playButton = doc.querySelector("button[title='Play']");
                let pauseButton = doc.querySelector("button[title='Pause']");
                let volumeButton = doc.querySelector("button[title='Mute']");

                if (playButton) playButton.click();
                if (pauseButton) pauseButton.click();
                if (volumeButton) volumeButton.click();
            } catch (error) {
                console.log("Cannot access iframe content", error);
            }
        });
    }

    function restartVideos() {
        setInterval(() => {
            container.innerHTML = "";
            createVideoPlayers(input.value);
        }, Math.random() * 90000 + 30000); // Random interval between 30s to 1.5min
    }

    startBtn.addEventListener("click", function () {
        if (input.value) {
            createVideoPlayers(input.value);
            setInterval(simulateClicks, 5000); // Check every 5 seconds
            restartVideos();
        }
    });
});
