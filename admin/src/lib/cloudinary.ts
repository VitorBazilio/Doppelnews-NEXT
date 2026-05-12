export function getCloudinaryStatus() {
  return {
    configured: Boolean(process.env.CLOUDINARY_URL),
  };
}
