import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookmarkComponent } from './bookmark/bookmark.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'bookmarks', component: BookmarksComponent },
  { path: 'detail/:id', component: BookmarkComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
