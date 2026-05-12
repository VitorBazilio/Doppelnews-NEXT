import Link from "next/link";

type NavItem = {
  href: string;
  label: string;
};

type NavbarProps = {
  items: NavItem[];
  label?: string;
};

export default function Navbar({ items, label = "Navegacao principal" }: NavbarProps) {
  return (
    <nav aria-label={label} className="primary-nav">
      <ul>
        {items.map((item) => (
          <li key={`${item.href}-${item.label}`}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
