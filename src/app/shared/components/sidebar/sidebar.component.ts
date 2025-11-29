import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class Sidebar implements OnInit {
  private router = inject(Router);
  username: string | null = null;
  private auth = inject(AuthService);
  role: string | null = null;
  expandedMenu: string | null = null; // ✅ Esta propiedad es clave

 ngOnInit() {
    this.username = this.auth.getUsername();
    const rawRole = this.auth.getRole(); // Ej: "ROLE_GERENTE_LOGISTICO"
    this.role = this.formatRole(rawRole);
  }
private formatRole(role: string | null): string {
    if (!role) return 'Invitado';

    // Normaliza el rol: quita prefijo "ROLE_", convierte a palabras legibles
    return role
      .replace(/^ROLE_/, '') // elimina "ROLE_"
      .replace(/_/g, ' ')    // reemplaza guiones bajos por espacios
      .replace(/\b\w/g, char => char.toUpperCase()) // Capitaliza cada palabra
      .replace('Logistico', 'Logístico'); // Corrección ortográfica si es necesario
  }

  toggleMenu(menu: string) {
    // Si ya está abierto, lo cierra; si no, lo abre
    this.expandedMenu = this.expandedMenu === menu ? null : menu;
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  openSupportEmail() {
    const mailtoUrl = 'https://mail.google.com/mail/u/0/?view=cm&fs=1&to=xtebanflo@gmail.com';
    window.open(mailtoUrl, '_blank');
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}