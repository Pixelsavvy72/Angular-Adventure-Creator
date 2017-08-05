import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Page } from "../pages/page.model";
import { PageService } from "../pages/page.service";
import { DataStorageService } from "../shared/data-storage.service";
import { Subscription } from "rxjs/Subscription";


@Component({
  selector: 'app-page',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PageComponent implements OnInit {
  // @Input() currentPage: {
  //                         pageNumber: number,
  //                         pageText: string,
  //                         imagePath: string,
  //                         choices?: object[]
  //                       };


  // pageChanged = new EventEmitter<Page>();

  currentPageNumber = 0;

  constructor(private myPageService: PageService,
              private dataStorageService: DataStorageService,
              private route: ActivatedRoute,
              private router: Router) {  }

  ngOnInit() {
    this.dataStorageService.fetchPages();

  }

  onLoadBook() {
    this.dataStorageService.fetchPages();
    this.myPageService.currentPageChanged.emit(1);
    this.currentPageNumber = 1;
    this.router.navigate(['/story', this.currentPageNumber], {relativeTo: this.route});
  }




}
