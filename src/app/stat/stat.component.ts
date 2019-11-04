import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/services/user.service';
import {SocietyService} from '../shared/services/society.service';
import {NeedService} from '../shared/services/need.service';
import {BillService} from '../shared/services/bill.service';
import {DeveloperService} from '../shared/services/developer.service';
import {ResourceService} from '../shared/services/resource.service';
import {ProjectService} from '../shared/services/project.service';
import {ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {

  userNumbers: any;
  societyNumbers: any;
  needsNumbers: any;
  projectsNumbers: any;
  resourcesNumbers: any;
  developersNumbers: any;
  billNumbers: any;
  internResources: any;
  externalResources: any;
  emailToCustomer: any;
  transmittedToCustomer: any;
  revival1: any;
  revival2: any;
  paid: any;
  unpaid: any;
  creation: any;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = [''];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData: any = [];

  // pie

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [['Consultants Externe'], ['Consultants Interne']];
  public pieChartLabels2: Label[] = [
    ['Payée'],
    ['Impayée'],
    ['Création'],
    ['Transmit au client']
  ];

  public pieChartData: any[] = [];
  public pieChartData2: any[] = [];

  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  // public pieChartColors = [
  //   {
  //     backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
  //   },
  // ];

  constructor(private userService: UserService,
              private societyService: SocietyService,
              private needService: NeedService,
              private billService: BillService,
              private developerService: DeveloperService,
              private resourceService: ResourceService,
              private projectService: ProjectService) {

  }

  ngOnInit() {
    this.userService.usersCount()
      .subscribe(res => {
        this.userNumbers = res;

        this.societyService.societyCount()
          .subscribe(resp => {
            this.societyNumbers = resp;

            this.needService.needCount()
              .subscribe(needs => {
                this.needsNumbers = needs;

                this.billService.billsCount()
                  .subscribe(bills => {
                    this.billNumbers = bills;

                    this.developerService.developersCount()
                      .subscribe(developers => {
                        this.developersNumbers = developers;

                        this.resourceService.resourceCount()
                          .subscribe(resources => {
                            this.resourcesNumbers = resources;

                            this.projectService.projectCount()
                              .subscribe(projects => {
                                this.projectsNumbers = projects;

                                // this.pieChartData = [this.needsNumbers, this.projectsNumbers];
                                this.barChartData = [
                                  {
                                    data: [this.societyNumbers],
                                    label: 'Sociétés'
                                  },
                                  {
                                    data: [this.userNumbers],
                                    label: 'Utilisateurs'
                                  },
                                  {
                                    data: [this.needsNumbers],
                                    label: 'Besoins'
                                  },
                                  {
                                    data: [this.projectsNumbers],
                                    label: 'Projets'
                                  },
                                  {
                                    data: [this.billNumbers],
                                    label: 'Factures'
                                  },
                                  {
                                    data: [this.developersNumbers],
                                    label: 'Candidats'
                                  },
                                  {
                                    data: [this.resourcesNumbers],
                                    label: 'Resources'
                                  }
                                ];
                              });
                          });
                      });
                  });
              });
          });
      });


    this.resourceService.resourceByType('InternalConsultant')
      .subscribe(res => {
        this.internResources = res.length;

        this.resourceService.resourceByType('ExternalConsultant')
          .subscribe(res2 => {
            this.externalResources = res2.length;

            console.log(this.internResources);
            console.log(this.externalResources);
            this.pieChartData = [this.internResources, this.externalResources];

          });

      });


    this.billService.billByType('PAID')
      .subscribe(paid => {
        this.paid = paid.length;

        this.billService.billByType('UNPAID')
          .subscribe(unpaid => {
            this.unpaid = unpaid.length;

            this.billService.billByType('CREATION')
              .subscribe(creation => {
                this.creation = creation.length;

                this.billService.billByType('TRANSMITTED_TO_CUSTOMER')
                  .subscribe(transmittedToCustomer => {
                    this.transmittedToCustomer = transmittedToCustomer.length;

                    this.pieChartData2 = [
                      this.paid,
                      this.unpaid,
                      this.transmittedToCustomer,
                      this.creation
                    ];
                  });
              });
          });
      });
  }
}
