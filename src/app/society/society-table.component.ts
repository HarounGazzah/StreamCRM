import {SocietyService} from '../shared/services/society.service';
import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ServerDataSource} from 'ng2-smart-table';
import {Row} from 'ng2-smart-table/lib/data-set/row';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CustomEnumRenderComponent} from '../shared/custom-ng2-smart-table-renderer/custom-enum-render.component';
import {Society} from '../shared/entities/society.model';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {SocietyAddDialogComponent} from './society-add-dialog.component';
import Swal from 'sweetalert2';


@Component({
  moduleId: module.id,
  templateUrl: 'society-table.component.html'
})
export class SocietyTableComponent implements OnInit {

  source: ServerDataSource;

  url: string;

  society: Society;

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
      label: {
        title: 'Société',
        filter: false
      },
      activityArea: {
        title: 'Secteur',
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
      city: {
        title: 'Lieu',
        filter: false
      },
      tel1: {
        title: 'Coordonnées',
        filter: false
      }
    },
    pager: {
      perPage: 8
    }
  };

  stages: any[];


  constructor(private service: SocietyService,
              private toastr: ToastrService,
              private http: HttpClient,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private dialog: MatDialog) {

    if (activeRoute.snapshot.params['error'] === 'error') {
      this.toastr.warning('Erreur lors de la récupération de données', 'Opération échoué!');
      this.router.navigate(['/societies']);
    }
  }


  ngOnInit() {

    this.url = environment.API + '/ws/societies/search?fromAngular=true';

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
      {label: 'Prospect', value: 'Prospect'},
      {label: 'Client', value: 'Customer'},
      {label: 'Partenaire', value: 'Partner'},
      {label: 'Fournisseur', value: 'Provider'},
      {label: 'Archivé', value: 'Archive'}];
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

  showSociety(rowData: Row) {

    const society = rowData.getData();

    this.router.navigate(['/societies/edit', society.reference]);

  }

  deleteSociety(rowData: Row) {
    const society = rowData.getData();
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Supprimer de la société ' + society.label,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Annuler',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, je confirme!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Supprimer!',
          'La société' + society.label + 'supprimer avec sucées',
          'success'
        );
        this.service.deleteSociety(society.reference)
          .subscribe(res => {
            this.source.remove(rowData);
          }, error => {
            this.toastr.error('Erreur lors de la suppression de la société', 'Opération échoué !!!');
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
    this.dialog.open(SocietyAddDialogComponent, dialogConfig).afterClosed().subscribe(result => {
      this.source.refresh();
    });
  }

  onSelectRow(event: any) {
    if (event.data.resource) {

      this.router.navigate(['/societies/edit', event.data.reference]);
    }
    this.router.navigate(['/societies/edit', event.data.reference]);
  }
}
