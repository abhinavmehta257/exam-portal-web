import classes from './BlackCover.module.css';

function BlackCover(props){
    const handleClose = (e) => {
        //setOpen(false);
        props.resetView();
    }

    return(
        <div className={classes.blackCover}>
            <div className={`${classes.closeBut} btn-close btn-close-white`} onClick={handleClose}></div>
            <div className={classes.blackCoverInner}>
                {props.children}
            </div>
        </div>
    );
}

export default BlackCover;