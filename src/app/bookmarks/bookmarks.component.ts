import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// Mock no longer needed
// import { BOOKMARKS } from '../services/mock-bookmarks';
import { Bookmark } from '../services/bookmark';
import { BookmarkService } from '../services/bookmark.service';

// for angular infite Scroll
import { IDatasource } from 'ngx-ui-scroll';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {
  bookmarks: Bookmark[];

  @ViewChild('bookmarkTitle') bookmarkTitle: ElementRef;
  @ViewChild('bookmarkDescription') bookmarkDescription: ElementRef;
  @ViewChild('bookmarkUrl') bookmarkUrl: ElementRef;

  constructor(private bookmarkService: BookmarkService, private http: HttpClient) {}

  ngOnInit() {
    // TO-DO uncomment this to get it working again
    // this.getBookmarks();
  }

  private bookmarksUrl = 'http://localhost:8080/bookmarks';

  public datasource: IDatasource = {
    // get: (offset, limit, success) => {
    //   console.log('datasource fetching data');
    //   this.http.get(`${this.bookmarksUrl}?offset=${offset}&limit=${limit}`).subscribe(data => {
    //     console.log(data['content']);
    //     success(data['content']);
    //   });
    // },
    // settings: {
    //   bufferSize: 20
    // }
    get: (index, count, success) => {
      console.log('index b4 modification is ' + index);
      if (index < 0) {
        index = Math.abs(index);
      }
      index = Math.floor(index / 10);
      console.log('index is ' + index);
      console.log('count is ' + count);

      const start = Math.max(index, 0); // no negative indexes
      const end = start + count;
      const startPage = Math.floor(start / count);
      const endPage = Math.ceil(end / count);
      this.http.get(`${this.bookmarksUrl}?offset=${index}&limit=${count}`).subscribe(data => {
        const finaldata = data['content'].slice(start - startPage * count, start - startPage * count + count);
        success(data['content']);
      });
    },
    settings: {
      bufferSize: 10,
      infinite: true
    }
  };

  // getting data and setting it to bookmarks, so list can be displayed
  // called in OnInit
  getBookmarks(): void {
    this.bookmarkService.getBookmarks().subscribe(bookmarks => (this.bookmarks = bookmarks));
  }

  // TODO add validation and if things arent changed
  // gonna assume things are entered as desired
  add(title, description, url): void {
    title = title.trim();
    if (!title) {
      return;
    }
    this.bookmarkService.addBookmark({ title, description, url } as Bookmark).subscribe(hero => {
      this.bookmarks.push(hero);
    });
    // set values back to empty
    this.bookmarkTitle.nativeElement.value = '';
    this.bookmarkDescription.nativeElement.value = '';
    this.bookmarkUrl.nativeElement.value = '';
  }
}
