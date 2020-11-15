import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIReference } from '../APIReference';
import { Video } from '../models/video';
import { VideoResponse } from '../models/video-response';

@Injectable({
  providedIn: 'root'
})
export class VideoServiceService {

  constructor(private http:HttpClient) { }

  uploadVideos(file:File, userId:number):Observable<any>{
    const formData:FormData = new FormData();
    formData.append('file', file,file.name);
    var params:any= {'userId':userId}
    return this.http.post<any>(APIReference.UPLOAD_VIDEO,formData,{params:params})
  }

  getVideo(videoId:string,userId:number):Observable<any> {
    var params:any= {'videoId':videoId,'userId':userId}
    return this.http.get<any>(APIReference.GET_VIDEO,{params:params});
  }

  getVideos(userId:number):Observable<any> {
    var params:any= {'userId':userId}
    return this.http.get<any>(APIReference.GET_VIDEOS,{params:params});
  }

  updateVideo(video:Video,videoId:string):Observable<any>{
    var params:any = {'videoId':videoId}
    return this.http.put<any>(APIReference.UPDATE_VIDEO,video,{params:params})
  }
}
