import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sortable',
  templateUrl: './sortable.component.html',
  styleUrls: ['./sortable.component.css']
})
export class SortableComponent implements OnInit {

  @Input() columns: any[];
  @Input() data: any[];
  @Input() sort: any;

  @Input() fromDate: date =  new Date(2010, 1, 4);
  @Input() toDate: date ;

  constructor(){
  	this.toDate = new Date(2016, 1, 4);
  }

  selectedClass(columnName): string{
    return columnName == this.sort.column ? 'sort-' + this.sort.descending : false;
  }
  
  changeSorting(columnName): void{
    var sort = this.sort;
    if (sort.column == columnName) {
      sort.descending = !sort.descending;
    } else {
      sort.column = columnName;
      sort.descending = false;
    }
  }
  
  convertSorting(): string{
    return this.sort.descending ? '-' + this.sort.column : this.sort.column;
  }

}
