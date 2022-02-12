import React from "react";
import {Switch, Route} from "react-router-dom";
import Login from '../../pages/login'

const Main = () => {
    return(
        <section>
            <Switch>
                <Route exact path="/login" component={Login} />
            </Switch>
        </section>
    )
}

export default Main;