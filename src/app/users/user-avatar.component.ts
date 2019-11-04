import {Component} from '@angular/core';
import {Photo} from '../shared/entities/photo.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../shared/services/user.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.css']
})
export class UserAvatarComponent {

  referenceUser: string;
  fileToUpload: File = null;
  f: File = null;
  urlToReturn = '';

  photos: Photo[];
  photo: Photo;
  url: any;

  constructor(private router: Router,
              private activeRoute: ActivatedRoute,
              private service: UserService,
              private toastr: ToastrService) {


    this.referenceUser = activeRoute.snapshot.params['reference'];
    this.urlToReturn = '/' + activeRoute.snapshot.parent.url[0].toString();

    this.service.getPhotoByUserReference(this.referenceUser).subscribe(resp => {
      this.url = resp.url;
      this.photo = resp;
    });

    this.service.getUsersAvatars(this.referenceUser)
      .subscribe(response => this.photos = response
        ,
        error =>
          this.router.navigate([this.urlToReturn, 'error']));

  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  save(form: NgForm) {

    if (form.valid) {
      this.service.createUserAvatar(this.fileToUpload, this.referenceUser)
        .subscribe(data => {
          this.photo = data;
         // this.photos.push(data);
          this.fileToUpload = null;
          this.f = null;
          this.service.getPhotoByUserReference(this.referenceUser).subscribe(resp => {
            this.url = resp.url;
            this.photo = resp;
          });
        }, error => {
          this.toastr.error('Erreur lors de la Création du Photo', 'Opération échoué !!!');
        });
    }
  }

  deletePhoto(index: number) {

    if (confirm('Suppression du Photo')) {
      const cv = this.photos[index];


      this.service.deleteAvatar(cv.reference, this.referenceUser)
        .subscribe(response => {

          this.photos.splice(index, 1);
        }, error => {
          this.toastr.error('Erreur lors de la Suppression du Photo', 'Opération échoué !!!');
        });
    }
  }
}
