let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let start_button = document.querySelector("#start-record");
let stop_button = document.querySelector("#stop-record");

let camera_stream = null;
let media_recorder = null;
let blobs_recorded = [];

camera_button.addEventListener("click", async function () {
  camera_button.style.display="none"; 
  try {
    camera_stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
  } catch (error) {
    alert(error.message);
    return;
  }

  video.srcObject = camera_stream;
  camera_button.style.display="block";
  video.style.display = "block";
  start_button.style.display = "block";
});

start_button.addEventListener("click", async function () {
    try {
        camera_stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
      } catch (error) {
        alert(error.message);
        return;
      }
    
      video.srcObject = camera_stream;
      video.style.display = "block";
      start_button.style.display = "block";
  media_recorder = new MediaRecorder(camera_stream, { mimeType: "video/webm" });
  start_button.style.display = "none";

  media_recorder.addEventListener("dataavailable", function (e) {
    blobs_recorded.push(e.data);
  });

  media_recorder.addEventListener("stop", function () {
    let video_local = URL.createObjectURL(
      new Blob(blobs_recorded, { type: "video/webm" })
    );

    stop_button.style.display = "none";
  });

  media_recorder.start(1000);

  start_button.style.display = "none";
  stop_button.style.display = "block";
});

stop_button.addEventListener("click", function () {
  media_recorder.stop();
});

