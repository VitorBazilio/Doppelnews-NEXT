type AdBannerProps = {
  label?: string;
};

export default function AdBanner({ label = "Publicidade" }: AdBannerProps) {
  return (
    <aside className="ad-banner" aria-label={label}>
      <span>{label}</span>
    </aside>
  );
}
