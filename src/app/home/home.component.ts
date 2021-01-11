import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faArrowDown, faArrowUp, faComments } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 
  constructor(private httpClient:HttpClient) {
  }

  ngOnInit(): void {
  }

}
