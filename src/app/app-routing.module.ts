import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoglistComponent } from './components/doglist/doglist.component';

const routes: Routes = [{ path: '', component: DoglistComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
