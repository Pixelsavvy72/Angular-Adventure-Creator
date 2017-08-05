import { Page } from "app/pages/page.model";
import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs/Subject";

export class PageService {
  // Share the current page
  currentPage: number = 1;

  // Notify page to return to when done editing.
  editedPage = new Subject<number>();

  // Notify Ang that a new page is added.
  pageAdded = new EventEmitter<Page[]>();
  // Let's other components know when the page is changed.
  currentPageChanged = new EventEmitter<number>();
  // Used in set pages below
  pagesChanged = new Subject<Page[]>();

  private pages: Page[] = []
  //   new Page(
  //     0,
  //     "",
  //     "../../assets/images/Rd-sam-soffes-divingFins.jpg"
  //   ),
  //   new Page(
  //     1,
  //     "It's Saturday. Your boat, The Pelican, is moored at a marina in Big Pine Key, Florida, where you're currently relaxing in the shade on the deck under an umbrella and drinking some kind of fruity drink which also has an umbrella in it. Suddenly a man in a business suit and breifcase jumps on board. His eyes are wild with fear. 'Please,' he says. 'Please help me!' You hear the sound of squealing tires and see a large, black car turning into the marina parking log.",
  //     "../../assets/images/Rd-sam-soffes-divingFins.jpg",
  //     [
  //       {
  //         choice: "If you cast the lines and head for open water, turn to page 7.",
  //         page: 7
  //       },
  //       {
  //         choice: "If you punch the man in the face and go back to your drink, turn to page 12.",
  //         page: 12
  //       }
  //     ]
  //   ),
  //   new Page(
  //     12,
  //     "You've had enough adventure in your life. You punch him in the face. He falls overboard and you return to your relaxing. You win!",
  //     "../../assets/images/Rd-igor-ovsyannykov-boatRelax.jpg",
  //     [{
  //       choice: null,
  //       page: null
  //     }]
  //   ),
  //   new Page(
  //     7,
  //     "Thanks. I thought I was done for. Those guys mean business, let me tell ya.",
  //     "../../assets/images/Rd-freejpg-14165-Worried.jpg",
  //     [
  //       {
  //         choice: "Agree to help.",
  //         page: 11
  //       },
  //       {
  //         choice: "Evict him from the premesis.",
  //         page: 12
  //       }
  //     ]

  //   )
  // ]

  getPages() {
    return this.pages.slice();
  }

  // Return the new page the requested by app.component.html choices button click
  getPage(pageNumber: number) {
    return this.pages.filter(page => page.pageNumber == pageNumber)[0];
  }

  //TODO: Refactor this mess.
  addPage( page: Page) {
    let pageExists: Boolean = false;
    for(var i=0; i < this.pages.length; i++) {
        if (this.pages[i].pageNumber == page.pageNumber) {
          var warnUser = prompt("Page already exists. Do you wish to overwrite it?\nType 'yes' to overwrite current page or click cancel to go back.");
          if (warnUser && warnUser.toLowerCase() == "yes") {
            this.currentPage = page.pageNumber; // Is this going to cause a problem with the page orders?
            // Call update page to overwrite old page with new values.
            this.updatePage(page);
            pageExists = true;
          }
        }
      }
    if (!pageExists){
      this.pages.splice(2, 0, page);
      this.pagesChanged.next(this.pages.slice());
    }

  }

  setPages(pages: Page[]) {
    this.pages = pages;
    this.pagesChanged.next(this.pages.slice());
  }

  updatePage(newPage: Page) {
    // Get the index of the updated page and...
    let updatedPageLocation = this.findPageIndex();
    // replace the original with the updated page.
    this.pages.splice(updatedPageLocation, 1, newPage);
    this.pagesChanged.next(this.pages.slice());
  }

  deletePage() {
    var warnUser = prompt("Are you sure you want to delete this page?\nType 'yes' to continue, or click cancel to go back.");
    if (warnUser && warnUser.toLowerCase() == "yes") {
      let deletedPageLocation = this.findPageIndex();
      this.pages.splice(deletedPageLocation, 1);
      this.pagesChanged.next(this.pages.slice());
    }
  }

  findPageIndex() {
    for(var i=0; i < this.pages.length; i++) {
      if (this.pages[i].pageNumber == this.currentPage) {
        return i;
      }
    }
  }

}



