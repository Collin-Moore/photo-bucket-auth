import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from "./+signin/signin.component";
import { PhotodetailComponent } from "./+photodetail/photodetail.component";
import { MainComponent } from "./+main/main.component";

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'photodetail', component: PhotodetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
