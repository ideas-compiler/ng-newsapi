import { Injectable } from '@angular/core';
import { Article } from './article';
import { Http, URLSearchParams, Response } from '@angular/http';
import { environment } from '../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/**
* [].sort(compare(a, b))
* return value
* 0 == two elements are equal
* 1 == a comes before b
* -1== be comes befor a
*/
interface ArticleSortFn{
  (a: Article, b: Article): number;
}

interface ArticleSortOrderFn{
  (direction: number): ArticleSortFn;
}

@Injectable()
export class ArticleService {

  private _articles: BehaviorSubject<Article[]> =
    new BehaviorSubject<Article[]>([]);

  private _sources: BehaviorSubject<any> =
    new BehaviorSubject<any>([]);

  private _refreshSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('the-next-web');

  private _sortByDirectionSubject:
    BehaviorSubject<number> =
    new BehaviorSubject<number>(1);

  private _sortByFilterSubject:
    BehaviorSubject<any> =
    new BehaviorSubject<any>('Time');

  public sources: Observable<any> = this._sources.asObservable();
  public articles: Observable<Article[]> = this._articles.asObservable();
  public orderedArticles: Observable<Article[]>;


  constructor(
    private _http: Http
  ) {
    this._refreshSubject
      .subscribe(this.getArticles.bind(this));
  }

  public sortBy(
    filter: string,
    direction: number
  ){

  }

  public updateArticles(sourceKey: string): void{
    this._refreshSubject.next(sourceKey);
  }


  public getArticles(sourceKey: string = "the-next-web"): void{
    //--- Get articles from http
    // make the HTTP request
    // convert response into Article class
    // Update our subject
    this._makeHttpRequest('/v1/articles', sourceKey).map(json => json.articles)
      .subscribe( articlesJSON => {
        //console.log(articlesJSON);

        const articles = articlesJSON
          .map( articlejson => Article.fromJSON(articlejson));

          //console.log(articles);
          this._articles.next(articles);

      });
  }

  public getSources(): void{
    this._makeHttpRequest('/v1/sources')
      .map(json => {
        //console.log(json.sources);
        return json.sources;
      })
      .filter(list => list.length > 0)
      .subscribe(this._sources);
  }


  private _makeHttpRequest(
    path: string,
    sourceKey?: string
  ): Observable<any> {

    let params = new URLSearchParams();
    params.set('apiKey', environment.apiKey);
    if( sourceKey && sourceKey!=='' ){
      params.set('source', sourceKey);
    }

    //${baseUrl}/v1/articles?source=the-next-web&sortBy=latest&apiKey=${apiKey}
    return this._http
      .get(`${environment.baseUrl}${path}`, {
        search: params
      })
      .map( (response:Response) => response.json());

  }


  //--- Get articles using promises
  public getArticles2(): Promise<Article[]> {

    let params = new URLSearchParams();
    params.set('apiKey', environment.apiKey);
    params.set('source', 'the-next-web');
    //${baseUrl}/v1/articles?source=the-next-web&sortBy=latest&apiKey=${apiKey}
    return this._http
      .get(`${environment.baseUrl}/v1/articles`, {
        search: params
      })
      .toPromise()
      .then(resp => resp.json())
      .then(json => json.articles)
      /*.then(articles => {
        let list = articles.map(article => new Article(
          article.title,
          article.description,
          article.urlToImage
        ));
        console.log('Json -> ', list);

        return list;
      });*/
      .then(articles => {
        return articles.map(article => Article.fromJSON(article));
      })
      .catch(err => {
        console.log('We got an error: ', err);
      });

  }

  //--- Get Articles using static data, object
  public getArticles1(): Promise<Article[]>{
    // return Promise.resolve([
    //   new Article('Angular 2 screencast', 'Best place to learn the Angular2 with fullstack.io', 5),
    //   new Article('React.js 2.0', 'Facebook library for chat etc', 10),
    //   new Article('Vue.js 2.0', 'Vue.js 2.0', 3)
    // ]);

    return  new Promise(resolve => {

      setTimeout( () => {
        resolve([
          new Article('Angular 2 screencast', 'Best place to learn the Angular2 with fullstack.io', '', 5),
          new Article('React.js 2.0', 'Facebook library for chat etc', '', 10),
          new Article('Vue.js 2.0', 'Vue.js 2.0', '', 3)
        ])
      }, 2000);

    });

  }


  public source(): Observable<any>{
    return;
  }

}
