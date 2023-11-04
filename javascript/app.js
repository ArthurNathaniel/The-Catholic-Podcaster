const recordButton = document.getElementById("recordButton");
const stopButton = document.getElementById("stopButton");
const saveButton = document.getElementById("saveButton");
const deleteButton = document.getElementById("deleteButton");
const playButton = document.getElementById("playButton");
const audio = document.getElementById("audio");
const progressCircle = document.getElementById("progressCircle");
let isPlaying = false;
let chunks = [];
let mediaRecorder;
let startTime;
let timerInterval;

recordButton.addEventListener("click", async () => {
  if (!mediaRecorder || mediaRecorder.state === "inactive") {
    startTime = new Date().getTime();

    timerInterval = setInterval(() => {
      const currentTime = new Date().getTime();
      const recordedTime = new Date(currentTime - startTime)
        .toISOString()
        .substr(14, 5);
      progressCircle.innerText = recordedTime;
    }, 1000);

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      clearInterval(timerInterval);
      const blob = new Blob(chunks, {
        type: "audio/wav",
      });
      const audioURL = window.URL.createObjectURL(blob);
      audio.src = audioURL;
      deleteButton.style.display = "inline";
      playButton.style.display = "inline";
      audio.style.display = "none";
    };

    mediaRecorder.start();
  }
});

stopButton.addEventListener("click", () => {
  clearInterval(timerInterval);
  mediaRecorder.stop();
  audio.pause();
  audio.style.display = "block";
  playButton.style.display = "inline";
});

playButton.addEventListener("click", () => {
  if (!isPlaying) {
    audio.play();
    playButton.innerHTML = '<i class="fas fa-pause"></i>';
    isPlaying = true;
  } else {
    audio.pause();
    playButton.innerHTML = '<i class="fas fa-play"></i>';
    isPlaying = false;
  }
});
saveButton.addEventListener("click", () => {
  const recordingName = window.prompt(
    "Please enter the name for this recording:"
  );

  if (recordingName) {
    const blob = new Blob(chunks, {
      type: "audio/wav",
    });
    const formData = new FormData();
    formData.append("audio", blob, recordingName + ".wav");
    formData.append("recordingName", recordingName);

    fetch("save_audio.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        alert("Audio saved to the database.");
      })
      .catch((error) => {
        console.error("Error saving audio to the database:", error);
      });
  } else {
    alert("Please enter a valid name for the recording.");
  }
});

deleteButton.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete this recording?")) {
    chunks = [];
    audio.removeAttribute("src");
    audio.style.display = "none";
    deleteButton.style.display = "none";
    playButton.style.display = "none";
    location.reload();
  }
});
