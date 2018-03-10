import Link from 'next/link';

const linksArray = [
  { href: 'https://github.com/segmentio/create-next-app', label: 'S&P 500 Movers' },
  { href: '/most-active', label: 'Most Active' },
  { href: '/volume', label: 'Volume Movers' },
];
const links = linksArray.map((link) => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const Nav = () => (
  <div className="c">
    <nav className="row card">
      <div className="col">
        <Link prefetch href="/">
          <a>Home</a>
        </Link>
      </div>

      {links.map(({ key, href, label }) => (
        <div className="col" key={key}>
          <Link href={href}>
            <a>{label}</a>
          </Link>
        </div>
      ))}
    </nav>
  </div>
);

export default Nav;
