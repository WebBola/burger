
const product = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        amount: 0, 
        img:'./img/product-1.png',
        get totalSumm() {
            return this.price * this.amount;
        } ,
    },


    light: {
        name: 'Light',
        price: 26000,
        amount: 0, 
        img:'./img/product-2.png',
        get totalSumm() {
            return this.price * this.amount;
        } ,
    },


    cheeseburger: {
        name: 'Cheeseburger',
        price: 29000,
        amount: 0, 
        img:'./img/product-3.png',
        get totalSumm() {
            return this.price * this.amount;
        } ,
    },


    dburger: {
        name: 'dBurger',
        price: 24000,
        amount: 0, 
        img:'./img/product-4.png',
        get totalSumm() {
            return this.price * this.amount;
        } ,
    },

};



const

prodeuctBtns = document.querySelectorAll('.wrapper__bottom-btn'),
basketBtn = document.querySelector('.wrapper__top-btn'),
basketIndecator=document.querySelector('.wrapper__top-indecator'),
basketModal = document.querySelector('.basket'),
closeBasketModal=document.querySelector('.basket__top-btnClose'),
basketChecklist =document.querySelector('.basket__checklist'),
basketTotalPrice = document.querySelector('.basket__bottom-totalPrice');


prodeuctBtns.forEach((btn) =>{
    btn.addEventListener('click',function () {
       plusOrMinus(this);
    })
})

function  plusOrMinus(knopka){
    let praent =knopka.closest('.wrapper__bottom-block')
    let  praentId =  praent.getAttribute('id')
    product[praentId].amount++;
    basket()
}
function basket() {
    const productArray = [];
    let  totalCount = 0;
    for( const key in product){
        const po =product[key];
        const productCard = document.querySelector(`#${po.name.toLowerCase()}`); 
        const productCardInd = productCard.querySelector('.wapper__bottom-count'); 
        
              
    
    
        if(po.amount) {   
          productArray.push(po);
    
       
          basketIndecator.classList.add('active');
          totalCount += po.amount;
    
          
          productCardInd.classList.add('active');
          productCardInd.innerHTML = po.amount;
    
        }else {
          
         
          productCardInd.classList.remove('active');
          productCardInd.innerHTML = 0
        }
    
        basketIndecator.innerHTML = totalCount;
      }
    
      basketChecklist.innerHTML = '';
    for(let i = 0; i< productArray.length; i++){
        basketChecklist.innerHTML += cardItemBurger(productArray[i])
    }
    basketTotalPrice.innerHTML =totalSummProduct()
    
    
    
    }
function cardItemBurger(dataBurger) {
    const{name,totalSumm: price,amount,img}=dataBurger;
    return `       <div class="basket__checklist-product">
    
    <div class="basket__checklist-info">
        <img src="${img}" alt="">

        <div class="basket__cheklist-sub">
            <p class="basket__checklist-name">${name}</p>
            <p class="basket__checklist-price"><span>${price.toLocaleString()}</span>сум</p>
        </div>
    </div>


    <div class="basket__checklist-counter" id="${name.toLowerCase()}__card">
        <button class="basket__checklist-symbol" data-symbol="-">-</button>
        <output class="basket__checklist-output">${amount}</output>
        <button class="basket__checklist-symbol rotate" data-symbol="+">+</button>
    </div>


</div>
    `
    
}
window.addEventListener('click', function () {
    const btn = event.target
    if(btn.classList.contains('basket__checklist-symbol')) {
        const attr = btn.getAttribute('data-symbol');
        const parent = btn.closest('.basket__checklist-counter')
        
        if (parent){
            const idProduct = parent.getAttribute('id').split('__')[0];
            
            if (attr == '+'){
                product[idProduct].amount++
            } else if (attr == '-'){
                product[idProduct].amount--
            }
            basket()
        }
        
        
        
    }
})
function totalSummProduct(){
    let total = 0;
    
    for(const key in product) {
        total += product[key].totalSumm
    }
    
    return total.toLocaleString()
}


basketBtn.addEventListener('click',  () => basketModal.classList.add('active'))
closeBasketModal.addEventListener('click', () => basketModal.classList.remove('active') )


basketPrint.addEventListener('click', function() {
    printChecklist.innerHTML= ' '
    
    for(const key in product) {
        const {name, totalSumm, amount} = product[key]
        
        if(amount) {
            
            printChecklist.innerHTML += `
            <div class="print__body-item">
                <p class="print__body-item_name">
                    <span class="name">${name}</span>
                    <span class="count">${amount}</span>
                    <p class="print__body-item_summ">${totalSumm}</p>
                </p>
            </div>
            `
        }
    }
    
    printTotalSumm.innerHTML = `hammasi ${totalSummProduct()} boladi`
    window.print()
})


