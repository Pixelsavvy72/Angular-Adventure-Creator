import { NgModule } from "@angular/core";
import { HeaderComponent } from "../core/header/header.component";
import { AppRoutingModule } from "../app-routing.module";
import { PageService } from "app/pages/page.service";
import { DataStorageService } from "app/shared/data-storage.service";
import { AuthService } from "app/auth/auth.service";
import { AuthGuard } from "app/auth/auth-guard.service";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent
  ],
  providers: [
    PageService,
    DataStorageService,
    AuthService,
    AuthGuard
  ]
})

export class CoreModule {}
