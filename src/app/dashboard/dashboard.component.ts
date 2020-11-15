import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoPreviewComponent } from '../video-preview/video-preview.component';
import { VideoUploadComponent } from '../video-upload/video-upload.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {

  @ViewChild(VideoPreviewComponent) preview!: VideoPreviewComponent;
  isOpen: boolean = true;
  userId:number = Number(localStorage.getItem('userId'));
  status: string = 'dashboard';
  AnyContent :boolean = false;
  constructor(private route: ActivatedRoute, private router: Router,public dialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.userId = Number(localStorage.getItem('userId'));
    console.log(this.preview);
    this.AnyContent = (this.preview.videos.length>0)
    console.log(this.AnyContent);
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  toggleFunction(str: string) {
    console.log("Check : " + str);
    this.status = str;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(VideoUploadComponent, {
      minWidth: '1000px',
      minHeight : '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Upload Completed');
      this.preview.ngOnInit();
    });
  }

  check() {
    console.log("checked");
    console.log(this.preview);
    
  }

  logout() {
    console.log("its logged out");
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
