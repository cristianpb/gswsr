import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'ngx-moment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TweetComponent } from './tweet/tweet.component';
import { CleanTweetPipe } from './clean-tweet.pipe';
import { PostInstaComponent } from './post-insta/post-insta.component';
import { DocumentsComponent } from './documents/documents.component';
import { CleanInstaPipe } from './clean-insta.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TweetComponent,
    CleanTweetPipe,
    PostInstaComponent,
    DocumentsComponent,
    CleanInstaPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MomentModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
