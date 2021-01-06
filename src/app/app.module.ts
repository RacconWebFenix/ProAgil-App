import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Fazer importação do ClientModule
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importado do '@angular/FormsModule'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importado
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'; // Importado para usar Datepicker
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'; // Importado
import { ModalModule } from 'ngx-bootstrap/modal'; // Importado
import { TooltipModule } from 'ngx-bootstrap/tooltip'; // Importado
import { ToastrModule } from 'ngx-toastr'; // Importado

import { EventoService } from './_services/evento.service';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component'; // Importado
import { EventosComponent } from './eventos/eventos.component'; // Importado
import { DashboardComponent } from './dashboard/dashboard.component';
import { PalestrantesComponent } from './palestrantes/palestrantes.component';
import { ContatosComponent } from './contatos/contatos.component';
import { TituloComponent } from './_shared/titulo/titulo.component'

import { DateTimeFormatTypePipe } from './_helps/DateTimeFormatType.pipe'; // Importado




@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    EventosComponent,
    PalestrantesComponent,
    DashboardComponent,
    ContatosComponent,
    TituloComponent,
    DateTimeFormatTypePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }), // ToastrModule added
    BsDatepickerModule.forRoot(), // Importado
    BsDropdownModule.forRoot(), // Importado
    ModalModule.forRoot(), // Importado
    TooltipModule.forRoot(), // Importado
    HttpClientModule, // Importado do '@angular/common/http'
    FormsModule, // Importado do '@angular/FormsModule'
    ReactiveFormsModule
  ],
  providers: [
    EventoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
