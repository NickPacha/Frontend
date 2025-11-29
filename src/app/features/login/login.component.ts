import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('0.4s ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0.3s ease-in', style({ transform: 'translateY(-100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);  
  
  // Variables de Login (Formulario principal)
  username = '';
  password = '';
  errorMessage = '';
  showPassword = false;
  rememberMe = false;
  loading = false;

  // NUEVAS VARIABLES para Contacto/Soporte
  isSupportView = false; // Controla qué formulario se muestra
  supportName = '';
  supportEmail = '';
  supportMessage = '';
  
  // Destinatario fijo para soporte
  private supportEmailAddress = 'xtebanflo@gmail.com'; 

  login() {
    this.loading = true; 
    this.errorMessage = ''; 
    this.authService.login({ username: this.username, password: this.password })
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
          this.loading = false;
        },
        error: () => {
          this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
          this.loading = false;
        }
      });
  }

  // NUEVA FUNCIÓN: Genera el enlace mailto: y abre el cliente de correo
  sendSupportEmail() {
  if (!this.supportName || !this.supportEmail || !this.supportMessage) {
      return; 
  }

  const subject = encodeURIComponent('Soporte de Acceso a Sistema Empresarial - Problema de Contraseña');
  
  // Cuerpo del mensaje con la información del usuario
  const body = encodeURIComponent(
      `Nombre del Solicitante: ${this.supportName}\n` +
      `Correo de Contacto: ${this.supportEmail}\n\n` +
      `Detalles del Problema:\n${this.supportMessage}\n\n` +
      '--- \nEsta solicitud se generó desde la página de Login.'
  );

  // Genera el enlace específico para la redacción de un nuevo correo en Gmail
  const gmailLink = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${this.supportEmailAddress}&su=${subject}&body=${body}`;
  
  // Abre el enlace en una nueva pestaña (para no interrumpir la página actual)
  window.open(gmailLink, '_blank'); 

  // NOTA: Gmail abre en una nueva pestaña. Aquí simplemente reseteamos el formulario.
  
  // Resetea los campos y regresa al login (simulando "envío")
  this.supportName = '';
  this.supportEmail = '';
  this.supportMessage = '';
  this.showLoginForm();
}

  // NUEVA FUNCIÓN: Cambiar a la vista de soporte
  showSupportForm() {
    this.isSupportView = true;
    this.errorMessage = ''; // Limpiar errores de login
  }

  // NUEVA FUNCIÓN: Volver al login
  showLoginForm() {
    this.isSupportView = false;
  }
}