import {Injectable} from "@angular/core";
import {NgForm} from "@angular/forms";

@Injectable()
export class ValidatorService {

  constructor() {
  }

  getFormValidationMessages(form: NgForm): string[] {
    let messages: string[] = [];
    Object.keys(form.controls).forEach(k => {
      this.getValidationMessages(form.controls[k], k)
        .forEach(m => messages.push(m));
    });
    return messages;
  }

  getValidationMessages(state: any, thingName?: string): string[] {
    let thing: string = state.path || thingName;
    let messages: string[] = [];
    if (state.errors) {
      for (let errorName in state.errors) {
        switch (errorName) {
          case "email":
            messages.push(`Vous devez entrer un email valide`);
            break;
          case "required":
            messages.push(`Vous devez entrer un  ${thing}`);
            break;
          case "minlength":
            messages.push(`L'entré ${thing} doit avoir au minimum 
      ${state.errors['minlength'].requiredLength}
characters`);
            break;
          case "maxlength":
            messages.push(`L'entré ${thing} doit avoir au maximum 
      ${state.errors['minlength'].requiredLength}
characters`);
            break;
          case "pattern":
            messages.push(`L'entré ${thing} contient des characters illégaux`);
            break;
        }
      }
    }
    return messages;
  }
}
