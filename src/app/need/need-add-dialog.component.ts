import { Component, OnInit } from '@angular/core';
import {Need} from '../shared/entities/need.model';
import {User} from '../shared/entities/user.model';
import {concat, Observable, of, Subject} from 'rxjs';
import {Society, SocietyView} from '../shared/entities/society.model';
import {SocietyContactView} from '../shared/entities/society-contact.model';
import {NeedService} from '../shared/services/need.service';
import {SocietyService} from '../shared/services/society.service';
import {SocietyContactService} from '../shared/services/society-contact.service';
import {UserService} from '../shared/services/user.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {MatDialogRef} from '@angular/material';
import Swal from "sweetalert2";

@Component({
  selector: 'app-need-add-dialog',
  templateUrl: './need-add-dialog.component.html',
  styleUrls: ['./need-add-dialog.component.css']
})
export class NeedAddDialogComponent implements OnInit {

  need: Need = new Need();

  users: User[];

  stages: any[];
  types: any[];

  societies$: Observable<SocietyView[] | Society[]>;
  contacts$: Observable<SocietyContactView[]>;
  societies;

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
              private activeRoute: ActivatedRoute,
              public dialogRef: MatDialogRef<NeedAddDialogComponent>) {

  }

  ngOnInit(): void {
  //  this.editing = this.activeRoute.snapshot.parent.params['reference'] !== undefined;


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
      this.societies = this.societyService.getSocieties();

    this.loadSocieties(null);


  }

  onSocietyChange($event) {
    if ($event !== undefined) {
      console.log($event);
      this.contacts$ = this.societyContactService.getSocietyContacts($event.reference);
    }
  }

  save(form: NgForm) {

    if (form.valid) {

        this.service.createNeeds(this.need)
          .subscribe(response => {
            this.dialogRef.close();
            this.toastr.success('Besoin Créé avec succés', 'Opération Réussite!');
            this.router.navigate(['/needs/edit/', response.reference]);

            Swal.fire('Besoin crée avec succés', 'Veuillez compléter les informations manquantes', 'success');



          }, error => {
            Swal.fire('Erreur de création du besoin', 'Opération Echouée!', 'error');
            this.toastr.error('Erreur lors de la création du Besoin', 'Opération échoué !!!');
          });

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
          tap((el) => {
            this.societiesLoading = true;
          }),
          switchMap(term => this.societyService.searchSocieties(term).pipe(
            catchError(() => of([])), // empty list on error
            tap(() => this.societiesLoading = false)
          ))
        )
      );
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
