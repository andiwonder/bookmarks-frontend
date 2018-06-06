import { Component, OnInit, Input } from '@angular/core';
import { Bookmark } from '../services/bookmark';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

import { BookmarkService } from '../services/bookmark.service';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];

  test = [];

  @Input() bookmark: Bookmark;

  constructor(private route: ActivatedRoute, private bookmarkService: BookmarkService, private location: Location) {}

  ngOnInit(): void {
    this.getBookmark();
  }

  getBookmark(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.bookmarkService.getBookmark(id).subscribe(bookmark => (this.bookmark = bookmark));
  }

  save(): void {
    this.bookmarkService.updateBookmark(this.bookmark).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our fruit
    this.test.push({ name: value.trim() });
    console.log('adding to test');

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
}
