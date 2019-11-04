import {DeveloperService} from '../shared/services/developer.service';
import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ServerDataSource} from 'ng2-smart-table';
import {Row} from 'ng2-smart-table/lib/data-set/row';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CustomEnumRenderComponent} from '../shared/custom-ng2-smart-table-renderer/custom-enum-render.component';
import Swal from 'sweetalert2';


@Component({
  moduleId: module.id,
  templateUrl: 'developer-table.component.html'
})
export class DeveloperTableComponent implements OnInit {

  source: ServerDataSource;

  url: string;


  settings = {
    attr: {
      class: 'table table-striped'
    },
    edit: {
      editButtonContent: '<a class="btn btn-info" title="Modifier ou consulter"><i class="fa fa-pencil-square-o"></i></a>&nbsp',
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
      firstname: {
        title: 'Nom',
        filter: false
      },
      lastname: {
        title: 'Prénom',
        filter: false
      },
      stage: {
        title: 'Etape',
        filter: false,
        type: 'custom',
        renderComponent: CustomEnumRenderComponent
      },
      mobility: {
        title: 'Mobilité',
        filter: false
      },
      experience: {
        title: 'Experience',
        filter: false,
        type: 'custom',
        renderComponent: CustomEnumRenderComponent
      },
      email1: {
        title: 'Email',
        filter: false
      }
    },
    // actions: false,
    pager: {
      perPage: 8
    },
  };

  experiences: any[];
  stages: any[];
  formations: any[];


  constructor(private service: DeveloperService,
              private toastr: ToastrService,
              private http: HttpClient,
              private router: Router,
              private activeRoute: ActivatedRoute) {

    if (activeRoute.snapshot.params['error'] === 'error') {
      this.toastr.warning('Erreur lors de la récupération de données', 'Opération échoué!');
      this.router.navigate(['/developers']);
    }

    if (activeRoute.snapshot.params['error'] === 'forbidden') {
      this.toastr.error('Vous n\'avez pas la permission d\'accéder à cette ressource.', '403 - ACCÈS REFUSÉ');
      this.router.navigate(['/developers']);
    }
  }


  ngOnInit() {

    this.url = environment.API + '/ws/developers/search?fromAngular=true';

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
      {label: 'A traiter', value: 'ToTreat'},
      {label: 'En Cours de Qualif', value: 'InTheProcessOfQualifying'},
      {label: 'Vivier', value: 'Vivier'},
      {label: 'Vivier ++', value: 'VivierPlus'},
      {label: 'Converti en Ressource', value: 'ConvertedToResource'},
      {label: 'Ne plus contacter', value: 'StopContacting'}
    ];

    this.experiences = [
      {label: 'Tous', value: ''},
      {label: 'Non', value: 'NON'},
      {label: 'Entre 1 et 2 ans', value: 'BETWEEN1AND2'},
      {label: 'Entre 3 et 5 ans', value: 'BETWEEN3AND5'},
      {label: 'Entre 6 et 10 ans', value: 'BETWEEN6AND10'},
      {label: 'Plus que 10 ans', value: 'MORE_THAN_10'}];

    this.formations = [
      {label: 'Tous', value: ''},
      {label: 'Non défini', value: 'NOT_DEFINED'},
      {label: 'Bac', value: 'BAC'},
      {label: 'Bac +2', value: 'BAC_PLUS_2'},
      {label: 'Bac +3', value: 'BAC_PLUS_3'},
      {label: 'Bac +4', value: 'BAC_PLUS_4'},
      {label: 'Bac +5', value: 'BAC_PLUS_5'},
      {label: 'Bac +6', value: 'BAC_PLUS_6'},
      {label: 'Bac +7', value: 'BAC_PLUS_7'},
      {label: 'Bac +8', value: 'BAC_PLUS_8'}];
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

  onSelectRow(event: any) {
    if (event.data.resource) {

      this.router.navigate(['/resources/edit', event.data.reference]);
    }
    this.router.navigate(['/developers/edit', event.data.reference]);
  }

  showDeveloper(rowData: Row) {

    const developer = rowData.getData();
    if (developer.resource) {
      this.router.navigate(['/resources/edit', developer.reference]);
    } else {
      this.router.navigate(['/developers/edit', developer.reference]);
    }

  }

  deleteDeveloper(rowData: Row) {
    const developer = rowData.getData();
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Supprimer le candidat ' + developer.firstname + ' ' + developer.lastname,
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
          'Le candidat ' + developer.firstname + ' ' + developer.lastname + ' supprimer avec sucées',
          'success'
        );
        this.service.deleteDeveloper(developer.reference)
          .subscribe(res => {
            this.source.remove(rowData);
          }, error => {
            this.toastr.error('Erreur lors de la suppression du candidat', 'Opération échoué !!!');
          });
      }
    });

  }

}
