import {Component, Input, OnInit} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';


@Component({
  templateUrl: 'custom-enum-render.component.html',
  selector: 'app-custom-enum-render'
})
export class CustomEnumRenderComponent implements ViewCell, OnInit {


  @Input() value: string;
  @Input() rowData: any;

  ngOnInit() {
  }

}
