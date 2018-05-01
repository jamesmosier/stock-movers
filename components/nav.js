import NavLink from './nav-link';

const linksArray = [{ href: '/', label: 'S&P 500 Movers' }, { href: '/quotes', label: 'Quotes' }];
const links = linksArray.map((link) => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const Nav = ({ router }) => {
  return (
    <div className="c">
      <nav className="row card">
        {links.map(({ key, href, label }) => (
          <div className="col" key={key}>
            <NavLink activeClassName="active" href={href} router={router}>
              <a>{label}</a>
            </NavLink>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Nav;
