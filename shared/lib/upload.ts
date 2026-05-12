export const MAX_UPLOAD_SIZE_MB = 5;

export function buildUploadNotImplementedPayload() {
  return {
    message: "Upload reservado para a etapa de midia do painel.",
    maxSizeMb: MAX_UPLOAD_SIZE_MB,
  };
}
