export interface ModelUserData {
  id: string;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  cedula: string;
  correo: string;
  celular: string;
  foto: string;
  usuario: string;
  password: string;
  rol_nombre: string;
  rol_id: string;
  descripcion: string;

}

export interface ModelUserLogIn {
  username: string;
  password: string;
}
