import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable()
export class AppNavbarService {

  // changed = false;

  @Output() update: EventEmitter<void> = new EventEmitter();

  updateUser() {
    // this.changed = !this.changed;
    this.update.emit();
  }

}
