import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Evento } from '../_models/Evento';
import { EventoService } from '../_services/evento.service';
import { BsLocaleService, DateFormatter } from 'ngx-bootstrap/datepicker';
import { defineLocale, ptBrLocale } from 'ngx-bootstrap/chronos';
import { ToastrService } from 'ngx-toastr';
import { DateTimeFormatTypePipe } from '../_helps/DateTimeFormatType.pipe';
defineLocale('pt-br', ptBrLocale);



@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  title = 'Eventos';
  eventosFiltrados: Evento[];
  eventos: Evento[];
  evento: Evento;
  modoSalvar = 'post';
  bodyDeletarEvento = '';

  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;
  registerForm: FormGroup;
  dataEvento: DateTimeFormatTypePipe;


  _filtroLista: string;

  constructor(
    private eventoService: EventoService
    , private fb: FormBuilder
    , private localeService: BsLocaleService
    , private toastr: ToastrService
  ) {
    this.localeService.use('pt-br');
  }

  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  editarEvento(evento: Evento, template: any) {
    this.modoSalvar = 'put';
    this.openModal(template);
    this.evento = evento;
    this.registerForm.patchValue(evento);
  }

  novoEvento(template: any) {
    this.modoSalvar = 'post';
    this.openModal(template);
  }

  excluirEvento(evento: Evento, template: any) {
    this.openModal(template);
    this.evento = evento;
    this.bodyDeletarEvento = `Tem certeza que deseja excluir o Evento: ${evento.tema}, Código: ${evento.id}`;
  }

  confirmeDelete(template: any) {
    this.eventoService.deleteEvento(this.evento.id).subscribe(
      () => {
          template.hide();
          this.getEventos();
          this.toastr.success('Deletado com Sucesso');
        }, error => {
          this.toastr.error(`Erro ao deletar: ${error}`);
        }
    );
  }
  

  openModal(template: any) {
    this.registerForm.reset();
    template.show();
  }

  ngOnInit() {
    this.validation();
    this.getEventos();
  }

  filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }

  validation() {
    this.registerForm = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      imagemURL: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  salvarAlteracao(template: any) {
    if (this.registerForm.valid) {
      if (this.modoSalvar === 'post') {
        this.evento = Object.assign({}, this.registerForm.value);
        this.eventoService.postEvento(this.evento).subscribe(
          (novoEvento: Evento) => {
            template.hide();
            this.getEventos();
            this.toastr.success('Incluido com Sucesso');
          }, error => {
            this.toastr.error(`Erro ao inserir: ${error}`);
          }
        );
      } else {
        this.evento = Object.assign({ id: this.evento.id }, this.registerForm.value);
        this.eventoService.putEvento(this.evento).subscribe(
          () => {
            template.hide();
            this.getEventos();
            this.toastr.success('Editado com Sucesso');
          }, error => {
            this.toastr.error(`Erro ao editar: ${error}`);
          }
        );
      }
    }
  }

  getEventos() {
    this.eventoService.getAllEvento().subscribe(
      (_eventos: Evento[]) => {
        this.eventos = _eventos;
      }, error => {
        this.toastr.error(`Erro ao tentar Carregar eventos: ${error}`);
      });
  }
}