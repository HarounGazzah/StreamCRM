import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ServerDataSource} from 'ng2-smart-table';
import {Row} from 'ng2-smart-table/lib/data-set/row';
import {ActivatedRoute, Router} from '@angular/router';
// import {ToastrService} from 'ngx-toastr';
import {CustomEnumRenderComponent} from '../shared/custom-ng2-smart-table-renderer/custom-enum-render.component';
import {PositioningService} from '../shared/services/positioning.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {PositioningAddComponent} from '../positioning-add/positioning-add.component';
import {DatePipe} from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  moduleId: module.id,
  templateUrl: 'positioning-table.component.html',
  styleUrls: ['./positioning-table.component.scss']
})
export class PositioningTableComponent implements OnInit {

  source: ServerDataSource;

  url: string;


  settings = {
    attr: {
      class: 'table table-striped',
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
      position: 'right',
    },
    mode: 'external',
    columns: {
      createdDate: {
        title: 'Date de création',
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
      resourceFullName: {
        title: 'Ressource',
        filter: false,
        sort: false
      },
      needTitle: {
        title: 'Besoin',
        filter: false,
        sort: false
      },
      client: {
        title: 'Client - Contact',
        filter: false,
        sort: false
      },
      stage: {
        title: 'Etat',
        filter: false,
        type: 'custom',
        renderComponent: CustomEnumRenderComponent
      }

    },
    // actions: false,
    pager: {
      perPage: 8
    },
  };

  positioningStages: any[];
  projectStages: any[];
  projectTypes: any[];


  constructor(private service: PositioningService,
              // private toastr: ToastrService,
              private http: HttpClient,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private dialog: MatDialog) {

    if (activeRoute.snapshot.params['error'] === 'error') {
      // this.toastr.warning('Erreur lors de la récupération de données', 'Opération échoué!');
      this.router.navigate(['/positionings']);
    }
  }


  ngOnInit() {

    this.url = environment.API + '/ws/positionings/search?fromAngular=true';
    this.source = new ServerDataSource(
      this.http, {
        endPoint: this.url,
        dataKey: 'content',
        totalKey: 'totalElements',
        pagerLimitKey: 'size',
        perPage: 'size',
        sortFieldKey: 'sort',
        sortDirKey: 'dir',
        pagerPageKey: 'page'
      });


    // console.log(this.source);       NOT_DEFINED,


    this.positioningStages = [
      {label: 'Tous', value: ''},
      {label: 'En attente', value: 'Waiting'},
      {label: 'Présenté au client', value: 'PresentedToClient'},
      {label: 'Envoi du CV', value: 'SendingCV'},
      {label: 'Rejeté', value: 'Rejected'},
      {label: 'Gagné', value: 'Won'},
      {label: 'Positionné', value: 'Positioned'}
    ];

    this.projectStages = [
      {label: 'Tous', value: ''},
      {label: 'En cours', value: 'InProgress'},
      {label: 'Reporté', value: 'Postponed'},
      {label: 'Gagné', value: 'Won'},
      {label: 'Perdu', value: 'Lost'},
      {label: 'Abandonné', value: 'Abandoned'}];


    this.projectTypes = [
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

    // console.log(this.source);
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

    // console.log(this.source);

  }

  showPositioning(rowData: Row) {

    const positioning = rowData.getData();
    this.router.navigate(['/positionings/edit', positioning.reference]);

  }

  deletePositioning(rowData: Row) {
    const positioning = rowData.getData();
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Suppression de Positionnement ' + positioning.needTitle,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Annuler',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, je confirme!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Suppression!',
          'Positionnement' + positioning.needTitle + 'supprimer avec sucées',
          'success'
        );
        this.service.deletePositioning(positioning.reference)
          .subscribe(res => {
            this.source.remove(rowData);
          }, error => {
            alert('Erreur lors de la suppression de du Positionnement !!');
          });
      }
    });
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.panelClass = 'dialog';
    this.dialog.open(PositioningAddComponent, dialogConfig).afterClosed().subscribe(result => {
      this.source.refresh();
    });
  }

  onSelectRow(event: any) {
    if (event.data.resource) {

      this.router.navigate(['/positionings/edit', event.data.reference]);
    }
    this.router.navigate(['/positionings/edit', event.data.reference]);
  }

}
