import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Positioning} from '../shared/entities/positioning.model';
import {PositioningService} from '../shared/services/positioning.service';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ProjectService} from '../shared/services/project.service';
import {ResourceService} from '../shared/services/resource.service';
import {UserService} from '../shared/services/user.service';
import Swal from 'sweetalert2';
import {NeedService} from '../shared/services/need.service';
import {SocietyService} from '../shared/services/society.service';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import {Need} from '../shared/entities/need.model';

@Component({
  selector: 'app-positioning-edit',
  templateUrl: './positioning-edit.component.html',
  styleUrls: ['./positioning-edit.component.css']
})
export class PositioningEditComponent implements OnInit {


  editing = false;
  positioning: Positioning = new Positioning();


  users: any[];
  stages: any[];
  needs: any = [];
  need: Need;
  resources: any = [];
  societies: any = [];
  periodCA: any;
  periodCost: any;
  periodMargin: any;
  periodProfitability: any;
  isProject = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: PositioningService,
              private resourceService: ResourceService,
              private projectService: ProjectService,
              private needService: NeedService,
              private userService: UserService,
              private societyService: SocietyService,
              private toastr: ToastrService
  ) {
  }


  ngOnInit() {

    this.userService.getUsers().subscribe(response => {
      this.users = response;
    });

    this.stages = [
      // {label: 'Tous', value: ''},
      {label: 'Positionné', value: 'Positioned'},
      {label: 'Envoye CV', value: 'SendingCV'},
      {label: 'Présenter au client', value: 'PresentedToClient'},
      {label: 'Rejeter', value: 'Rejected'},
      // {label: 'Gagné', value: 'Won'},
    ];

    const ref = this.route.snapshot.params.reference;
    // console.log(this.route);

    this.service.getPositioning(ref).subscribe(res => {
      this.positioning = res;
      this.positioning.projectReference = res.projectReference;
      this.periodCA = this.positioning.tjm * this.positioning.invoicedDays;
      this.periodCost = this.positioning.cjm * (this.positioning.freeDays + this.positioning.invoicedDays);
      this.periodMargin = this.periodCA - this.periodCost;
      this.periodProfitability = (this.periodMargin / (this.periodCA * 100)) * 10000;

      // getPeriodMargin().divide(getPeriodCA()).multiply(BigDecimal.valueOf(100));

    //  console.log(this.positioning.projectReference);

    });
    this.needService.getNeeds().subscribe(res => {
      this.needs = res;

    });

    this.societyService.getSocieties().subscribe(res => {
      this.societies = res;

    });

    this.resourceService.getResources().subscribe(res => {
      let ress: any[];
      ress = res;
      ress.map((i) => {
        i.fullName = i.firstname + ' ' + i.lastname;
        return i;
      });
      this.resources = ress;
    });

  }

  updatePostioning(form: NgForm) {
    console.log('POS :: ', this.positioning)
    this.service.updatePositioning(this.positioning, this.positioning.reference).subscribe(res => {
      this.positioning = res;
      Swal.fire('Données Mise à jour avec succés', 'Opération Réussite!', 'success');
      this.toastr.success('Données Mise à jour avec succés', 'Opération Réussite!');
    //  this.router.navigateByUrl('/positionings');

    }, error => {
      Swal.fire('Erreur lors de la modification de du Positionnement', 'Opération échoué !!!', 'error');
      this.toastr.error('Erreur lors de la modification de du Positionnement', 'Opération échoué !!!');
    });
    this.reloadInfo();

  }

  convertToProject() {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Convertion du besoin en projet ',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'annuler',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, je confirme!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Projet créer avec sucées!',
          'Veuillez compléter la fiche du projet',
          'success'
        );
        if (!this.positioning.project) {
          this.projectService.createProjectFromPositioning(this.positioning.reference)
            .subscribe(
              response => {
                this.isProject = true;
                this.stages.push({label: 'Gagné', value: 'Won'})
                this.positioning.stage = this.stages[5];
                this.router.navigate(['/projects/edit', response.reference]);
                this.toastr.success('Projet crée avec succés', 'Opération Réussite!');
              }, error => {
                this.toastr.error('Erreur de la création de projet', 'Opération échoué !!!');
              }
            );
        } else {
          this.toastr.error('Projet déjà créer', 'Opération échoué !!!');
        }
      }
    });
  }

  downloadPDF() {

    const pdf = new jsPDF('landscape');
    pdf.text('Fiche de positionnement ' + this.positioning.reference, 70, 10);
    pdf.text('Titre de besoin  : ' + this.positioning.needTitle, 10, 20);
    pdf.text('Ressource        : ' + this.positioning.resourceFullName, 10, 30);
    pdf.text('Société          : ' + this.positioning.client, 10, 40);
    pdf.text('Notes            : ' + this.positioning.note, 10, 50);
    pdf.text('Début            : ' + this.positioning.startDate, 10, 60);
    pdf.text('Fin              : ' + this.positioning.endDate, 10, 70);
    pdf.text('Etat             : ' + this.positioning.stage, 10, 80);
    pdf.text('Nb Jrs Facturés  : ' + this.positioning.invoicedDays, 10, 90);
    pdf.text('Nb Jrs Gratuits  : ' + this.positioning.freeDays, 10, 100);
    pdf.text('CA de cette période  : ' + this.positioning.periodCA, 10, 110);
    pdf.text('Coût de cette période  : ' + this.positioning.periodCost, 10, 120);
    pdf.text('Marge de cette période  : ' + this.positioning.periodMargin, 10, 130);
    pdf.text('Rentabilité de cette période  : ' + this.positioning.periodProfitability + ' %', 10, 140);

    pdf.autoTable({
      head: [['Besoin', 'Ressource', 'Ste', 'Début', 'Fin', 'Etat', 'Jrs Fact', 'Jrs Grat', 'CA', 'Coût', 'Marge', 'Rentabilité %']],
      body: [
        [this.positioning.needTitle,
          this.positioning.resourceFullName,
          this.positioning.client,
          this.positioning.startDate,
          this.positioning.endDate,
          this.positioning.stage,
          this.positioning.invoicedDays,
          this.positioning.freeDays,
          this.positioning.periodCA,
          this.positioning.periodCost,
          this.positioning.periodMargin,
          this.positioning.periodProfitability + ' %'
        ],
      ]
    });
    pdf.save('positioning.pdf');
  }

  reloadInfo() {
    this.service.getPositioning(this.route.snapshot.params.reference).subscribe(res => {
      this.positioning = res;
      this.positioning.projectReference = res.projectReference;
      this.periodCA = this.positioning.tjm * this.positioning.invoicedDays;
      this.periodCost = this.positioning.cjm * (this.positioning.freeDays + this.positioning.invoicedDays);
      this.periodMargin = this.periodCA - this.periodCost;
      this.periodProfitability = (this.periodMargin / (this.periodCA * 100)) * 10000;

      // getPeriodMargin().divide(getPeriodCA()).multiply(BigDecimal.valueOf(100));

      //  console.log(this.positioning.projectReference);

    });
  }
}
