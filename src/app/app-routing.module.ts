import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoglistComponent } from './components/doglist/doglist.component';
import { NewDogFormComponent } from './components/new-dog-form/new-dog-form.component';

const routes: Routes = [
  { path: '', component: DoglistComponent },
  { path: 'newdog', component: NewDogFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
