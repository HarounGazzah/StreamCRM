import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ServerDataSource} from 'ng2-smart-table';
import {Row} from 'ng2-smart-table/lib/data-set/row';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../environments/environment';
import {UserService} from '../shared/services/user.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {UserAddDialogComponent} from './user-add-dialog.component';
import Swal from 'sweetalert2';


@Component({
  moduleId: module.id,
  templateUrl: 'users-table.component.html'
})
export class UserTableComponent implements OnInit {

  source: ServerDataSource;
  url: string;


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
        filter: false,
        sort: false
      },
      lastname: {
        title: 'Prénom',
        filter: false,
        sort: false
      },
      email: {
        title: 'Email',
        filter: false,
        sort: false
      }
    },
    pager: {
      perPage: 8
    },
  };

  stages: any[];


  constructor(private service: UserService,
              private toastr: ToastrService,
              private http: HttpClient,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private dialog: MatDialog) {

    if (activeRoute.snapshot.params['error'] === 'error') {
      this.toastr.warning('Erreur lors de la récupération de données', 'Opération échoué!');
      this.router.navigate(['/admin/users']);
    }
  }


  ngOnInit() {


    this.url = environment.API + '/ws/users/search?fromAngular=true';

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


  showUser(rowData: Row) {

    const user = rowData.getData();

    this.router.navigate(['/admin/users/edit', user.reference]);

  }

  deleteUser(rowData: Row) {

    const user = rowData.getData();
    if (user.firstname === 'admin' || user.lastname === 'admin') {
      this.toastr.error('Interdit de supprimer un compte administrateur', 'Interdiction !');
    } else {
      Swal.fire({
        title: 'Êtes-vous sûr?',
        text: 'Supprimer l\'utilisateur ' + user.firstname + ' ' + user.lastname,
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
            'L\'utilisateur' + user.firstname + ' ' + user.lastname + ' supprimer avec sucées',
            'success'
          );
          this.service.deleteUser(user.reference)
            .subscribe(res => {

              this.source.remove(rowData);
            }, error => {
              this.toastr.error('Erreur lors de la suppression de l\'Utilisateur', 'Opération échoué !!!');
            });
        }
      });
    }
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '20%';
    dialogConfig.panelClass = 'dialog';
    this.dialog.open(UserAddDialogComponent, dialogConfig).afterClosed().subscribe(result => {
      this.source.refresh();
    });
  }

  onSelectRow(event: any) {
    if (event.data.resource) {

      this.router.navigate(['/admin/users/edit', event.data.reference]);
    }
    this.router.navigate(['/admin/users/edit', event.data.reference]);
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

}
