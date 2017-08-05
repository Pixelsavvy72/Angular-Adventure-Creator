import { Component, OnInit, Output, Input, EventEmitter, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Page } from "../../pages/page.model";
import { PageService } from "../../pages/page.service";
import { DataStorageService } from "../../shared/data-storage.service";
import { Response } from '@angular/http';
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: 'app-page-detail',
  templateUrl: './page-detail.component.html',
  styleUrls: ['./page-detail.component.css']
})
export class PageDetailComponent implements OnInit {

  @Input() currentPage: {
                          pageNumber: number,
                          pageText: string,
                          imagePath: string,
                          choices?: object[]
                        };

  currentPageNumber: number;
  pageNumber: number;

  pageChanged = new EventEmitter<Page>();
  constructor(private myPageService: PageService,
              private dataStorageService: DataStorageService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    this.route.params
      .subscribe(
        (params: Params) => {
;
          // 1. Store id from url in above variable.
          // Needs a + because params returns a string, even though id is a number
          console.log(params);
          this.pageNumber = +params['pageNumber'];
          //Check that the object is being retreived.
          console.log("Trying to get the page: ")
          console.log(this.myPageService.getPage(this.pageNumber))
          console.log("END");
          // 2. Fetch the page specified by page number.
          this.currentPage = this.myPageService.getPage(this.pageNumber);
        }
      );
  }

  onGoToPage(pageNumber) {
    this.pageNumber = pageNumber;
    this.currentPage = this.myPageService.getPage(pageNumber);
    // Set the page number in the page service to be shared.
    this.myPageService.currentPage = this.pageNumber;
    this.myPageService.currentPageChanged.emit(pageNumber);
    this.router.navigate(['/story', this.pageNumber], {relativeTo: this.route});
  }

  onEditPage() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onNewPage() {
    this.router.navigate(['/story/new']);
  }

  onDeletePage() {
    this.myPageService.deletePage();
    this.dataStorageService.savePages()
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );
    console.log("Pages deleted!");
    this.onGoToPage(1);
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

}
