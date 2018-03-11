import Link from 'next/link';

const linksArray = [{ href: '/', label: 'S&P 500 Movers' }, { href: '/quotes', label: 'Quotes' }];
const links = linksArray.map((link) => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const Nav = () => (
  <div className="c">
    <nav className="row card">
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
