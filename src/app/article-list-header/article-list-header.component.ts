import { Component, OnInit } from '@angular/core';

declare var jQuery:any;

@Component({
  selector: 'app-article-list-header',
  templateUrl: './article-list-header.component.html',
  styleUrls: ['./article-list-header.component.css']
})
export class ArticleListHeaderComponent implements OnInit {

  private currentFilter: string = 'Time';
  private sortDirection: number = 1;

  constructor() { }

  changeDirection(){
    // update the direction
    this.sortDirection = this.sortDirection * -1;
    this._updateSort();
  }

  changeSort(filter: string){
    //update the sorting
    if(filter === this.currentFilter){
      this.changeDirection();
    }else{
      this.currentFilter = filter;
      this._updateSort();
    }
  }


  _updateSort(){

  }

  ngOnInit() {

  }

}
