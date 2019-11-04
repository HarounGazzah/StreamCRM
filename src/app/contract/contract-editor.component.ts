import {Contract} from '../shared/entities/contract.model';
import {WishedContract} from '../shared/entities/wished-contract.model';
import {ContractService} from '../shared/services/contract.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Resource} from '../shared/entities/resource.model';
import {ResourceService} from '../shared/services/resource.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contract',
  // moduleId: module.id,
  templateUrl: 'contract-editor.component.html',
  styleUrls: ['contract-editor.component.css']

})
export class ContractEditorComponent implements OnInit {

  editing = false;
  wishedContract: WishedContract = new WishedContract();
  contract: Contract = new Contract();
  haveContract = false;
  urlToReturn = '';
  cjm = 0;
  externalConsultant = false;
  resource: Resource;


  constructor(private service: ContractService,
              private resourceService: ResourceService,
              private router: Router,
              private toastr: ToastrService,
              private activeRoute: ActivatedRoute) {
    this.urlToReturn = '/' + this.activeRoute.snapshot.parent.url[0].toString();
  }

  ngOnInit(): void {

    this.editing = this.activeRoute.snapshot.parent.params['mode'] === 'edit';
    if (this.editing) {

      this.service.getWishedContract(this.activeRoute.snapshot.parent.params['reference'])
        .subscribe(response => {
          this.wishedContract = response,

            this.resourceService.getResource(response.developerReference).subscribe(res => {
              if (res.resourceType == 'ExternalConsultant') {
                this.externalConsultant = true;
                this.cjm = this.contract.salary;
              } else {
                this.externalConsultant = false;
              }
            });

          error => {
            this.router.navigate([this.urlToReturn, 'error']);
          };
        });

      this.service.getContract(this.activeRoute.snapshot.parent.params['reference'])
        .subscribe(response => {
          this.contract = response;

          this.resourceService.getResource(response.developerReference).subscribe(res => {
            if (res.resourceType == 'ExternalConsultant') {
              this.cjm = this.contract.salary;
            } else if (res.resourceType != 'ExternalConsultant') {
              this.cjm = (this.contract.salary * this.contract.coefficient) / this.contract.businessDays;

            }
          });


          this.haveContract = this.contract != null && this.contract.reference != null;
        }, error => {
          this.router.navigate([this.urlToReturn, 'error']);
        });


    }


  }


  deleteContract() {

    this.service.deleteContract(this.contract.developerReference)
      .subscribe(response => {
        this.contract = null;
        this.haveContract = false;
        this.toastr.success('Contrat supprimé avec succés', 'Opération Réussite!');

      }, error => {
        this.toastr.error('Erreur lors de la suppression du Contrat', 'Opération échoué !!!');
      });
  }

  initContract() {
    let con = new Contract();
    con.developerReference = this.wishedContract.developerReference;

    // this.resourceService.getResource(con.developerReference).subscribe(result => {
    //   console.log(result);
    //
    //   if (result.firstname == 'Alice') {
    //     console.log('C\'est Alice !! Correct !!');
    //     this.externalConsultant = true;
    //   } else {
    //     this.externalConsultant = false;
    //   }
    // });

    this.service.createContracts(con, this.wishedContract.developerReference)
      .subscribe(response => {
        this.contract = response;
        this.haveContract = true;
      }, error => {
        this.toastr.error('Erreur lors de la création du Contrat', 'Opération échoué !!!');
      });
  }

  saveContract(form: NgForm) {

    if (form.valid) {
      if (this.editing) {
        if (this.contract.endDate <= this.contract.startDate) {
          Swal.fire('Erreur de saisie !', 'Date de début doit etre inférieur a la date de fin!', 'error');
        } else {
          this.service.updateContract(this.contract, this.contract.developerReference)
            .subscribe(response => {
              this.cjm = (this.contract.salary * this.contract.coefficient) / this.contract.businessDays;
              this.toastr.success('Contrat Mis à jour avec succés', 'Opération Réussite!');
            }, error => {
              this.toastr.error('Erreur lors de la Création du Contrat', 'Opération échoué !!!');
            });
        }
      }
    }
  }

  saveWishedContract(form: NgForm) {

    if (form.valid) {
      if (this.editing) {

        this.service.updateWishedContract(this.wishedContract, this.wishedContract.developerReference)
          .subscribe(response => {

            this.toastr.success('Contrat Mis à jour avec succés', 'Opération Réussite!');

          }, error => {
            this.toastr.error('Erreur lors de la Création du Contrat', 'Opération échoué !!!');
          });
      }
    }

  }
}
