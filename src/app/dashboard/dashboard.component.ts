import { Component, OnInit } from '@angular/core';
import { BookmarkService } from '../services/bookmark.service';
import { Bookmark } from '../services/bookmark';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private bookmarkService: BookmarkService) {}

  bookmarks: Bookmark[] = [];

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.bookmarkService.getBookmarks().subscribe(bookmarks => (this.bookmarks = bookmarks.slice(1, 5)));
  }
}
