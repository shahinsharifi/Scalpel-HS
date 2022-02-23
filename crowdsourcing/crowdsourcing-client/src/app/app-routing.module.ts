import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SceneComponent} from "./pages/scene/scene.component";
import {EvaluationComponent} from "./pages/evaluation/evaluation.component";
import {SearchComponent} from "./pages/search/search.component";
import {AdverseComponent} from "./pages/adverse/adverse.component";


const routes: Routes = [
  { path: 'scene', component: SceneComponent },
  { path: 'evaluation', component: EvaluationComponent },
  { path: 'cats4ml', component: AdverseComponent },
  { path: '', redirectTo: '/scene', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
