import classes from './footer.module.css';

function Footer(){
    return(
        <footer className = {`${classes.mainFooter} p-4`}>
            &copy; Super C 2021
        </footer>
    );
}

export default Footer;