import { Injectable, OnInit } from '@angular/core';
import { Bookmark } from './bookmark';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  private bookmarksUrl = 'http://localhost:8080/bookmarks'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getBookmarks(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(this.bookmarksUrl).pipe(
      // TODO go back and add log
      // tap(heroes => console.log(`fetched heroes`)),
      catchError(this.handleError('getBookmarks', []))
    );
  }

  getBookmark(id: number): Observable<Bookmark> {
    const url = `${this.bookmarksUrl}/${id}`;
    return this.http.get<Bookmark>(url).pipe(
      // TDO go back and add log
      // tap(_ => this.log(`fetched bookmark id=${id}`)),
      catchError(this.handleError<Bookmark>(`getBookmark id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateBookmark(bookmark: Bookmark): Observable<any> {
    const url = `${this.bookmarksUrl}/${bookmark.id}`;
    console.log('updateBookmark');
    console.log(url);
    return this.http.put(url, bookmark, this.httpOptions).pipe(
      // tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateBookmark'))
    );
  }

  addBookmark(bookmark: Bookmark): Observable<Bookmark> {
    return this.http.post<Bookmark>(this.bookmarksUrl, bookmark, this.httpOptions).pipe(
      // tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Bookmark>('addBookmark'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
