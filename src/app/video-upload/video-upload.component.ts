import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Video } from '../models/video';
import { VideoServiceService } from '../services/video-service.service';

@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.css']
})
export class VideoUploadComponent implements OnInit {
  form!: FormGroup;
  imagePreview!: string;
  videoFile!: File;
  url!: string;
  format!: string;
  userId!: number;
  videoFormatError!: string;
  uploadError!: string;
  description = new FormControl('', [Validators.required]);
  videoInp = new FormControl('', [Validators.required]);
  title = new FormControl('', [Validators.required, Validators.minLength(3)]);

  constructor(private videoService: VideoServiceService,
    public dialogRef: MatDialogRef<VideoUploadComponent>,) { }

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userId'));
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      description: new FormControl(null, { validators: [Validators.required] }),
      video: new FormControl(null, { validators: [Validators.required] })
    });
  }

  upload() {
    var video: Video;
    if (this.format == 'video') {
      this.videoService.uploadVideos(this.videoFile, this.userId).subscribe(res => {
        if (res != null && res.data != null) {
          video = res.data;
          video.title = this.title.value;
          video.description = this.description.value;
          video.size = this.videoFile.size;
          this.videoService.updateVideo(video, res.data.id).subscribe(res => {
            if (res != null && res.data != null) {
              video = res.data;
            }
            else {
              this.uploadError = "Uploading the video failed. Please try Again";
            }
          })
          this.dialogRef.close();
        }
        else {
          this.uploadError = "Uploading the video failed. Please try Again";
        }
      }, error => {
        this.uploadError = "Uploading the video failed. Please try Again";
      })
    }
    else {
      this.videoFormatError = "Only MP4 files accepted."
    }

  }

  onSelectFile(event: any) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      this.videoFile = file;
      console.log("file :", file);

      if (this.videoFile.type != 'video/mp4') {
        this.videoFormatError = "Only MP4 files accepted";
        return;
      }
      else{
        this.videoFormatError = "";
      }
      var reader = new FileReader();
      reader.readAsDataURL(file);
      if (file.type.indexOf('video') > -1) {
        this.format = 'video';
      }
      reader.onload = (event) => {
        this.url = <string>(<FileReader>event.target).result;
      }
    }
  }

}
