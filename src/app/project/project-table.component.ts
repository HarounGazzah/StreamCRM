import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ServerDataSource} from 'ng2-smart-table';
import {Row} from 'ng2-smart-table/lib/data-set/row';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CustomEnumRenderComponent} from '../shared/custom-ng2-smart-table-renderer/custom-enum-render.component';
import {ProjectService} from '../shared/services/project.service';
import {DatePipe} from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  moduleId: module.id,
  templateUrl: 'project-table.component.html'
})
export class ProjectTableComponent implements OnInit {

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
      columnTitle: '',
      add: false,
      position: 'right'
    },
    mode: 'external',
    columns: {
      startDate: {
        title: 'Début',
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
      endDate: {
        title: 'Fin',
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
      needTitle: {
        title: 'Projet',
        filter: false,
        // sort: false
      },
      client: {
        title: 'Client',
        filter: false
      },
      resourceFullName: {
        title: 'Ressource',
        filter: false
      },
      stage: {
        title: 'Etape',
        filter: false,
        type: 'custom',
        renderComponent: CustomEnumRenderComponent
      }

    },
    pager: {
      perPage: 7
    },
  };

  stages: any[];
  types: any[];
  projects;


  constructor(private service: ProjectService,
              private toastr: ToastrService,
              private http: HttpClient,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private projectService: ProjectService) {

    if (activeRoute.snapshot.params['error'] === 'error') {
      this.toastr.warning('Erreur lors de la récupération de données', 'Opération échoué!');
      this.router.navigate(['/projects']);
    }
  }


  ngOnInit() {
    // this.url = environment.API + '/ws/needs/search?fromAngular=true';
    this.url = environment.API + '/ws/projectspos/search?fromAngular=true';

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

    this.projectService.getProjects().subscribe(res => {
      this.projects = res;
    })


    console.log(this.source);

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

    console.log(this.source);
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

    console.log(this.source);

  }

  showProject(rowData: Row) {

    const project = rowData.getData();

    this.router.navigate(['/projects/edit', project.reference]);

  }



  deleteProject(rowData: Row) {
    const project = rowData.getData();
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Suppression de projet ' + project.needTitle,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Annuler',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, je confirme!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Suppression!' + project.needTitle,
          'projet' + project.needTitle + 'supprimer avec sucées',
          'success'
        );
        this.service.deleteProject(project.reference)
          .subscribe(res => {
            this.source.remove(rowData);
          }, error => {
            this.toastr.error('Erreur lors de la suppression de du Projet', 'Opération échoué !!!');
          });
      }
    });
  }

  onSelectRow(event: any) {
    if (event.data.resource) {

      this.router.navigate(['/projects/edit', event.data.reference]);
    }
    this.router.navigate(['/projects/edit', event.data.reference]);
  }


}
