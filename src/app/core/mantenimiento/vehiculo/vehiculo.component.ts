import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { VehiculoService } from './vehiculo.service';
import { Vehiculo, Nivel } from './vehiculo.model';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-vehiculo',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {
  vehiculos: Vehiculo[] = [];
  niveles: Nivel[] = [];
  form: FormGroup;
  editing = false;
  loading = false;
  selectedId: number | null = null;
  searchText = '';

  // simple pagination (client-side)
  page = 1;
  pageSize = 10;

  constructor(private fb: FormBuilder, private svc: VehiculoService) {
    this.form = this.fb.group({
      placa: ['', [Validators.required, Validators.maxLength(7)]],
      marca: ['', Validators.maxLength(30)],
      modelo: ['', Validators.maxLength(30)],
      nivelId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadNiveles();
    this.loadVehiculos();
  }

  loadNiveles(): void {
    this.svc.listNiveles().subscribe({
      next: res => {
        console.log("NIVELES RECIBIDOS:", res); // 👈 Aquí vemos si llegan o no
        this.niveles = res;
      },
      error: err => console.error('Error cargando niveles', err)
    });
  }

  loadVehiculos(): void {
    this.loading = true;
    this.svc.listVehiculos().pipe(finalize(() => this.loading = false)).subscribe({
      next: res => {
        this.vehiculos = Array.isArray(res) ? res : [];
      },
      error: err => {
        console.error('Error cargando vehiculos', err);
      }
    });
  }

  startCreate(): void {
    this.editing = true;
    this.selectedId = null;
    this.form.reset();
  }

  startEdit(v: Vehiculo): void {
    this.editing = true;
    this.selectedId = v.id ?? null;
    this.form.patchValue({
      placa: v.placa,
      marca: v.marca,
      modelo: v.modelo,
      nivelId: typeof v.nivel === 'number' ? v.nivel : v.nivel?.id ?? null
    });
    // scroll to form if needed
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  }

  cancel(): void {
    this.editing = false;
    this.selectedId = null;
    this.form.reset();
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const payload = {
      placa: this.form.value.placa,
      marca: this.form.value.marca,
      modelo: this.form.value.modelo,
      nivel: { id: this.form.value.nivelId }
    };

    this.loading = true;
    if (this.selectedId) {
      this.svc.updateVehiculo(this.selectedId, payload).pipe(finalize(() => this.loading = false)).subscribe({
        next: () => {
          this.loadVehiculos();
          this.cancel();
        },
        error: err => {
          console.error('Error actualizando', err);
        }
      });
    } else {
      this.svc.createVehiculo(payload).pipe(finalize(() => this.loading = false)).subscribe({
        next: () => {
          this.loadVehiculos();
          this.cancel();
        },
        error: err => {
          console.error('Error creando', err);
        }
      });
    }
  }

  remove(v: Vehiculo): void {
    if (!v.id) return;
    const ok = confirm(`¿Eliminar vehículo ${v.placa}? (Se aplicará borrado lógico)`);
    if (!ok) return;
    this.svc.deleteVehiculo(v.id).subscribe({
      next: () => this.loadVehiculos(),
      error: err => console.error('Error eliminando', err)
    });
  }

  // filtering client-side simple
  get filteredVehiculos(): Vehiculo[] {
    const q = this.searchText.trim().toLowerCase();
    let arr = this.vehiculos;
    if (q) {
      arr = arr.filter(x =>
        (x.placa ?? '').toLowerCase().includes(q) ||
        (x.marca ?? '').toLowerCase().includes(q) ||
        (x.modelo ?? '').toLowerCase().includes(q) ||
        String(x.nivel ?? '').toLowerCase()
      );
    }
    return arr;
  }

  // helpers for template
  nivelCodigo(n: any): string {
    if (!n) return '';
    return typeof n === 'number' ? String(n) : (n.codigo ?? '');
  }
}
