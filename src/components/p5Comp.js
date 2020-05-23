import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Heart from "./heart-component.js";
import Mandelbrot from './mandelbrot-component.js';
import Navbar from './navbar-component.js';

class p5Comp extends Component {
    render() {
        return (
            <div className="row">
                <BrowserRouter>
                    <Navbar />

                    <div className="col-8">
                        <div className="tab-content" id="nav-tabContent">
                            {/* <div>{this.props.children}</div> */}
                            <Route path="/p5" component={Heart} exact />
                            <Route path="/p5/Mandelbrot" component={Mandelbrot} />

                        </div>
                    </div>



                </BrowserRouter>

            </div>
        );
    }
}

export default p5Comp;