import React from 'react';
import { Link } from 'react-router-dom'

class Navbar extends React.Component {
    render() {
        return (

            <div className="col-4">
                <div className="list-group" id="list-tab" role="tablist">
                    <Link to="/p5" className="list-group-item list-group-item-action" >heart </Link>
                    <Link to="/p5/Mandelbrot" className="list-group-item list-group-item-action">Mandelbrot </Link>
                </div>


            </div >
        )
    }
}

export default Navbar;