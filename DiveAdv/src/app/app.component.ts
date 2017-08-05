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
    // Get and set image when page changes.
    this.myPageService.currentPageChanged.subscribe(
      (currentPageNumber: number) => this.currentImage =
        this.myPageService.getPage(currentPageNumber).imagePath
    )
  }

    ngOnInit() {
      this.currentImage = "http://via.placeholder.com/300x200";
      firebase.initializeApp({
        apiKey: "AIzaSyDvl6DFU3KomLIfLy3GKdYXVmQlbGlkggY",
        authDomain: "youradventure-ebeeb.firebaseapp.com"
      });

  }


}

