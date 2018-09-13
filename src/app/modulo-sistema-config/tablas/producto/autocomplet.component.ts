import { Component, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ad-autocomplet',
  host: {
    '(document:click)': 'handleClick($event)',
  },
  template: `
  <div class="container" >
            <div class="input-field col s12">
              <label for="country">Categoria</label>
              <input ng id="country" type="text"  class="validate filter-input" [(ngModel)]=query (keyup)="filter()">
             
            </div>

            <div class="suggestions" *ngIf="this.filteredList.length > 0" >
                <ul *ngFor="let item of filteredList" >
                    <li >
                        <a (click)="select(item)"> {{ item.dsccategoria }} </a>
                    </li>
                </ul>
            </div>
  </div>  	
  
  `
  ,
  styleUrls: ['./autocomplet.component.css']
})
export class AutocompletComponent implements OnInit {
  
  @Input()
  public items:any;

  @Input()
  public field:string;

  @Output()
  completeMethod :EventEmitter<any> = new EventEmitter<any>();
  
  public query = '';
  public elementRef;
  public item:any;

  public filteredList  = [];

  constructor(myElement: ElementRef) {
    this.elementRef = myElement;
  }

  ngOnInit() {
  
  }

  ngOnChanges(e){
    
    this.filteredList = this.items==undefined?[]:this.items;
  }

  select(item) {
  
    this.item = item;
    this.query = item.dsccategoria ;
    this.filteredList = [];
  }

  filter() {
    if (this.query !== "") {
      this.completeMethod.emit(this);

      /*
      this.filteredList = this.items.filter(function (el) {
        return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
      }.bind(this)); 
      */
    } else {
      this.filteredList = [];
    }
  }

  handleClick(event) {
   
    var clickedComponent = event.target;
    var inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if (!inside) {
      this.filteredList = [];
    }
  }

}
