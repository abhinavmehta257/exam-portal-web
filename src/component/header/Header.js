import logo from '../../images/logo.png';
import LoginTop from '../login/Login';

function Header() {
    return (
        <header className="py-3 border-bottom">
            <div className="container-fluid d-md-flex align-items-center topHeader justify-content-between">
                <div className="text-center">
                    <img src={logo} alt="Logo" style={{ maxHeight: '4rem' }} />
                </div>
                <LoginTop />
            </div>
        </header>
    );
}

export default Header;