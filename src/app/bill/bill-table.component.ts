import {Component, OnInit} from '@angular/core';
import {ServerDataSource} from 'ng2-smart-table';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Row} from 'ng2-smart-table/lib/data-set/row';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {SocietyService} from '../shared/services/society.service';
import {CustomEnumRenderComponent} from '../shared/custom-ng2-smart-table-renderer/custom-enum-render.component';
import Swal from "sweetalert2";
import {BillService} from '../shared/services/bill.service';


@Component({
  selector: 'app-bill-table',
  templateUrl: './bill-table.component.html',
  styleUrls: ['./bill-table.component.css']
})
export class BillTableComponent implements OnInit {

  billStage: any[];
  clients: any[];

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
      createdDate: {
        title: 'Date de création',
        filter: false,
        valuePrepareFunction: (date) => {
          if (date) {
            return new DatePipe('en-GB').transform(date, 'dd-MM-yyyy');
          }
          return 'Non définie';
        },
      },
      projectName: {
        title: 'Projet',
        filter: false,
      },
      resourceFullName: {
        title: 'Resource',
        filter: false,
      },
      societyName: {
        title: 'Societe',
        filter: false,
      },
      state: {
        title: 'Status',
        filter: false,
      },
      billStage: {
        title: 'Etat',
        filter: false,
        type: 'custom',
        renderComponent: CustomEnumRenderComponent
      },
      title: {
        title: 'Titre',
        filter: false,
        // sort: false
      },
      quantity: {
        title: 'Quantité',
        filter: false,
        // sort: false
      },
      unitPrice: {
        title: 'Tarif HT',
        filter: false,
        valuePrepareFunction: (value) => {
          return value + ' €';
        }
        // sort: false
      },
      tva: {
        title: 'TVA',
        filter: false,
        valuePrepareFunction: (value) => {
          if (value == null) {
            return 'Indéterminée';
          }
          return value + ' %';
        }
        //  sort: false
      },
      total: {
        title: 'Montant HT',
        filter: false,
        valuePrepareFunction: (value) => {
          return value + ' €';
        }
        // sort: false
      },
      totalTtc: {
        title: 'Montant TTC',
        filter: false,
        valuePrepareFunction: (value) => {
          return value + ' €';
        }
      },
    },
    pager: {
      perPage: 8
    },
  };

  constructor(private http: HttpClient,
              private societyService: SocietyService,
              private service: BillService,
              private router: Router) {
  }

  ngOnInit() {
    this.url = environment.API + '/ws/bills/search?fromAngular=true';

    this.source = new ServerDataSource(this.http,
      {
        endPoint: this.url,
        dataKey: 'content',
        totalKey: 'totalElements',
        pagerLimitKey: 'size',
        perPage: 'size',
        sortFieldKey: 'sort',
        sortDirKey: 'dir',
        pagerPageKey: 'page'
      });

    this.billStage = [
      {label: 'Tous', value: ''},
      {label: 'Creation', value: 'CREATION'},
      {label: 'Transmis au client', value: 'TRANSMITTED_TO_CUSTOMER'},
      {label: 'Relance 1', value: 'REVIVAL1'},
      {label: 'Relance 2', value: 'REVIVAL2'},
      {label: 'Email au client', value: 'EMAIL_TO_CUSTOMER'},
      {label: 'Impayée', value: 'UNPAID'},
      {label: 'Payée', value: 'PAID'}
    ];

    this.societyService.getSocieties().subscribe(res => {
      this.clients = res;
    });


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
    parameters.set('label', query);

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

  showBill(rowData: Row) {
    const bill = rowData.getData();
    this.router.navigate(['/bills/edit', bill.reference]);
    console.log(bill);
  }

  onSelectRow(event: any) {
    if (event.data.resource) {

      this.router.navigate(['/bills/edit', event.data.reference]);
    }
    this.router.navigate(['/bills/edit', event.data.reference]);
  }

  deleteBill(rowData: Row) {
    const bill = rowData.getData();
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Suppression de Facture ' + bill.title + ' de ' + bill.societyName,
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
          'Facture' + bill.title + 'supprimer avec sucées',
          'success'
        );
        this.service.deleteBill(bill.reference)
          .subscribe(res => {
            this.source.remove(rowData);
          }, error => {
            alert('Erreur lors de la suppression de du Facture !!');
          });
      }
    });
  }



}
