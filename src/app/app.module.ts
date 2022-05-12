import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DogComponent } from './components/dog/dog.component';
import { DoglistComponent } from './components/doglist/doglist.component';

@NgModule({
  declarations: [AppComponent, DogComponent, DoglistComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
