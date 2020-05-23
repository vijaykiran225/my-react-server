import 'bootstrap/dist/css/bootstrap.min.css';
import p5 from 'p5';
import React from 'react';

class Mandelbrot extends React.Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef()
    }

    Sketch = (p) => {

        var range = 1.5;


        function mandelbrot(zn, cn) {
            // body...
            var squareReal = (zn.real * zn.real) - (zn.imag * zn.imag);
            var squareImag = 2 * zn.real * zn.imag;
            return {
                real: squareReal + cn.real,
                imag: squareImag + cn.imag
            };
        }



        p.setup = () => {
            p.createCanvas(800, 800);
            p.background(0);
            // createCanvas(400, 400);
            p.pixelDensity(1);
        };

        p.draw = () => {

            // put drawing code here
            p.loadPixels();
            for (var i = 0; i <= p.width; i++) {
                for (var j = 0; j <= p.height; j++) {
                    var z = {
                        real: p.map(i, 0, p.width, -range, range),
                        imag: p.map(j, 0, p.height, -range, range)
                    };
                    var c = z;
                    var countForValue = 0;
                    var exploded = false;
                    while (countForValue < 100) {
                        var zNext = mandelbrot(z, c);
                        if (zNext.real >= 4) {
                            exploded = true;
                            break;
                        }
                        z = zNext;
                        countForValue++;
                    }
                    var bright = p.map(countForValue, 0, 100, 0, 1);
                    if (exploded) {
                        bright = p.map(p.sqrt(bright), 0, 1, 0, 255);
                    } else {
                        bright = 0;
                    }
                    var id = 4 * ((j * p.width) + (i));
                    p.pixels[id] = bright;
                    p.pixels[id + 1] = bright;
                    p.pixels[id + 2] = bright;
                    p.pixels[id + 3] = 255;
                }
            }
            p.updatePixels();
            p.noLoop();
        };


    };


    componentDidMount() {
        this.myP5 = new p5(this.Sketch, this.myRef.current)
    }

    render() {
        return (
            <div ref={this.myRef}>

            </div>
        )
    }
}


export default Mandelbrot;