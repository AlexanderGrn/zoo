'use strict';

const form = document.getElementById("form");
// const { form } = document.forms;// 2nd variant to form access
const span = document.getElementsByTagName("span")[0];

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
    
    let additionalTimeCost = (fullDistance / priceConsts['average speed'] - 1) *
        priceConsts['cost per hour'];
    additionalTimeCost = additionalTimeCost > 0 ? additionalTimeCost : 0;

    let price = fullDistance * priceConsts.consumption / 100 *
        priceConsts['fuel price'] + priceConsts.departure + amortization +
        additionalTimeCost;
    
    span.innerText = String(Math.ceil(price)).split(/(?=(?:\d{3})+$)/).join(' ');
    //  /(?=(?:\d{3})+(?!\d))/ - else one variant
}

form.addEventListener('submit', calcPrice);
