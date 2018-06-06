import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // animations
import { MatCardModule, MatGridListModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppComponent } from './app.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

// Infinite scrolling
import { UiScrollModule } from 'ngx-ui-scroll';

@NgModule({
  declarations: [AppComponent, BookmarksComponent, BookmarkComponent, DashboardComponent],
  imports: [
    BrowserModule,
    FormsModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatMenuModule,
    UiScrollModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    AppRoutingModule,
    MatInputModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
