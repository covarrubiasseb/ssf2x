import title from './title.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark border-bottom border-primary fixed-top">
      <div class="d-flex align-items-center">
        <div class="navbar-brand ms-2">
          <img src={title} width="72" alt="SSF2X Logo"/>
        </div>
        <Link to="/" className="text-white-50 text-decoration-none">
          <img src="./img/home-icon.png" width="40" alt="Home icon"/>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;