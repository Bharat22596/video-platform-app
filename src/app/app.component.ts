import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'video-platform-app';

  constructor(private route: ActivatedRoute,
    private router: Router){
      
    }
  ngOnInit(): void {
    // this.router.navigate(['/login']);
  }

}
