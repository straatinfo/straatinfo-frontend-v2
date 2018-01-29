import { Component, OnInit } from '@angular/core';
import { HostActionCreator } from './store/action-creators';

@Component({
  selector: 'app-my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

     constructor(private hostActionCreator: HostActionCreator) {}

    ngOnInit(){
      this.hostActionCreator.GetHosts();
    }
}
