import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SimulatorPage } from '../simulator/simulator'
import { Events } from 'ionic-angular';
import { Service } from '../../services/penguin.service';

@Component({
  selector: 'page-levels',
  templateUrl: 'levels.html'
})
export class LevelsPage {
	levels: any;
	hitrosti: any;
  izbranLevel: string;

  	constructor(private event: Events, public navCtrl: NavController, private service: Service) {
  		//var imena = ['Bald Head', 'Bodie Island', 'Cape Fear','Cape Hatteras', 'Cape Lookout', 'Croatan Shoal','Currituck Beach', 'Federal Point ', 'Hatteras Beacon','Diamond Shoal', 'Frying Pan Shoals', 'Laurel Point'];
  		 


      var levels:any;
  		
      this.getLevels();
  
  	}

    ngOnInit(){
      
    }
    submitEvent(){
      this.event.publish('Level', this.izbranLevel);
    }

  	itemSelected(level)
  	{
      this.izbranLevel = level.id;
      console.log(this.izbranLevel);
      window.localStorage.selectedLevel =this.izbranLevel;
      window.localStorage.selectedLevelName =level.name;
      this.navCtrl.push(SimulatorPage);
  	}

    getLevels()
    {
      console.log("beeri iz baze");
      this.service.getService('/racetrack','').subscribe(response => {
        console.log(response);
        this.levels = response;

      var vsi = [];
      for(var i = 0; i < this.levels.length; i++)
      {
        var level = new Level();
        level.name = this.levels[i].name;
        level.id = this.levels[i]._id;
        
                
        level.h1 = parseFloat( this.levels[i].snowPercent).toFixed(1);
        level.h2 = parseFloat( this.levels[i].waterPercent).toFixed(1);
        level.h3 = parseFloat( this.levels[i].icePercent).toFixed(1);

        vsi.push(level);


      }
      this.levels=vsi;

        
      })
    }
}
class Level
{
	name:any;
  id:any;
	h1:any;
	h2:any;
	h3:any;
}