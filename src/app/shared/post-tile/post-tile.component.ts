import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowDown, faArrowUp, faComments } from '@fortawesome/free-solid-svg-icons';
import { PostModel } from '../post-model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PostTileComponent implements OnInit {

  faComments = faComments;
  @Input() posts : PostModel[];
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  

  constructor(private router: Router) { 
    
  }

  ngOnInit(): void {
  }

  goToPost(id:number): void{
    this.router.navigateByUrl('/view-post/'+id);
  }

}
