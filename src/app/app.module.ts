import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { HttpModule } from '@angular/http';
import {Routes,Router,RouterModule} from '@angular/router';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {Select2Module} from 'ng2-select2';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './service/auth.service';
import { HiddenDirective } from './Directives/mydirective.directive';
import { DirComponent } from './dir/dir.component';
import { RegisterComponent } from './register/register.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { ProfileviewComponent } from './profileview/profileview.component';
//import { SharedModule } from './shared/shared.module';

const approuting :Routes=[
  {path:'' ,component:HomeComponent},
  {path:'home' ,component:HomeComponent},
  {path:'signin', component:SigninComponent},
  {path:'signup', component:SignupComponent},
  {path:'register/:edit', component:RegisterComponent},
  {path:'directive', component:DirComponent},
  {path:'autocomplete', component:AutocompleteComponent},
  {path:'profileview', component:ProfileviewComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    HiddenDirective,
    DirComponent,
    RegisterComponent,
    AutocompleteComponent,
    ProfileviewComponent 
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
   //SharedModule,
    RouterModule.forRoot(approuting)   
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
  
})

export class AppModule { }
