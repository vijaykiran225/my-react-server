import 'bootstrap/dist/css/bootstrap.min.css';
import p5 from 'p5';
import React from 'react';

class Heart extends React.Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef()
    }

    Sketch = (p) => {


        let angle = 0;
        let cardioidPoints = [];
        let heartPoints = [];

        p.setup = () => {
            p.createCanvas(800, 800);
            p.background(0);
        };

        p.draw = () => {
            let pt = getCardioid(angle);
            cardioidPoints.push(pt);
            let hpt = getHeart(angle);
            heartPoints.push(hpt);

            drawDiag(cardioidPoints,
                p.width / 2,
                (p.height / 2) - 50,
                p.color(0, 255, 0));
            drawDiag(heartPoints,
                p.width / 2,
                p.height / 2,
                p.color(255, 10, 100));

            angle = angle + 0.01;
            if (angle >= p.TWO_PI) {
                p.noLoop();
                // angle = 0;
                // cardioidPoints = [];
                // heartPoints = [];
                // background(0);
            }
        };

        function drawDiag(params, posX, posY, col) {
            p.noFill();
            p.stroke(col);
            p.push();
            p.translate(posX, posY);
            p.beginShape();
            params.forEach(element => {
                p.vertex(element.x, element.y);
            });
            p.endShape();
            p.pop();
        }

        function getHeart(a) {
            let radius = 5;
            let x = 16 * radius * p.pow(p.sin(a), 3);
            let y = -radius * ((13 * p.cos(a)) - (5 * p.cos(2 * a)) - (2 * p.cos(3 * a)) - (p.cos(4 * a)));
            let point = {
                x: x,
                y: y
            };
            return point;
        }


        function getCardioid(a) {
            let radius = (1 - p.sin(a)) * 80;
            let x = radius * p.cos(a);
            let y = -radius * p.sin(a);
            let point = {
                x: x,
                y: y
            };
            return point;
        }
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


export default Heart;