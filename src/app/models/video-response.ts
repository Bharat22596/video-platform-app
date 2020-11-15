import { Video } from './video';

export class VideoResponse{
    videoDetails?:Video;
    videoBytes?:any;
    videoURL?:string;

    constructor(){
        this.videoURL='data:video/mp4;base64,'+this.videoBytes;
    }

}