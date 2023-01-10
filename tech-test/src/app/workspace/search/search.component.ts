import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  onSearch(inputValue): void {
    const options = {
      value:  inputValue.target.value,
      name: 'keyword'
    }
    // this.seachInfo = options;
    // this.keyword.patchValue(this.seachInfo.value);
  }
}
