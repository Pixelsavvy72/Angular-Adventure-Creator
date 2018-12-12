import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Page } from "./pages/page.model";
import { PageService } from "./pages/page.service";

import * as firebase from 'firebase';
import { DataStorageService } from "app/shared/data-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentImage: string;

  constructor(private myPageService: PageService,
              private dataStorageService: DataStorageService) {

  }

    ngOnInit() {
    // Get and set image when page changes.
    this.myPageService.currentPageChanged.subscribe(
      (currentPageNumber: number) => this.currentImage =
        this.myPageService.getPage(currentPageNumber).imagePath
    );
  
      this.currentImage = "http://via.placeholder.com/300x200";
      // TODO: Move this into ENV for live version.
      firebase.initializeApp({
        apiKey: "****************************",
        authDomain: "*************************************"
      });

  }


}

