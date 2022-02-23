import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageComponent } from './image/image.component';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from './material.module';
import {DialogComponent} from './dialog/dialog.component';
import {TableComponent} from './table/table.component';
import {HttpClientModule} from '@angular/common/http';
import {SceneComponent} from "./pages/scene/scene.component";
import {GraphComponent} from "./graph/graph.component";
import {NgxGraphModule} from "@swimlane/ngx-graph";
import {MatTabsModule} from "@angular/material/tabs";
import {MatChipsModule} from "@angular/material/chips";
import {Instruction1Component} from "./instruction/instruction1/instruction1.component";
import {MatSliderModule} from "@angular/material/slider";
import {MatTooltipModule} from "@angular/material/tooltip";
import {AddRelationComponent} from "./relation/add-relation/add-relation.component";
import {DropDownListComponent} from "./relation/drop-down-list/drop-down-list.component";
import {ObjectLabelPipe} from "./pipe/object-label.pipe";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { MccColorPickerModule} from 'material-community-components';
import {ColorPickerComponent} from "./relation/color-picker/color-picker.component";
import {InfoDialogComponent} from "./table/info-dialog/info-dialog.component";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MessageDialogComponent} from "./pages/scene/message-dialog/message-dialog.component";
import {SortPipe} from "./pipe/sort.pipe";
import {MatRadioModule} from "@angular/material/radio";
import {AddObjectComponent} from "./relation/add-object/add-object.component";
import {JudgeDialogComponent} from "./table/judge-dialog/judge-dialog.component";
import {Instruction2Component} from "./instruction/instruction2/instruction2.component";
import {EvaluationComponent} from "./pages/evaluation/evaluation.component";
import {ReasonDialogComponent} from "./table/reason-dialog/reason-dialog.component";
import {SearchComponent} from "./pages/search/search.component";
import {AdverseComponent} from "./pages/adverse/adverse.component";
import {ImageBoxComponent} from "./image/image-box/image-box.component";
import {StatisticsComponent} from "./pages/adverse/statistics/statistics.component";
import {Instruction3Component} from "./instruction/instruction3/instruction3.component";
import {Dialog2Component} from "./dialog2/dialog2.component";


@NgModule({
  declarations: [
    AppComponent,
    ImageComponent,
    ImageBoxComponent,
    DialogComponent,
    Dialog2Component,
    TableComponent,
    SceneComponent,
    SceneComponent,
    EvaluationComponent,
    SearchComponent,
    AdverseComponent,
    GraphComponent,
    Instruction1Component,
    Instruction2Component,
    Instruction3Component,
    AddRelationComponent,
    AddObjectComponent,
    DropDownListComponent,
    ColorPickerComponent,
    InfoDialogComponent,
    JudgeDialogComponent,
    MessageDialogComponent,
    ReasonDialogComponent,
    StatisticsComponent,
    ObjectLabelPipe,
    SortPipe
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxGraphModule,
    MatTabsModule,
    MatChipsModule,
    MatSliderModule,
    MatTooltipModule,
    MatSnackBarModule,
    MccColorPickerModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  entryComponents: [DialogComponent, Dialog2Component, InfoDialogComponent, MessageDialogComponent, JudgeDialogComponent, ReasonDialogComponent, StatisticsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
