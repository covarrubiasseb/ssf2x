import title from './title.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar bg-dark bg-gradient">

        <Link to="/" className="nav-item">Home</Link>

        <Link to="/about" className="nav-item">Explanation</Link>
    </nav>
  );
}

export default Navbar;