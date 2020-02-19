import React, {useState} from 'react';

import Aux from '../Auxiliary/Auxiliary';
import styles from './Layout.module.css'
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import {connect} from "react-redux";

const Layout = props => {
    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

    const sideDrawerClosedHandler = () => {
        setSideDrawerIsVisible(false);
    };

    const sideDrawerToggleHandler = () => {
      setSideDrawerIsVisible(!sideDrawerIsVisible);
    };

       return(
        <Aux>
            <Toolbar
                drawerToggleClicked={sideDrawerToggleHandler}
                isAuth={props.isAuthenticated}
            />
            <SideDrawer
                open={sideDrawerIsVisible}
                closed={sideDrawerClosedHandler}
                isAuth={props.isAuthenticated}
            />
            <main className={styles.Content}>
                {props.children}
            </main>
        </Aux>
       );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};

export default connect(mapStateToProps, null)(Layout);