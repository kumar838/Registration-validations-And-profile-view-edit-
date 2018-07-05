import {Component, ViewChild, ElementRef, AfterViewInit,OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { countries } from '../countries';

 declare var jQuery: any;
declare var $ :any;
//declare var $:JQueryStatic;


@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {

  @ViewChild('selectElem') el:ElementRef;
  items = ['First', 'Second', 'Third'];
  selectedValue = 'Second';

  // ngAfterViewInit() {
  //     $(this.el.nativeElement)
  //         .chosen()
  //         .on('change', (e, args) => {
  //             this.selectedValue = args.selected;
  //         });
  // }


  typeahead: FormControl = new FormControl();
  countries: string[] = countries;
  suggestions: string[] = [];


  constructor() { }
  autosuggest() {
    this.suggestions = this.countries
      .filter(c => c.startsWith(this.typeahead.value))
      .slice(0, 5);
  }

  ngOnInit() {
 
  }





}
