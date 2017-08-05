import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


// ADD ROUTES

const appRoutes: Routes = [
  { path: '', redirectTo: '/story', pathMatch: 'full' },
  // { path: 'story', component: PageComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
