/* Modelo del objeto usuarios*/
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
  foto_copia_ruta_original: string;
  fotoBase64: string;
  fotoNombreBase64: string;
  usuario: string;
  password: string;
  confirmarPassword: string;
  rol_nombre: string;
  rol_id: string;
  descripcion: string;

}

export interface ModelUserLogIn {
  username: string;
  password: string;
}
