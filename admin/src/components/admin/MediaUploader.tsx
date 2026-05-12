export default function MediaUploader() {
  return (
    <form className="create-form">
      <label htmlFor="media-file">Arquivo</label>
      <input id="media-file" name="file" type="file" accept="image/*" />
      <button type="submit">Enviar midia</button>
    </form>
  );
}
