import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "./dialog/dialog.component";
import {CommandService} from "./services/command.service";
import {DataService} from "./services/data.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{

  taskId: number = 0;
  sessionId: string = null;

  constructor(private route: ActivatedRoute, private router: Router, private commandService: CommandService, public dialog: MatDialog, private dataService :DataService) {
    this.route.queryParams.subscribe(params => {
      if (params['t'] && (params['t'] == 1 || params['t'] == 2))
        this.taskId = params['t'];

      if (params['session_id'] && params['session_id'] != '') {
        this.sessionId = params['session_id'];
        if (this.sessionId != null) {
          this.commandService.execute('session/get/count/' + this.sessionId, 'GET', 'json', {}, true).subscribe((metadata) => {
            let counter = metadata.counter;
            if (this.router.url.indexOf('/evaluation') == -1 && counter == 0) {
              this.openInstructionWindow(this.taskId);
            }
          }, (error => {
            console.error(error);
          }));
        }
      }
    });
  }

  ngOnInit(): void {
    this.commandService.execute('scene/get/metadata', 'GET', 'json', {}, true).subscribe((metadata) => {
      this.dataService.objects = metadata['objects'];
      this.dataService.relations = metadata['relations'];
      if(this.router.url.indexOf('/evaluation') == -1 && this.router.url.indexOf('/cats4ml') == -1 && !this.dataService.showInstruction) {
        this.openInstructionWindow(this.taskId);
      }
    }, (error => {
      console.error(error);
    }));




  }

  openInstructionWindow(taskId) {
    const dialogRef = this.dialog.open(DialogComponent, {
      hasBackdrop: true,
      backdropClass: 'backdrop',
      minHeight: '800px',
      autoFocus: false,
      disableClose: true,
      data:{
        taskId: taskId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!this.dataService.showInstruction)
        this.dataService.showInstruction = true;
      console.log('instruction window is closed');
    });
  }

}

