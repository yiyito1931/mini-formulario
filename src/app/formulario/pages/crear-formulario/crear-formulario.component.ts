import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-formulario.component.html',
  styleUrls: ['./crear-formulario.component.scss']
})
export class CrearFormularioComponent {
  mostrarModal = false;
  mensajeModal = '';
  url = '';
  namespace = '';
  cluster = '';
  isFormValid = false;
  mostrarBotonApuntamiento = false;
  countdownEnviar: number = 0;
  countdownCambiar: number = 0;
  isCountdownRunningEnviar: boolean = false;
  isCountdownRunningCambiar: boolean = false;

  ngOnInit() {
    this.checkFormValidity();
  }

  checkFormValidity() {
    this.isFormValid = !!this.url.trim() && !!this.namespace.trim() && !!this.cluster.trim();
  }

  iniciarProceso() {
    this.startCountdownEnviar(() => {
      this.mensajeModal = '✅ Proceso finalizado';
      this.mostrarModal = true;
      this.mostrarBotonApuntamiento = true;
    });
  }

  cambiarApuntamiento() {
    this.startCountdownCambiar(() => {
      this.mensajeModal = '✅ Cambio de apuntamiento realizado';
      this.mostrarModal = true;
    });
  }

  startCountdownEnviar(callback: () => void) {
    this.countdownEnviar = 5 * 60; // 5 minutos en segundos
    this.isCountdownRunningEnviar = true;
    const interval = setInterval(() => {
      this.countdownEnviar--;
      if (this.countdownEnviar <= 0) {
        clearInterval(interval);
        this.isCountdownRunningEnviar = false;
        callback();
      }
    }, 1000);
  }

  startCountdownCambiar(callback: () => void) {
    this.countdownCambiar = 10; // 5 minutos en segundos
    this.isCountdownRunningCambiar = true;
    const interval = setInterval(() => {
      this.countdownCambiar--;
      if (this.countdownCambiar <= 0) {
        clearInterval(interval);
        this.isCountdownRunningCambiar = false;
        callback();
      }
    }, 1000);
  }

  formatCountdown(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${this.padZero(minutes)}:${this.padZero(remainingSeconds)}`;
  }

  padZero(num: number): string {
    return num.toString().padStart(2, '0');
  }

  cerrarModal() {
    this.mostrarModal = false;
  }
}