interface ArticleJSON{
  title: string;
  description: string;
  url: string;
  votes: number;
  publishedAt: string;
  author: string;
  urlToImage: string;
}

export class Article {

  //--- Method-1
  // public title: string;
  // public description: string;
  //
  // constructor(aTitle: string, aDescription: string){
  //   this.title = aTitle;
  //   this.description = aDescription;
  // }

  public publishedAt: Date;

  static fromJSON(json: ArticleJSON): Article{
    let article =
     Object.create(Article.prototype);
     return Object.assign(article, json, {
       votes: json.votes? json.votes : 0,
       imageUrl: json.urlToImage,
       publishedAt: json.publishedAt?
        new Date(json.publishedAt): new Date()

     });
  }

  //-- Method-2, automatically set by typescript
  constructor(
    public title: string,
    public description: string,
    public imageUrl: string,
    public votes?: number
  ){
    this.votes = votes || 0;
    this.publishedAt = new Date();
  }

  // public date(): Date{
  //   return new Date();
  // }

  public voteUp(): void{
    this.votes = this.votes + 1;
  }

  public voteDown(): void{
    this.votes = this.votes - 1;
    if(this.votes<0){
      //alert('Not Allowed');
      //this.votes = 0;
    }

  }

}
