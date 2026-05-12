export const AUTH_NOT_IMPLEMENTED_MESSAGE =
  "Fluxo de autenticacao reservado para a etapa de seguranca.";

export function buildAuthNotImplementedPayload() {
  return {
    message: AUTH_NOT_IMPLEMENTED_MESSAGE,
  };
}
