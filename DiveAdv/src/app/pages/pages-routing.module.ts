import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { PageComponent } from "../pages/pages.component";
import { EditPageComponent } from "../pages/edit-page/edit-page.component";
import { PageDetailComponent } from "../pages/page-detail/page-detail.component";
import { AuthGuard } from "../auth/auth-guard.service";

const pagesRoutes: Routes = [
  { path: 'story', component: PageComponent, children: [
    // Changed below so that one form can be used for NEW and EDIT
    // { path: 'new', component: NewPageComponent },
    { path: 'new', component: EditPageComponent},
    // { path: ':pageNumber', component: PageDetailComponent, canActivate: [AuthGuard] },
    { path: ':pageNumber', component: PageDetailComponent },
    // { path: ':pageNumber/edit', component: EditPageComponent, canActivate: [AuthGuard] }
    { path: ':pageNumber/edit', component: EditPageComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ]
})

export class PagesRoutingModule {}
