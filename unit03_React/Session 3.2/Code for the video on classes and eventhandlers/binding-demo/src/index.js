//Counter is lokaal voor deze file, je kan niet in andere file":  klokje = new Counter()
// class Counter {
//   constructor() {
//     this.count = 0;
//     //  OPLOSSING 1 (wel eerst object instantie maken in console)
//     // document.getElementById('upButton').addEventListener('click', () => this.up())
//     //  OPLOSSING 2
//     document.getElementById('upButton').addEventListener('click', this.up.bind(this))

//   }

//   up = () => {
//     this.count += 1;
//     console.log("new value:", this.count);
//   }
// }
// //window is de plek waar alle globale variabelen leven,
// //hier voegen we een variabele counter aan toe met de waarde van class counter
// window.Counter = Counter;

//nu kunnen we cc = new Counter() wel doen!
//maar als we nu de functie up in een variabele willen zetten lukt dat niet.
// method = cc.up (GAAT GOED)
//maar dan method() geeft new value: NaN (ergens undefined opgetreden)
//method() wordt aangeroepen zonder this variabele, er staat niks voor de punt

//dit gebeurt ook als je een eventlistener gebruikt op een class
//bvb je selecteert de button upBotton, en voegt addeventlistener("click", cc.up)
//functie up zal new value NaN teruggeven
//  OPLOSSING 1: van de meegegeven functie up een arrow functie maken
//  OPLOSSING 2: de this binden aan de this waarmee up wordt aangeroepen
//  OPLOSSING 3: extensie JS die in createReactApp zit:
// ->> de count variabele buiten de constructor zetten, (hoeft niet eens persee)
//     en van up een arrow functie maken
//  

import React from "react";
import ReactDOM from "react-dom";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 }
  }
  up() {
    this.setState(state => ({
      count: this.state.count + 1
    }));
  }
  render() {
    return (
      <div>
        <h1>counter = {this.state.count}</h1>
        //werkt nu omdat we this binden aan react component Counter
        <button onClick={this.up.bind(this)}> Up </button>
      </div>
    );
  }
}

ReactDOM.render(<Counter />, document.getElementById("root"));