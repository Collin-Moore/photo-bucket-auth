import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import 'firebase/storage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MdAutocompleteModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdDialogModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdRadioModule,
  MdRippleModule,
  MdSelectModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule
} from '@angular/material';
import { SigninComponent } from './+signin/signin.component';
import { MainComponent } from './+main/main.component';
import { PhotodetailComponent } from './+photodetail/photodetail.component';
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./services/auth.guard";
import { PhotoService } from "./services/photo.service";
import { PhotoDisplayCardComponent } from './photo-display-card/photo-display-card.component';
import { PhotoDialogComponent } from './photo-dialog/photo-dialog.component';

export const MaterialModules = [
  MdAutocompleteModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdDialogModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdRadioModule,
  MdRippleModule,
  MdSelectModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule,
];

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    MainComponent,
    PhotodetailComponent,
    PhotoDisplayCardComponent,
    PhotoDialogComponent
  ],
  entryComponents: [
    PhotoDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    BrowserAnimationsModule,
    MaterialModules,
    FlexLayoutModule,
    FormsModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    PhotoService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
