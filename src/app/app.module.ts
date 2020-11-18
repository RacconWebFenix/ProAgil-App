import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; //Fazer importação do ClientModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventosComponent } from './eventos/eventos.component';



@NgModule({
  declarations: [
    AppComponent,
    EventosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule //Importado do '@angular/common/http'
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
