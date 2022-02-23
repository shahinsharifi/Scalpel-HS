import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import * as shape from 'd3-shape';
import { Layout } from '@swimlane/ngx-graph';
import {Object} from "./object";
import { Subject } from 'rxjs';
import {Relation} from "../relation/relation";
import * as _ from 'lodash';
import {Link} from "./link";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GraphComponent implements OnInit {

  @Input('relations') relations: Relation[];
  @Output('onRelationSelected') onRelationSelected = new EventEmitter();
  zoomToFit$: Subject<boolean> = new Subject();

  nodes: Object[] = [];
  links: Link[] = [];

  layout: String | Layout = 'colaForceDirected';

  // line interpolation
  curveType: string = 'Bundle';
  curve: any = shape.curveLinear;

  draggingEnabled: boolean = true;
  panningEnabled: boolean = true;
  zoomEnabled: boolean = true;

  zoomSpeed: number = 0.1;
  minZoomLevel: number = 0.1;
  maxZoomLevel: number = 4.0;
  panOnZoom: boolean = true;

  autoZoom: boolean = false;
  autoCenter: boolean = true;


  ngOnInit() {
    this.setInterpolationType(this.curveType);
    this.parseGraph();
    this.fitGraph();
  }

  setInterpolationType(curveType) {
    this.curveType = curveType;
    if (curveType === 'Bundle') {
      this.curve = shape.curveBundle.beta(1);
    }
    if (curveType === 'Cardinal') {
      this.curve = shape.curveCardinal;
    }
    if (curveType === 'Catmull Rom') {
      this.curve = shape.curveCatmullRom;
    }
    if (curveType === 'Linear') {
      this.curve = shape.curveLinear;
    }
    if (curveType === 'Monotone X') {
      this.curve = shape.curveMonotoneX;
    }
    if (curveType === 'Monotone Y') {
      this.curve = shape.curveMonotoneY;
    }
    if (curveType === 'Natural') {
      this.curve = shape.curveNatural;
    }
    if (curveType === 'Step') {
      this.curve = shape.curveStep;
    }
    if (curveType === 'Step After') {
      this.curve = shape.curveStepAfter;
    }
    if (curveType === 'Step Before') {
      this.curve = shape.curveStepBefore;
    }
  }


  parseGraph() {
    let nodes: Object[] = [];
    let links: Link[] = [];
    _.forEach(this.relations, (relation: Relation, inx) => {
      let index = _.findIndex(nodes, (n) => {
        return n.id == relation.object1Label.toString()
      });
      if (index == -1) {
        nodes.push({
          id: relation.object1Label.toString(),
          label: relation.object1Label.toString(),
          bbox: relation.object1Bbox
        });
      }
      index = _.findIndex(nodes, (n) => {
        return n.id == relation.object2Label.toString()
      });
      if (index == -1) {
        nodes.push({
          id: relation.object2Label.toString(),
          label: relation.object2Label.toString(),
          bbox: relation.object2Bbox
        });
      }
      index = _.findIndex(links, (n) => {
        return n.id == relation.relationLabel.toString() + relation.id.toString()
      });
      if (index == -1) {
        links.push({
          id: relation.relationLabel.toString() + relation.id.toString(),
          source: relation.object1Label.toString(),
          target: relation.object2Label.toString(),
          label: relation.relationLabel.toString(),
          source_bbox: relation.object1Bbox,
          target_bbox: relation.object2Bbox
        });
      }
    });

    this.nodes = nodes;
    this.links = links;
  }

  fitGraph() {
    this.zoomToFit$.next(true)
  }

  onMouseEnter(element , type) {

    if (type == 'object') {
      let relation = new Relation();
      relation.object1Label = (element as Object).label;
      relation.object1Bbox = (element as Object).bbox;
      this.onRelationSelected.emit(relation);
    } else {
      let relation = new Relation();
      relation.object1Label = (element as Link).source;
      relation.object1Bbox = (element as Link).source_bbox;
      relation.object2Label = (element as Link).target;
      relation.object2Bbox = (element as Link).target_bbox;
      this.onRelationSelected.emit(relation);
    }
  }

  onMouseLeave(){
    this.onRelationSelected.emit(null);
  }

}
