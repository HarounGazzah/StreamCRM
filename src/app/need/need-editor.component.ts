import {NeedService} from './../shared/services/need.service';
import {NgForm} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {concat} from 'rxjs/observable/concat';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {Observable, of} from 'rxjs';
import {User} from './../shared/entities/user.model';
import {Component, OnInit} from '@angular/core';
import {Need} from '../shared/entities/need.model';
import {Society, SocietyView} from '../shared/entities/society.model';
import {SocietyContactView} from '../shared/entities/society-contact.model';
import {SocietyService} from '../shared/services/society.service';
import {SocietyContactService} from '../shared/services/society-contact.service';
import {UserService} from '../shared/services/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  moduleId: module.id,
  selector: 'app-need-editor',
  templateUrl: 'need-editor.component.html',
  styleUrls: ['need-editor.component.css']

})
export class NeedEditorComponent implements OnInit {
  editing = false;
  need: Need = new Need();

  users: User[];

  stages: any[];
  types: any[];

  societies$: Observable<SocietyView[] | Society[]>;
  contacts$: Observable<SocietyContactView[]>;

  societiesLoading = false;
  societiesInput$ = new Subject<string>();
  reference: string;

  // selectedPersons: Person[] = <any>[{ name: 'Karyn Wright' }, { name: 'Other' }];


  constructor(private service: NeedService,
              private societyService: SocietyService,
              private societyContactService: SocietyContactService,
              private userService: UserService,
              private toastr: ToastrService,
              private router: Router,
              private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.editing = this.activeRoute.snapshot.parent.params['reference'] !== undefined;


    this.userService.getUsers().subscribe(response => this.users = response);

    this.stages = [
      {label: 'En cours', value: 'InProgress'},
      {label: 'Reporté', value: 'Postponed'},
      {label: 'Gagné', value: 'Won'},
      {label: 'Perdu', value: 'Lost'},
      {label: 'Abandonné', value: 'Abandoned'}];

    this.types = [
      {label: 'Régie', value: 'Authority'},
      {label: 'Forfait', value: 'FlatRate'},
      {label: 'Projet interne', value: 'InternalProject'},
      {label: 'Produit', value: 'Product'},
      {label: 'Recrutement', value: 'Recruitment'}];

    if (this.editing) {

      this.service.getNeed(this.activeRoute.snapshot.parent.params['reference'])
        .subscribe(response => {
            this.need = response;
            this.contacts$ = this.societyContactService.getSocietyContacts(this.need.societyReference);
            this.loadSocieties(this.need.societyReference);
          }
          , error =>
            this.router.navigate(['/needs', 'error']));
    } else {
      this.loadSocieties(null);
    }
  }

  onSocietyChange($event) {
    if ($event !== undefined) {
      console.log($event);
      this.contacts$ = this.societyContactService.getSocietyContacts($event.reference);
    }
  }

  save(form: NgForm) {

    if (form.valid) {
      if (this.editing) {

        this.service.updateNeed(this.need, this.need.reference)
          .subscribe(
            response => {

              this.need = response;
              this.toastr.success('Données Mise à jour avec succés', 'Opération Réussite!');

            }, error => {
              this.toastr.error('Erreur lors de la mise à jour des donnés', 'Opération échoué !!!');
            }
          );

      } else {
        this.service.createNeeds(this.need)
          .subscribe(response => {

            this.toastr.success('Besoin Créé avec succés', 'Opération Réussite!');
            this.router.navigate(['/needs/edit/', response.reference]);

          }, error => {
            this.toastr.error('Erreur lors de la création du Besoin', 'Opération échoué !!!');
          });
      }
    }
  }

  private loadSocieties(societyReference: string) {

    if (societyReference !== null) {

      this.societyService.getSociety(societyReference).subscribe(response => {
          this.societies$ = concat(
            of([response]), // default items
            this.societiesInput$.pipe(
              debounceTime(200),
              distinctUntilChanged(),
              tap(() => this.societiesLoading = true),
              switchMap(term => this.societyService.searchSocieties(term).pipe(
                catchError(() => of([])), // empty list on error
                tap(() => this.societiesLoading = false)
              ))
            )
          );
        }, error => {
          this.societies$ = concat(
            of([]), // default items
            this.societiesInput$.pipe(
              debounceTime(200),
              distinctUntilChanged(),
              tap(() => this.societiesLoading = true),
              switchMap(term => this.societyService.searchSocieties(term).pipe(
                catchError(() => of([])), // empty list on error
                tap(() => this.societiesLoading = false)
              ))
            )
          );
        }
      );
    } else {
      this.societies$ = concat(
        of([]), // default items
        this.societiesInput$.pipe(
          debounceTime(200),
          distinctUntilChanged(),
          tap(() => this.societiesLoading = true),
          switchMap(term => this.societyService.searchSocieties(term).pipe(
            catchError(() => of([])), // empty list on error
            tap(() => this.societiesLoading = false)
          ))
        )
      );
    }
  }

}
