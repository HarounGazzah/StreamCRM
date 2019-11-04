import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BillService} from '../shared/services/bill.service';
import {Bill} from '../shared/entities/bill.model';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import {Email} from '../shared/entities/mail.model';
import {SocietyContactService} from '../shared/services/society-contact.service';
import Swal from 'sweetalert2';
import {MailService} from '../shared/services/mail.service';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-bill-editor',
  templateUrl: './bill-editor.component.html',
  styleUrls: ['./bill-editor.component.css']
})
export class BillEditorComponent implements OnInit {

  editing = false;
  bill: Bill = new Bill();
  billReference = '';
  societyReference = '';
  societyContactReference = '';
  email: Email = new Email();
  mail: any;
  billStages: any[];
  paymentTypes: any[];
  currency: any[];


  constructor(private activeRoute: ActivatedRoute,
              private billService: BillService,
              private router: Router,
              private societyContactService: SocietyContactService,
              private mailService: MailService) {

    this.billStages = [
      {label: 'Creation', value: 'CREATION'},
      {label: 'Transmis au client', value: 'TRANSMITTED_TO_CUSTOMER'},
      {label: 'Relance 1', value: 'REVIVAL1'},
      {label: 'Relance 2', value: 'REVIVAL2'},
      {label: 'Email au client', value: 'EMAIL_TO_CUSTOMER'},
      {label: 'Impayée', value: 'UNPAID'},
      {label: 'Payée', value: 'PAID'}
    ];

    this.paymentTypes = [
      {label: 'Non Défini', value: 'NOT_DEFINED'},
      {label: 'Virement', value: 'TRANSFER'},
      {label: 'Prélèvement', value: 'SAMPLE'},
      {label: 'Chèque', value: 'CHECK'},
      {label: 'CB', value: 'CB'}
    ];

    this.currency = [
      {label: 'Euro', value: 'EUR'},
      {label: 'United States Dollars', value: 'USD'},
      {label: 'United Kingdom Pound', value: 'GPB'}
    ];
  }

  ngOnInit() {
    this.editing = this.activeRoute.snapshot.parent.params['reference'] !== undefined;
    // this.resourceReference   TO_DO

    if (this.editing) {
      console.log(this.activeRoute);
      this.billReference = this.activeRoute.snapshot.parent.params['reference'];
      this.billService.getBillByReference(this.billReference)
        .subscribe(response => {
            this.bill = response;
            this.societyContactReference = response.societyContactReference;
            this.societyReference = response.societyReference;
            console.log(this.bill);
          }
          , error =>
            this.router.navigate(['/bills', 'error']));
    } else {
      console.log('ERROR');
      // this.loadSocieties(null);
    }
  }

  downloadPDF() {

    const pdf = new jsPDF();

    const data = document.getElementById('table');

    // const res = pdf.autoTableHtmlToJson(document.getElementById('table'));
    // pdf.text('Le ' + this.bill.createdDate, 120, 10);
    // pdf.text(this.bill.societyName, 70, 30);
    //
    // pdf.autoTable({
    //   head: [['Reference', 'Tarif HT', 'Q', 'TVA', 'Montant HT', 'Montant TTC']],
    //   body: [
    //     [this.bill.reference,
    //       this.bill.unitPrice,
    //       this.bill.quantity,
    //       this.bill.tva,
    //       this.bill.total,
    //       this.bill.totalTtc,
    //     ],
    //   ]
    // });
    pdf.autoTable(data);
    pdf.save('Facture' + this.bill.reference + '.pdf');
  }

  generatePDF(src: string) {
    const data = document.getElementById('divId');
    html2canvas(data).then(canvas => {

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 0, 0);
      pdf.save(this.bill.reference + '.pdf');
    });
  }

  sendMail() {
    console.log(this.societyReference);

    this.societyContactService.getSocietyContactContact(this.societyContactReference, this.societyReference).subscribe(resp => {
      this.mail = resp.email1;

      console.log(this.mail);

      this.email.to = this.mail;
      this.email.messageSubject = 'Facture';
      this.email.messageBody = `// TO_DO`;
      this.mailService.sendMail(this.email).subscribe();
      Swal.fire('Facture envoyée avec succés', 'Opération Réussite!', 'success');
    });

  }

  save(form: NgForm) {

    if (form.valid) {
      this.billService.updateBill(this.bill, this.bill.reference)
        .subscribe(
          response => {

            this.bill = response;
            Swal.fire(
              'Mise à jour!',
              'Données Mise à jour avec succés',
              'success'
            );

          }, error => {
            alert('Erreur lors de la mise à jour des donnés');
          }
        );
    }
  }

}

