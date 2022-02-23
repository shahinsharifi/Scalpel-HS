import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Relation} from "../../relation/relation";
import {Bbox} from "../../image/bbox";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {CommandService} from "../../services/command.service";
import {DataService} from "../../services/data.service";
import {MatDialog} from "@angular/material/dialog";
import {TimeService} from "../../services/time.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";

export interface SessionElement {
  is_typical: boolean;
  reason: string;
  instruction: number;
  task_id: number;
  wrong_label: boolean;
  effort: number;
  id: number;
}

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class EvaluationComponent implements OnInit {

  dataSource = new MatTableDataSource<SessionElement>([]);
  selection = new SelectionModel<SessionElement>(false, []);
  tableDef1: Array<any> = [
    {
      name: 'select',
      display: ''
    },
    {
      name: 'worker',
      display: 'Worker ID'
    },
    {
      name: 'wrong_label',
      display: 'Wrong Scene Label?'
    },
    {
      name: 'reason',
      display: 'Reason'
    },
    {
      name: 'instruction',
      display: 'Instruction(Sec)'
    },
    {
      name: 'effort',
      display: 'Task(Sec)'
    }
  ];
  tableDef2: Array<any> = [
    {
      name: 'select',
      display: ''
    },
    {
      name: 'task_id',
      display: 'Task'
    },
    {
      name: 'is_typical',
      display: 'Typical Scene?'
    },
    {
      name: 'wrong_label',
      display: 'Wrong Scene Label?'
    },
    {
      name: 'reason',
      display: 'Reason'
    },
    {
      name: 'instruction',
      display: 'Instruction(Sec)'
    },
    {
      name: 'effort',
      display: 'Task(Sec)'
    }
  ];
  columnsToDisplay1 = ['select', 'worker', 'wrong_label', 'reason','instruction', 'effort'];
  columnsToDisplay2 = ['select', 'is_typical','wrong_label','reason','instruction','effort'];
  expandedElement: SessionElement | null;

  taskId: number = 0;
  width: number;
  breakpoint: number;
  addNewRelationActive: boolean;
  activateAddRelation: boolean = false;
  activeBboxDrawing = false;
  selectedDataTabIndex: number = 0;
  selectedImageTabIndex: number = 0;
  isSceneAvailable: boolean;
  isImageLoaded: boolean = false;
  showError: boolean = false;
  sceneImage: any;
  predictedImage: any;
  sceneCategory: any;
  predictedCategory: any;
  weight: number;
  sceneGraph: Relation[];
  boxes: Bbox[];
  currentTab: any = 'table';
  tiles: any[] = [
    {text: 'image', cols: 1, rows: 1, color: 'white'},
    {text: 'graph', cols: 1, rows: 1, color: '#a3a3a3'}
  ];
  @ViewChild('parentElement', {static: true}) imageContainerParent;
  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private commandService: CommandService, private dataService: DataService,
              private command: CommandService, public dialog: MatDialog, private route: ActivatedRoute, private time: TimeService) {
    this.subscriptions.push(this.route.queryParams.subscribe(params => {
      if (params['t'] && (params['t'] == 1 || params['t'] == 2))
        this.taskId = params['t'];
    }));
    this.subscriptions.push(this.selection.changed.subscribe(this.onSessionIdChanged.bind(this)));
  }

  ngOnInit() {
    this.adjustLayout(window.innerWidth);
    this.width = this.imageContainerParent.nativeElement.clientWidth;
    this.loadMetadata();
  }


  onResize(event) {
    this.adjustLayout(event.target.innerWidth);
  }


  adjustLayout(innerWidth){
    this.breakpoint = (innerWidth < 1000) ? 1 : 2;
    if(this.breakpoint == 1){
      this.tiles[0].cols = 1;
    }else{
      this.tiles[0].cols = 1;
    }
  }


  loadMetadata() {
    this.command.execute('session/get/' + this.taskId, 'GET', 'json', {}, true).subscribe((response) => {
      this.dataSource = response;
      if (this.dataSource[0])
        this.selection.toggle(this.dataSource[0]);
      this.loadScene();
    }, (error => {
      console.error(error);
    }));
  }


  loadScene() {
    let sessionId = (this.selection.selected[0]) ? this.selection.selected[0].id : this.dataSource[0].id;
    this.command.execute('annotation/get/' + sessionId, 'GET', 'json', {}, true).subscribe((scene) => {
      this.sceneImage = scene['image'];
      this.predictedImage = 'ppp_' + scene['image'];
      this.sceneCategory = scene['category'];
      this.predictedCategory = scene['prediction'];
      this.weight = scene['weight'];
      this.dataService.refreshRelations(scene['graph']);
      if(this.taskId == 0)
        this.taskId = scene['task_id'];
      if(this.taskId == 2) {
        this.selectedImageTabIndex = 1;
        this.activeBboxDrawing = false;
      }
      this.isSceneAvailable = true;
      this.isImageLoaded = true;
      this.selectedImageTabIndex = 1;
      this.showError = false;
    }, (error => {
      console.error(error);
      this.isSceneAvailable = false;
      this.showError = true;
    }));
  }


  onTableSelected(relation: Relation) {
    let boxes: Bbox[] = [];
    if (relation == null) {
      this.dataService.removeBoxes();
    } else {
      if (relation.object1Bbox != null) {
        let bbox = relation.object1Bbox.replace('[', '').replace(']', '').split(',');
        let box1 = new Bbox(relation.object1Label, '#197FE1', +bbox[0], +bbox[1], +bbox[2], +bbox[3]);
        boxes.push(box1);
      }
      if (relation.object2Bbox != null) {
        let bbox = relation.object2Bbox.replace('[', '').replace(']', '').split(',');
        let box2 = new Bbox(relation.object2Label, '#E10001', +bbox[0], +bbox[1], +bbox[2], +bbox[3]);
        boxes.push(box2);
      }
      this.dataService.addBoxes(boxes);
    }
  }


  onSessionIdChanged(){
    this.selectedImageTabIndex = 0;
    this.isImageLoaded = false;
    this.sceneImage = null;
    this.predictedImage = null;
    this.sceneCategory = null;
    this.predictedCategory = null;
    this.weight = null;
    this.sceneGraph = [];
    this.boxes = [];
    this.loadScene();
  }


  reset() {
    this.taskId = null;
    this.width = null;
    this.breakpoint = null;
    this.selectedDataTabIndex = 0;
    this.selectedImageTabIndex = 0;
    this.isSceneAvailable = false;
    this.isImageLoaded = false;
    this.sceneImage = null;
    this.predictedImage = null;
    this.sceneCategory = null;
    this.predictedCategory = null;
    this.weight = null;
    this.sceneGraph = [];
    this.boxes = [];
    this.currentTab = 'table';
    this.addNewRelationActive = false;
    this.route.queryParams.subscribe(params => {
      if (params['t'] && (params['t'] == 1 || params['t'] == 2))
        this.taskId = params['t'];
    });
  }


  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
