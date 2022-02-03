import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { ApiService } from '../services/api-service.service';
import { Chart, DoughnutController, ArcElement } from 'chart.js';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit, AfterViewChecked {
  @Input() name: string;
  diskInfo = null;
  loading;

  constructor(
    private api: ApiService,
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingController: LoadingController) 
  {}

  async ngOnInit()
  {
    await this.presentLoading();
    Chart.register(DoughnutController, ArcElement)    

    this.api.getControlCenterInfo().subscribe(result => {
      if(result != null && result != undefined)
      {
        this.diskInfo = result;
        this.loading.dismiss();
      }
    }, err => {
      this.onError(err);
    });
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      spinner: 'crescent',
      message: 'Loading ...'
    });

    await this.loading.present();
  }

  ngAfterViewChecked()
  {
    if(this.diskInfo != null)
    {
      this.loadCharts();
    }
  }

  loadCharts()
  {
      for(let i = 0;i<this.diskInfo.length;i++)
      {
        if(this.diskInfo[i].chart == undefined)
        {
          const canv = <HTMLCanvasElement> document.getElementById('disk'+i);
          const ctx = canv.getContext('2d');
          this.diskInfo[i].chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
              datasets: [{
                data: [this.diskInfo[i].size - this.diskInfo[i].freeSpace,  this.diskInfo[i].freeSpace],
                backgroundColor: [
                  'rgba(38,160,218,1)',
                  'rgba(230,230,230,1)'
                ],
                borderColor: 'rgba(188,188,188,1)'
              }]     
            },
            options: {
              responsive: true,
              aspectRatio: 1
            }
          });
        }
      } 
  }

  refresh()
  {
    this.presentLoading();
    this.api.getControlCenterInfo().subscribe(result => {
      if(result != null && result != undefined)
      {
        this.diskInfo = result;
        this.loading.dismiss();
      }
    }, err => {
      this.onError(err);
    });  
  }

  async shutdown()
  {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Shutdown?!?!',
      message: 'Shutdown the command center?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.api.sendShutdown().subscribe(async result => {
              const toast = await this.toastController.create({
                message: 'Shutdown command sent.',
                duration: 2000,
                color: 'success'
              });

              toast.present();
            }, err => {
              this.onError(err);
            });
          }
        },
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary'
        }
      ]
    });

    await alert.present();
  }

  onError(err)
  {
    console.log(err);
  }
}
