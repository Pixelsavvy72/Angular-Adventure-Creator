import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { PageService } from "../pages/page.service";
import { Page } from "../pages/page.model";
import 'rxjs/Rx';
import { AuthService } from "../auth/auth.service";


@Injectable()
export class DataStorageService {
  constructor(private http: Http,
              private pageService: PageService,
              private authService: AuthService) {}

  savePages() {
    const token = this.authService.getToken();
    return this.http.put('https://youradventure-ebeeb.firebaseio.com/dive.json?auth=' + token, this.pageService.getPages());
  }

  fetchPages() {
    // const token = this.authService.getToken();
    this.http.get('https://youradventure-ebeeb.firebaseio.com/dive.json')
      .map(
        (response: Response) => {
          const pages: Page[] = response.json();
          console.log(response);
          return pages;
        }
      )
      .subscribe(
        (pages: Page[]) => {
          this.pageService.setPages(pages);
        }
      );
  }

}
