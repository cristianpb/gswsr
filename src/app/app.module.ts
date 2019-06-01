import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'ngx-moment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TweetsComponent } from './tweets/tweets.component';
import { TweetComponent } from './tweet/tweet.component';
import { CleanTweetPipe } from './clean-tweet.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TweetsComponent,
    TweetComponent,
    CleanTweetPipe
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
