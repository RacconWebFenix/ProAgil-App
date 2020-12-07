
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; //Fazer importação do ClientModule
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms'; //Importado do '@angular/FormsModule'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; //Importado
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'; //Importado
import { ModalModule } from 'ngx-bootstrap/modal'; //Importado
import { TooltipModule } from 'ngx-bootstrap/tooltip'; //Importado

import { EventoService } from './_services/evento.service';

import { AppComponent } from './app.component';
import { EventosComponent } from './eventos/eventos.component'; //Importado
import { NavComponent } from './nav/nav.component'; //Importado

import { DateTimeFormatTypePipe } from './_helps/DateTimeFormatType.pipe'; //Importado




@NgModule({
  declarations: [
    AppComponent,
    EventosComponent,
    NavComponent,
    DateTimeFormatTypePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, //Importado
    BsDropdownModule.forRoot(), //Importado
    ModalModule.forRoot(), //Importado
    TooltipModule.forRoot(), //Importado
    HttpClientModule, //Importado do '@angular/common/http'
    FormsModule //Importado do '@angular/FormsModule'
  ],
  providers: [
    EventoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
