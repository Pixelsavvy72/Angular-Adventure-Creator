import { NgModule } from "@angular/core";
import { SigninComponent } from "../auth/signin/signin.component";
import { SignupComponent } from "../auth/signup/signup.component";
import { FormsModule } from "@angular/forms";
import { AuthRoutingModule } from "../auth/auth-routing.module";

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent
  ],
  imports: [
    FormsModule,
    AuthRoutingModule
  ]
})

export class AuthModule {}
