export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  // Add other roles as needed
}

export interface UsuarioEntity {
  usuarioId: number;
  nome: string;
  email: string;
  cpf: string;
  role: UserRole;
  setorId: number;
  unidadeId: number;
  sapiensId: number;
  criadoEm: string; // ISO date string
  ultimoAcesso: string; // ISO date string
}

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  user: UsuarioEntity;
  token: string;
}