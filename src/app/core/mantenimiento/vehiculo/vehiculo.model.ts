export interface Nivel {
  id?: number;
  codigo?: string;
  m3Min?: number;
  m3Max?: number;
}

export interface Vehiculo {
  id?: number;
  placa: string;
  marca?: string;
  modelo?: string;
  nivel: number; // backend devuelve objeto Nivel; al crear puede enviarse id
  estado?: string; // 'A' | 'I'
}
