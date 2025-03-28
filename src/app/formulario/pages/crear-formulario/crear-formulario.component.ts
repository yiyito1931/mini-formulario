import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MigrationService } from '../services/migration.service';
import { MigrationPayload } from '../services/migration.interface';

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
  totalDurationEnviar: number = 0;
  totalDurationCambiar: number = 0;

  constructor(private migrationService: MigrationService) {}

  ngOnInit() {
    this.checkFormValidity();
  }

  checkFormValidity() {
    this.isFormValid = !!this.url.trim() && !!this.namespace.trim() && !!this.cluster.trim();
  }

  submitForm() {
    if (!this.isFormValid) return;

    this.startCountdownEnviar(() => {
      const payload: MigrationPayload = {
        url: this.url,
        namespace: this.namespace,
        cluster: this.cluster
      };

      // Codificación de llamada a API comentada
      /*
      this.migrationService.migrate(payload).subscribe({
        next: () => {
          this.mensajeModal = 'Migración exitosa';
          this.mostrarModal = true;
          this.mostrarBotonApuntamiento = true; // Mostrar el botón después de la migración exitosa
        },
        error: () => {
          this.mensajeModal = 'Error en el proceso de migración';
          this.mostrarModal = true;
        }
      });
      */

      // Mockup de respuesta
      this.mockApiResponse();
    });
  }

  mockApiResponse() {
    // Simular un retraso para la respuesta de la API
    setTimeout(() => {
      const success = true; // Cambiar a false para simular un error

      if (success) {
        this.mensajeModal = 'Migración exitosa';
        this.mostrarBotonApuntamiento = true; // Mostrar el botón después de la migración exitosa
      } else {
        this.mensajeModal = 'Error en el proceso de migración';
      }

      this.mostrarModal = true;
    }, 1000); // Retraso de 1 segundo
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
    this.totalDurationEnviar = 5; // 5 segundos
    this.countdownEnviar = this.totalDurationEnviar;
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
    this.totalDurationCambiar = 10; // 10 segundos
    this.countdownCambiar = this.totalDurationCambiar;
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

  getPercentageRemainingEnviar(): number {
    return ((this.totalDurationEnviar - this.countdownEnviar) / this.totalDurationEnviar) * 100;
  }

  getPercentageRemainingCambiar(): number {
    return ((this.totalDurationCambiar - this.countdownCambiar) / this.totalDurationCambiar) * 100;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }
}