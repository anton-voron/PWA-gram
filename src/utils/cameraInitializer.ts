
export function cameraInitializer(videoRef: any) {
    // check if mediaDevices is avaliable
    if (!("mediaDevices" in navigator)) {
        (navigator as any).mediaDevices = {};
    };

    if (!("getUserMedia" in navigator.mediaDevices)) {
        (navigator.mediaDevices as any).getUserMedia = (constraints: MediaStreamConstraints): Promise<MediaStream> => {
            let getUserMedia = (navigator as any).webkitGetUserMedia || (navigator as any).mozGetUserMedia;
            if (!getUserMedia) {
                return Promise.reject(
                    new Error("getUserMedia is not implemented in this browser")
                );
            }

            return new Promise((resolve, reject) => {
                getUserMedia.call(navigator, constraints, resolve, reject);
            });
        }
    }

    navigator.mediaDevices.getUserMedia({ audio: false, video: true })
        .then(stream => {
            const video = videoRef.current;
            if ("srcObject" in video) {
                video.srcObject = stream;
            } else {
                video.src = window.URL.createObjectURL(stream);
            }
            video.onloadedmetadata = function (event: Event) {
                video.play();
            }
        })
        .catch(error => console.log(error.name + ": " + error.message));
}