'use strict';

const form = document.getElementById("form");
// const { form } = document.forms;// 2nd variant to form access
const span = document.getElementsByTagName("span")[0];
// let distance = 0;
// let priceInit = 0;
// const obj = {
//     par: 1,
//     val: 2
// }

// ----- my test

const amortizationInit = {
    insurance: 4000,
    tax: 2000,
    mileage: 12000,
    'service interval': 7000,
    maintenance: 5000,
    'repair and care': 7600,
    oneKMcost() {
        return (this.insurance + this.tax +
            this.mileage / this['service interval'] *
            this.maintenance + this['repair and care']) /
            this.mileage;
    }
}
//console.log(amortizationInit.oneKMcost());

const priceConsts = {
    consumption: 10,
    'fuel price': 51,
    departure: 150,
    'cost per hour': 150,
    'average speed': 40,
}


function calcPrice(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());
    let distance = +values.distance;
    let fullDistance = distance * 2 * 1.03; 

    let amortization = fullDistance * amortizationInit.oneKMcost();
    //console.log(amortization);
    
    let additionalTimeCost = (fullDistance / priceConsts['average speed'] - 1) *
        priceConsts['cost per hour'];
    //console.log(additionalTimeCost);
    additionalTimeCost = additionalTimeCost > 0 ? additionalTimeCost : 0;
    //console.log('additionalTimeCost after examination', additionalTimeCost);

    let price = fullDistance * priceConsts.consumption / 100 *
        priceConsts['fuel price'] + priceConsts.departure + amortization +
        additionalTimeCost;
    
    span.innerText = String(Math.ceil(price)).split(/(?=(?:\d{3})+$)/).join(' ');
    //  /(?=(?:\d{3})+(?!\d))/ - else one variant
}

form.addEventListener('submit', calcPrice);
// console.log(retrieveFormValue(form));


// const promise = new Promise((resolve, reject) => {
//     if ('submit') {
//         setTimeout(() => {
//             resolve(distance);
//         }, 5000);
//     }
// });



// const twoStars = (i) => {
//     return (i + obj.par);
// };

// const oneDot = (i) => {
//     return (i + obj.val);
// };

// const print = (val) => {
//     console.log(val);
// };

///Chaining them all together
//);
// form.addEventListener('submit', promise.then(twoStars).
//     then(oneDot).
//     then(print));

// ----- my test end

// const amortizationInit = {
//     insurance: 4000,
//     tax: 2000,
//     mileage: 12000,
//     'service interval': 7000,
//     maintenance: 5000,
//     'repair and care': 7600,
//     oneKMcost() {
//         return (this.insurance + this.tax +
//             this.mileage / this['service interval'] *
//             this.maintenance + this['repair and care']) /
//             this.mileage;
//     }
// }

// console.log(amortizationInit.oneKMcost());

// // const promise = new Promise((resolve, reject) => {
// //     resolve();
// // })


// //form.addEventListener('submit', promise.then(retrieveFormValue).then(priceCalculation(obj)).then(printPrice));
// form.addEventListener('submit', retrieveFormValue);

// const price = {
//     consumption: 10,
//     'fuel price': 51,
//     departure: 150,
//     'cost per hour': 150,
//     'average speed': 40,
//     amortization() {
//         return distance * 2 * 1.03 *
//             amortizationInit.oneKMcost();
//     }

// }

// console.log('amortization', price.amortization());

// form.addEventListener('submit', priceCalculation(obj));
// form.addEventListener('submit', printPrice);

// function retrieveFormValue(event) {
//     event.preventDefault();

//     const formData = new FormData(form);
//     const values = Object.fromEntries(formData.entries());
//     distance = +values.distance;
// }

// function priceCalculation({ par, val }) {
//     priceInit = distance + par + val;
// }

// function printPrice() {
//     span.innerText = priceInit;
// }

