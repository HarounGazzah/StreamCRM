import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent {

  editing = false;
  reference: string;


  constructor(private router: Router,
              activeRoute: ActivatedRoute) {

    this.editing = activeRoute.snapshot.params['mode'] === 'edit';

    if (this.editing) {
      this.reference = activeRoute.snapshot.params['reference'];
    } else {
      this.reference = null;
    }
  }
}
