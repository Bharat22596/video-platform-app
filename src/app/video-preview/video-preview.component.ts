import { Component, OnInit } from '@angular/core';
import { Video } from '../models/video';
import { VideoResponse } from '../models/video-response';
import { VideoServiceService } from '../services/video-service.service';

@Component({
  selector: 'app-video-preview',
  templateUrl: './video-preview.component.html',
  styleUrls: ['./video-preview.component.css']
})
export class VideoPreviewComponent implements OnInit {

  videos :VideoResponse[]=[];
  userId:number = Number(localStorage.getItem('userId'));
  constructor(private videoService:VideoServiceService) { }

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userId'));
    console.log(this.userId);
    
    this.videoService.getVideos(this.userId).subscribe(res=>{
      if(res!=null){
        console.log("response : ",res);
        this.videos= res.data;
        for(let u of res.data){
          u.videoURL = 'data:video/mp4;base64,'+u.videoBytes;
        }
        console.log(this.videos.length);
      }
    })
  }

}
