import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ProjectService} from '../shared/services/project.service';
import {ProjectPos} from '../shared/entities/project-pos.model';
import {ResourceService} from '../shared/services/resource.service';
import {NeedService} from '../shared/services/need.service';
import {UserService} from '../shared/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project-info',
  moduleId: module.id,
  templateUrl: 'project-info-editor.component.html',
  styleUrls: ['project-info-editor.component.scss']

})
export class ProjectInfoEditorComponent implements OnInit {

  editing = false;

  projectPos: ProjectPos = new ProjectPos();

  users: any[];
  stages: any[];
  needs: any = [];
  resources: any = [];

  // projectInfo: ProjectInformation = new ProjectInformation();


  constructor(private projectService: ProjectService,
              private resourceService: ResourceService,
              private needService: NeedService,
              private userService: UserService,
              private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute,
              private activeRoute: ActivatedRoute) {

    this.editing = activeRoute.snapshot.parent.params['mode'] === 'edit';


  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(response => {
      this.users = response;
    });


    this.stages = [
      {label: 'Tous', value: ''},
      {label: 'Non definie', value: 'NOT_DEFINED'},
      {label: 'En attente', value: 'Waiting'},
      {label: 'Présenter au client', value: 'PresentedToClient'},
      {label: 'Envoye CV', value: 'SendingCV'},
      {label: 'Rejeter', value: 'Rejected'},
      {label: 'Gagné', value: 'Won'},
      {label: 'Positionné', value: 'Positioned'}];

    const ref = this.route.snapshot.params.reference;
    console.log(this.route);

    this.projectService.getProject(ref).subscribe(res => {
      this.projectPos = res;

    });
    this.needService.getNeeds().subscribe(res => {
      this.needs = res;

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

  updateProject(form: NgForm) {
    this.projectService.updateProject(this.projectPos, this.projectPos.reference).subscribe(res => {
      this.projectPos = res;
      Swal.fire('Données Mise à jour avec succés', 'Opération Réussite!', 'success');
      this.toastr.success('Données Mise à jour avec succés', 'Opération Réussite!');
      this.router.navigateByUrl('/projects');

    }, error => {
      Swal.fire('Erreur lors de la modification de du Positionnement', 'Opération échoué !!!', 'error');
      this.toastr.error('Erreur lors de la modification de du Positionnement', 'Opération échoué !!!');
    });
  }


  public diff_years(dt2, dt1) {

    let diff: any = (dt2.getTime() - dt1.getTime());
    diff /= (60 * 60 * 24);
    return Math.abs(Math.round(diff / 365.25)).toString();
  }


  // save(form: NgForm) {
  //
  //   if (form.valid) {
  //     if (this.editing) {
  //
  //       this.service.updateProjectInformation(this.projectInfo, this.projectInfo.projectReference)
  //         .subscribe(response => {
  //
  //           this.projectInfo = response;
  //           this.toastr.success('Données Mise à jour avec succés', 'Opération Réussite!');
  //
  //         }, error => {
  //           this.toastr.error('Erreur lors de la mise à jour des donnés', 'Opération échoué !!!');
  //         });
  //     }
  //   }
  // }
}
