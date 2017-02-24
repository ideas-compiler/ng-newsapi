
import { Component, ViewEncapsulation } from '@angular/core';

declare const jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  ngOnInit(){
    jQuery("#menu-toggle").click(function(e) {
        e.preventDefault();
        jQuery("#wrapper").toggleClass("toggled");
    });
  }

}
