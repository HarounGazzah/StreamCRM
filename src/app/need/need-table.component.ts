import {NeedService} from './../shared/services/need.service';
import {Row} from 'ng2-smart-table/lib/data-set/row';
import {environment} from './../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {CustomEnumRenderComponent} from './../shared/custom-ng2-smart-table-renderer/custom-enum-render.component';
import {Component, OnInit} from '@angular/core';
import {ServerDataSource} from 'ng2-smart-table';
import {ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DatePipe} from '@angular/common';
import Swal from 'sweetalert2';
import {PositioningAddComponent} from '../positioning-add/positioning-add.component';
import {NeedEditorComponent} from './need-editor.component';
import {NeedAddDialogComponent} from './need-add-dialog.component';

@Component({
  selector: 'app-need-table',
  templateUrl: 'need-table.component.html',
  styleUrls: ['./need-table.component.css'],
  moduleId: module.id,
})
export class NeedTableComponent implements OnInit {

  source: ServerDataSource;

  url: string;


  settings = {
    attr: {
      class: 'table table-striped'
    },
    edit: {
      editButtonContent: '<a class="btn btn-info" title="Modifier ou consulter"><i class="fa fa-pencil-square-o"></i></a>&nbsp'
    },
    delete: {
      deleteButtonContent: '<a class="btn btn-danger" title="Supprimer"><i class="fa fa-trash-o"></i></a>'
    },
    noDataMessage: 'Pas de valeur disponible !',
    actions: {
      columnTitle: 'Actions',
      add: false,
      position: 'right'
    },
    mode: 'external',
    columns: {
      reference: {
        title: 'Réference',
        filter: false
      },
      createdDate: {
        title: 'Date dépôt',
        type: 'date',
        filter: false,
        valuePrepareFunction: (date) => {
          if (date) {
            return new DatePipe('en-GB').transform(date, 'dd-MM-yyyy');
          }
          return null;
        },
        sort: false
      },
      title: {
        title: 'Titre de besoin',
        filter: false
      },
      client: {
        title: 'Client',
        filter: false,
        // sort: false
      },
      type: {
        title: 'Type',
        filter: false,
        type: 'custom',
        renderComponent: CustomEnumRenderComponent
      },
      activityArea: {
        title: 'Secteur d\'activité',
        filter: false,
        type: 'custom',
        renderComponent: CustomEnumRenderComponent
      },
      stage: {
        title: 'Etat',
        filter: false,
        type: 'custom',
        renderComponent: CustomEnumRenderComponent
      },
      startingDate: {
        title: 'Date de démarrage',
        type: 'date',
        filter: false,
        valuePrepareFunction: (date) => {
          if (date) {
            return new DatePipe('en-GB').transform(date, 'dd-MM-yyyy');
          }
          return 'Non définie';
        },
        sort: false
      },
      durationByMonth: {
        title: 'Duré',
        filter: false,
        valuePrepareFunction: (value) => {
          if (value == null) {
            return 'Indéterminée';
          }
          return value + ' mois';
        }

        // sort: false
      }

    },
    // actions: false, durationByMonth
    pager: {
      perPage: 8
    },
  };

  stages: any[];
  types: any[];


  constructor(private service: NeedService,
              private toastr: ToastrService,
              private http: HttpClient,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private dialog: MatDialog) {

    if (activeRoute.snapshot.params['error'] === 'error') {
      this.toastr.warning('Erreur lors de la récupération de données', 'Opération échoué!');
      this.router.navigate(['/needs']);
    }
  }


  ngOnInit() {

    this.url = environment.API + '/ws/needs/search?fromAngular=true';

    this.source = new ServerDataSource(this.http, {
      endPoint: this.url,
      dataKey: 'content',
      totalKey: 'totalElements',
      pagerLimitKey: 'size',
      perPage: 'size',
      sortFieldKey: 'sort',
      sortDirKey: 'dir',
      pagerPageKey: 'page'
    });

    this.stages = [
      {label: 'Tous', value: ''},
      {label: 'En cours', value: 'InProgress'},
      {label: 'Reporté', value: 'Postponed'},
      {label: 'Gagné', value: 'Won'},
      {label: 'Perdu', value: 'Lost'},
      {label: 'Abandonné', value: 'Abandoned'}];

    this.types = [
      {label: 'Tous', value: ''},
      {label: 'Régie', value: 'Authority'},
      {label: 'Forfait', value: 'FlatRate'},
      {label: 'Projet interne', value: 'InternalProject'},
      {label: 'Produit', value: 'Product'},
      {label: 'Recrutement', value: 'Recruitment'}];
  }


  onSelectChange(key: string = null, value: string = null) {

    const parameters = new URLSearchParams(this.url);
    if (value == null || value === '') {

      parameters.delete(key);
    } else {
      parameters.set(key, value);

    }

    this.url = decodeURIComponent(parameters.toString());
    this.source = new ServerDataSource(this.http, {
      endPoint: this.url,
      dataKey: 'content',
      totalKey: 'totalElements',
      pagerLimitKey: 'size',
      perPage: 'size',
      sortFieldKey: 'sort',
      sortDirKey: 'dir',
      pagerPageKey: 'page'
    });

  }

  onSearch(query: string = '') {

    const parameters = new URLSearchParams(this.url);
    parameters.set('value', query);

    this.url = decodeURIComponent(parameters.toString());

    this.source = new ServerDataSource(this.http, {
      endPoint: this.url,
      dataKey: 'content',
      totalKey: 'totalElements',
      pagerLimitKey: 'size',
      perPage: 'size',
      sortFieldKey: 'sort',
      sortDirKey: 'dir',
      pagerPageKey: 'page'
    });


  }

  showNeed(rowData: Row) {

    const need = rowData.getData();

    this.router.navigate(['/needs/edit', need.reference]);

  }

  deleteNeed(rowData: Row) {
    const need = rowData.getData();
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Supression du besoin ' + need.title,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Annuler',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, je confirme!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Besoin supprimer avec sucées!',
          'Besoin: ' + need.title,
          'success'
        );

        this.service.deleteNeed(need.reference)
          .subscribe(res => {

            this.source.remove(rowData);
            this.toastr.success('Besoin Supprimé avec succés', 'Opération Réussite!');

          }, error => {
            this.toastr.error('Erreur lors de la suppression de du Besoin', 'Opération échoué !!!');
          });
      }
    });
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
dialogConfig.panelClass = 'dialog';
    this.dialog.open(NeedAddDialogComponent, dialogConfig).afterClosed().subscribe(result => {
      this.source.refresh();
    });
  }


  onSelectRow(event: any) {
    if (event.data.resource) {

      this.router.navigate(['/needs/edit', event.data.reference]);
    }
    this.router.navigate(['/needs/edit', event.data.reference]);
  }

}

