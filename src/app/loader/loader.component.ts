import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {LoaderService} from '../shared/services/loader.service';
import {LoaderState} from '../shared/entities/loader';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'angular-loader',
  templateUrl: 'loader.component.html'
})
export class LoaderComponent implements OnInit {

  show = false;

  private subscription: Subscription;

  constructor(
    private loaderService: LoaderService, private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {

        this.show = state.show;

        if (this.show) {
          this.spinner.show();
        } else {
          this.spinner.hide();
        }

      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.spinner.hide();
  }
}
