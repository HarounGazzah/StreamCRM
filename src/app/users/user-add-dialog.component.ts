import {Component} from '@angular/core';
import {User} from '../shared/entities/user.model';
import {UserService} from '../shared/services/user.service';
import {AuthService} from '../shared/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {AppNavbarService} from '../app-navbar/app-navbar.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {Email} from '../shared/entities/mail.model';
import {MailService} from '../shared/services/mail.service';

@Component({
  selector: 'app-user-add-dialog',
  templateUrl: './user-add-dialog.component.html',
  styleUrls: ['./user-add-dialog.component.css']
})
export class UserAddDialogComponent {

  currentUser = false;
  user: User = new User();
  reference: string;

  email: Email = new Email();
  staticPassword;

  constructor(private service: UserService,
              private auth: AuthService,
              private toastr: ToastrService,
              private appNavbarService: AppNavbarService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private mailService: MailService,
              public dialogRef: MatDialogRef<UserAddDialogComponent>) {


  }


  save(form: NgForm) {

    if (form.valid) {
      this.service.createUser(this.user)
        .subscribe(response => {
          this.staticPassword = this.user.confirmPassword;

          this.email.to = response.email;
          this.email.messageSubject = 'Accees au compte Streamlink';
          this.email.messageBody = `Bonjour
          
Votre nom d\'utilisateur: ${response.email} 
Votre mot de passe: ${this.staticPassword}

Cordialement,
Streamlink`;
          this.mailService.sendMail(this.email).subscribe();

          this.onClose();
          this.toastr.success('Utilisateur Créé avec succés, un email d\'acces au compte a été envoyé', 'Opération Réussite!');
          this.router.navigate(['/admin/users/edit', response.reference]);

        }, error => {
          // let err = error as HttpErrorResponse;
          this.toastr.error('Erreur lors de la création de l\'Utilisateur :\n' + error.error.description, 'Opération échoué !!!');
        });
    }
  }

  onClose() {
    this.dialogRef.close();
  }

}
