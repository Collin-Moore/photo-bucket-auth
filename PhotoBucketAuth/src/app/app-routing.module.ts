import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from "./+signin/signin.component";
import { PhotodetailComponent } from "./+photodetail/photodetail.component";
import { MainComponent } from "./+main/main.component";
import { AuthGuard } from "./services/auth.guard";

const routes: Routes = [
  { path: '', component: MainComponent, canActivate:[AuthGuard] },
  { path: 'signin', component: SigninComponent },
  { path: 'photo', component: PhotodetailComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
