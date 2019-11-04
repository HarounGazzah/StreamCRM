import {ActionService} from './services/action.service';
import {AuthService} from './services/auth.service';
import {ContractService} from './services/contract.service';
import {DeveloperService} from './services/developer.service';
import {EvaluationService} from './services/evaluation.service';
import {LanguageService} from './services/language.service';
import {UserService} from './services/user.service';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ValidatorService} from './services/validator.service';
import {FieldErrorDisplayComponent} from './field-error-display/field-error-display.component';
import {LoaderService} from './services/loader.service';
import {SocietyService} from './services/society.service';
import {SocietyContactService} from './services/society-contact.service';
import {CustomEnumRenderComponent} from './custom-ng2-smart-table-renderer/custom-enum-render.component';
import {EqualValidator} from './directives/equal-validator.directive';
import {ResourceService} from './services/resource.service';
import {ProjectService} from './services/project.service';
import {PositioningService} from './services/positioning.service';
import {NeedService} from './services/need.service';
import {MailService} from './services/mail.service';
import { EventService } from './services/event.service';
import { SharingService } from './services/sharing.service';
import {BillService} from './services/bill.service';
import {AbsenceService} from './services/AbsenceService';
import {AbsenceListService} from './services/AbsenceListService';

@NgModule({
  imports: [HttpClientModule, CommonModule],
  entryComponents: [CustomEnumRenderComponent],
  declarations: [FieldErrorDisplayComponent, CustomEnumRenderComponent, EqualValidator],
  exports: [FieldErrorDisplayComponent, CustomEnumRenderComponent, EqualValidator],
  providers: [DeveloperService, EvaluationService, ActionService, ResourceService, PositioningService, MailService,
    UserService, LanguageService, AuthService, SocietyService, ProjectService,
    ContractService, ValidatorService, LoaderService, SocietyContactService, NeedService, EventService, SharingService, BillService, AbsenceService, AbsenceListService],
})
export class SharedModule {

}
