import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StreamsComponent} from '../components/steams/streams.component';


const routes: Routes = [
  {
    path: 'streams',
    component: StreamsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class StreamsRoutingModule { }
