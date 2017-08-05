import { NgModule } from "@angular/core";
import { PageDetailComponent } from "../pages/page-detail/page-detail.component";
import { EditPageComponent } from "../pages/edit-page/edit-page.component";
import { PageComponent } from "../pages/pages.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { PagesRoutingModule } from "../pages/pages-routing.module";

@NgModule({
  declarations: [
    PageComponent,
    EditPageComponent,
    PageDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PagesRoutingModule
  ]
})

export class PagesModule {}
