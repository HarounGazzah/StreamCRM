import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ServerDataSource} from 'ng2-smart-table';
import {Row} from 'ng2-smart-table/lib/data-set/row';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SocietyContactService} from '../shared/services/society-contact.service';
import {CustomEnumRenderComponent} from '../shared/custom-ng2-smart-table-renderer/custom-enum-render.component';
import Swal from 'sweetalert2';


@Component({
  moduleId: module.id,
  templateUrl: 'society-contact-table.component.html'
})
export class SocietyContactTableComponent implements OnInit {

  source: ServerDataSource;

  url: string;

  societyReference: string;


  settings = {
    attr: {
      class: 'table table-striped table-sm'
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
      firstname: {
        title: 'Nom',
        filter: false
      },
      lastname: {
        title: 'Prénom',
        filter: false
      },
      title: {
        title: 'Titre',
        filter: false
      },
      service: {
        title: 'Service',
        filter: false
      },
      stage: {
        title: 'Etat',
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
      perPage: 5
    },
  };

  stages: any[];


  constructor(private service: SocietyContactService,
              private toastr: ToastrService,
              private http: HttpClient,
              private router: Router,
              private activeRoute: ActivatedRoute) {

    this.societyReference = activeRoute.snapshot.parent.params['reference'];

    if (activeRoute.snapshot.params['error'] === 'error') {
      this.toastr.warning('Erreur lors de la récupération de données', 'Opération échoué!');
      this.router.navigate(['/societies/edit/' + this.societyReference + '/contacts']);
    }
  }


  ngOnInit() {

    this.url = environment.API + '/ws/societies/contacts/search?fromAngular=true&societyReference=' + this.societyReference;

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

  showSocietyContact(rowData: Row) {

    const societyContact = rowData.getData();

    this.router.navigate(['/societies/edit/' + this.societyReference + '/contacts/edit', societyContact.reference]);

  }


  deleteSocietyContact(rowData: Row) {

    const societyContact = rowData.getData();
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Supression du conatct ' + societyContact.firstname + ' ' + societyContact.lastname,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'annuler',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, je confirme!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Contact supprimer avec sucées!',
          'Conatct: ' + societyContact.firstname + ' ' + societyContact.lastname,
          'success'
        );

        this.service.deleteSocietyContact(societyContact.reference, this.societyReference)
          .subscribe(res => {

            this.source.remove(rowData);
          }, error => {
            this.toastr.error('Erreur lors de la suppression de du contact', 'Opération échoué !!!');
          });
      }
    });
  }

  onSelectRow(event: any) {
    if (event.data.resource) {

      this.router.navigate(['/societies/edit/' + this.societyReference + '/contacts/edit', event.data.reference]);
    }
    this.router.navigate(['/societies/edit/' + this.societyReference + '/contacts/edit', event.data.reference]);
  }

}
