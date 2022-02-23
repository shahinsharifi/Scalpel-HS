import { Edge } from '@swimlane/ngx-graph';

export interface Link extends Edge{
  source_bbox?: any;
  target_bbox?: any;
}

