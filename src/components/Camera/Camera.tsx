import * as React from 'react';
import { cameraInitializer } from '../../utils/cameraInitializer';
import { getCurrentPosition } from '../../utils/getCurrentPosition';
import CameraEnhanceIcon from "@material-ui/icons/CameraEnhance";
import './Camera.scss'
import useStyles from './useStyles';
import { Link, IconButton } from '@material-ui/core';
import PostImageAPI from '../../service/PostImageAPI';
import PostImageRequest from '../../utils/PostImageRequest';
import withData from '../HOC/withData';
import withAuthRestAPI, { AuthRestAPI } from '../HOC/withAuthRestAPI';
import { withRouter } from 'react-router-dom';
import { AuthState } from '../../redux/Auth/types';


interface CameraI extends AuthRestAPI, AuthState {
    history: any
}

const Camera = (props: CameraI) => {
    const [camera, setCamera] = React.useState("mediaDevices" in navigator);
    const videoRef = React.useRef(null);
    const canvasRef = React.useRef(null);
    const fileRef = React.useRef(null);

    const [image, setImage] = React.useState(null);
    const [latitude, setLatitude] = React.useState(0);
    const [longitude, setLongitude] = React.useState(0);
    const [description, setDescription] = React.useState("");
    const postImageAPI: PostImageAPI = new PostImageAPI();

    const makePhoto = () => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d")
            .drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        video.srcObject.getVideoTracks().forEach((track: any) => track.stop());
        setImage(canvas.toDataURL());
        setCamera(false);
    }

    const handleFile = () => {
        const img = fileRef.current.files[0];
        setImage(URL.createObjectURL(img));
    }

    const registerPushNotification = () => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready
                .then(reg => {
                    reg.showNotification('Hello form PWA', {
                        body: 'Post was sucessfuly upload'
                    })
                })
                .catch(err => console.log(err))
        }
    }

    const makePost = () => {
        const postImageRequest: PostImageRequest = new PostImageRequest(props.bearerToken, image, description, `${latitude}N+${longitude}E`);
        postImageAPI.uploadUserPostImage(postImageRequest)
            .then(result => {
                registerPushNotification();
                props.history.push("/");
            });

    }


    React.useEffect(() => {
        if (props.bearerToken == null) {
            props.history.push("/login");
        }
        if (camera) {
            cameraInitializer(videoRef);
        }
        getCurrentPosition(setLatitude, setLongitude);
        return () => {
            if (camera || videoRef.current) {
                videoRef.current?.srcObject?.getVideoTracks().forEach((track: any) => track.stop())
            }
        }
    }, [])

    const classes = useStyles();

    return (
        <section className="camera-wrapper">
            < img
                src={image} className="player" />
            {
                camera && (
                    <>
                        <video ref={videoRef} autoPlay className="player" />
                        <canvas ref={canvasRef} id="canvas" />
                        <button className="root-btn" onClick={makePhoto}>
                            SHOUT
                        </button>
                    </>
                )
            }
            {
                !camera && (
                    <div>
                        <div className="input-btn">
                            <input type="file" ref={fileRef} onChange={handleFile} accept="image/*" id="input-image" />
                            <label htmlFor="input-image">
                                <IconButton color="primary" component="span">
                                    <CameraEnhanceIcon />
                                </IconButton>
                            </label>
                        </div>
                    </div>
                )
            }
            <div className="text-roor">
                <p className={classes.root}>
                    <Link href={`https://www.google.com.ua/maps/place/${latitude}N+${longitude}E`} variant="body2" target="_black">
                        Latitude: {latitude} °,
                        <br />
                        Longitude: {longitude} °
                    </Link>
                </p>
                <textarea className="text-area" value={description} placeholder="Description..." onChange={(evt) => setDescription(evt.target.value)} />
            </div>
            <button className="root-btn" onClick={makePost}>
                New Post
            </button>
        </section>
    )
};

export default withRouter(
    withAuthRestAPI(
        withData(
            (Camera)
        )
    )
);