
const messages = [
    "Are you sure?",
    "Really sure??",
    "Are you positive?",
    "Pookie please...",
    "Just think about it!",
    "If you say no, I will be really sad...",
    "I will be very sad...",
    "I will be very very very sad...",
    "Ok fine, I will stop asking...",
    "Just kidding, say yes please! ❤️"
];

let messageIndex = 0;

function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${currentSize * 1.5}px`;
}

function handleYesClick() {
    window.location.href = "yes_page.html";
}

function sendTelegramMessage(message) {
    let botToken = "7786881909:AAG9yEAModmiqvMRO6LCGKrFPzj9lB6zM5k";  // Replace with your actual bot token
    let chatID = "1202104387";  // Replace with your actual chat ID

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatID}&text=${message}`)
      .then(response => response.json())
      .then(data => {
          console.log("Notification sent!", data);
      })
      .catch(error => {
          console.error("Error:", error);
      });
}

// Send Telegram message when clicking Yes
document.querySelector(".yes-button").addEventListener("click", function() {
    sendTelegramMessage("She said YES! 🎉💖");
});

// Send Telegram message when clicking No
document.querySelector(".no-button").addEventListener("click", function() {
    sendTelegramMessage("She said no... 💔");
});

document.addEventListener("DOMContentLoaded", function () {
    let audio = document.getElementById("bg-music");

    // Ensure the audio element exists before adding event listeners
    if (!audio) {
        console.error("Audio element not found!");
        return;
    }

    // Reset playback time to start from the beginning
    audio.currentTime = 11; 
    localStorage.removeItem("musicTime"); // Clear saved playback position

    function playAudio() {
        audio.play()
            .then(() => {
                console.log("Audio is playing!");

                // Remove event listeners after first play
                document.removeEventListener("click", playAudio);
                document.removeEventListener("scroll", playAudio);
                document.removeEventListener("touchstart", playAudio);
            })
            .catch(error => console.log("Autoplay blocked:", error));
    }

    // Wait for user interaction, then start music
    document.addEventListener("click", playAudio);
    document.addEventListener("scroll", playAudio);
    document.addEventListener("touchstart", playAudio);
});
