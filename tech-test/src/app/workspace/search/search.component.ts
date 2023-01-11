import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @ViewChild('inputElement', { static: true }) inputElement: ElementRef;
  @Output() outPutKeyword = new EventEmitter<string>();
  searchInfo:any;
  keyword = new FormControl(null);
  unsubscribe$ = new Subject<void>();
  key:string;

  constructor() { }

  ngOnInit() {
    this.keyword.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((keyword) => this.outPutKeyword.emit(keyword));
  }

  onSearch(inputValue): void {
    console.log("inputValue",inputValue)
    // const options = {
    //   value:  inputValue.target.value,
    //   name: 'keyword'
    // }
    this.searchInfo = inputValue;
    // this.keyword.patchValue(this.searchInfo.value);
    this.key=inputValue.target.value
    this.outPutKeyword.emit(this.key);
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}


