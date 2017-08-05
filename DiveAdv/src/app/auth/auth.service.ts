import * as firebase from 'firebase';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { PageService } from "../pages/page.service";

@Injectable()
export class AuthService {

  token: string;

  constructor(private router: Router,
              private pageService: PageService) {}

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
        error => console.log(error)
      )
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          // TODO: Return to last visited page after loggin in.
          // this.router.navigate(['/story/' + this.pageService.currentPage])
          this.router.navigate(['/story/'])
          firebase.auth().currentUser.getToken()
            .then(
              (token: string) => this.token = token
            )
        }
      )
      .catch(
        error => console.log(error)
      );
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

  //TODO: Give user a warning and retry if token expires.
  getToken() {
    firebase.auth().currentUser.getToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }
}
