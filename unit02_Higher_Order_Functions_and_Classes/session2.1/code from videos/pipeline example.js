
const myOrder = {
  name:     "glitter shoes",
  price:    25.00,
  quantity: 100,
}

function totalPrice( order ) {
  return order.price * order.quantity;
}

function withVAT( price ) {
  return price * 1.20; // 20% VAT
}

function withShipping( price ) {
  if(price < 20)
    return price + 5.95;
  else
    return price;
}

//alle functies die worden meegegeven krijgen 1 parameter!
function pipeLine( input, functions ) {
  let result = input;
  for( f of functions ) {
    result = f( result );
  }
  return result
}

//neemt 2 parameters, wrapstyle is simple als geen parameter wordt meegegeven
function giftWrapped( price, wrapStyle = "simple" ) {
  if( wrapStyle == "simple" )
    return price + 2.00;
  else if( wrapStyle == "fancy" )
    return price + 5.00;
  else
    return price;
}

//nu krijg je bij de functie giftWrapped altijd de wrapStyle simple, oplossing? ->>
//je kan ook geen "fancy" meegeven als parameter omdat je dan de functie aanroept en dan krijg je het resultaat en geen functie
result1 = pipeLine( myOrder, [totalPrice,withVAT,withShipping,giftWrapped])
console.log("result from 1st pipline:", result1);

//omdat je bij de functie giftWrapped een extra parameter wilt meegeven, maar je in de functie pipeLine maar 1 parameter meegeeft,
//moet je het opschrijven als een arrow functie, de input parameter haalt nu het resultaat op en stopt het in de functie.
result2 = pipeLine( myOrder, [totalPrice,withVAT,withShipping,input => giftWrapped(input,"fancy")])
console.log("result from 1st pipline:", result2);


//OPLOSSING 2: functie die functie maakt

function giftWrapped( price, wrapStyle = "simple" ) {
  if( wrapStyle == "simple" )
    return price + 2.00;
  else if( wrapStyle == "fancy" )
    return price + 5.00;
  else
    return price;
}

const fancyWrapped = function( price ) {
   return giftWrapped( price, "fancy")
}

const simpleWrapped = function( price ) {
   return giftWrapped( price, "simple")
}

const notWrapped = function( price ) {
   return giftWrapped( price, "none")
}

console.log("fancyWrapped(100)", fancyWrapped(100))
console.log("simpleWrapped(100)",simpleWrapped(100))
console.log("notWrapped(100)",   notWrapped(100))

//maakt een functie die een gift wrapped, dus returned een functie
function makeWrapper( style ) {
  return function(price) {
    return giftWrapped(price, style)
  }
}

fancyWrapped2 = makeWrapper("fancy")

console.log("fancyWrapped2(100)", fancyWrapped2(100))

console.log("pipeline met fancyWrapped2:", pipeLine( myOrder, [totalPrice,withVAT,withShipping,fancyWrapped2]))

function giftWrapped( price, wrapStyle = "simple" ) {
  if( wrapStyle == "simple" )
    return price + 2.00;
  else if( wrapStyle == "fancy" )
    return price + 5.00;
  else if( wrapStyle == "armour" )
    return price + 2000.00;
  else
    return price;
}


console.log("pipeline met makeWrapper('armour'):", pipeLine( myOrder, [totalPrice,withVAT,withShipping,makeWrapper("armour")]) )

console.log( "makeWrapper('armour')(100)", makeWrapper("armour")(100) )

//makewrapper function omgeschreven naar arrow functie
//makewrapper neemt een parameter style, die returned een functie 'giftwrapped' die weer een parameter price neemt
makeWrapper = style => price => giftWrapped(price, style)
