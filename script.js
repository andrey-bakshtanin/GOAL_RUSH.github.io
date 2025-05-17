let click = 0
let money = 0 
let spend_money = 0
let sec_upgrade_price = 200
let click_upgrade_price = 200
let click_power = 1
let sec_power = 1
let interval_check = null
function solve_money(money){
    if (money < 1000 ){
        score.innerHTML = `${money}`
    }
    else if (money < 1000000 && money>=1000){
        score.innerHTML = `${money/1000}K`
    }
    else if(money < 1000000000 && money>=1000000){
        score.innerHTML = `${money/1000000}M`
    }
    return money
}
function out_points(sec_power){
    if(interval_check){
        clearInterval(interval_check)
    }
    
    interval_check = setInterval(()=>{
        money += sec_power
        money =solve_money(money)
    }, 1000)
}
out_points(sec_power)
let score = document.querySelector(".score")
let ball = document.querySelector(".main-button")
ball.addEventListener("click", function(){
    click += click_power
    money += click_power
    money = solve_money(money)
})

let count_click = document.querySelector(".count-click")
let count_sec = document.querySelector(".count-sec")
let upgrade_click = document.querySelector(".upgrade-click")
let upgrade_sec = document.querySelector(".upgrade-sec")
upgrade_click.addEventListener("click", function(){
    if (money >= click_upgrade_price){
        money -= click_upgrade_price
        spend_money += click_upgrade_price
        click_upgrade_price = Math.round(200*Math.pow(1+click_power*0.1,click_power))
        if (click_upgrade_price < 1000 ){
            upgrade_click.innerHTML = `УЛУЧШИТЬ ЗА ${click_upgrade_price}`
        }
        else if (click_upgrade_price < 1000000 && click_upgrade_price>=1000){
            upgrade_click.innerHTML = `УЛУЧШИТЬ ЗА ${click_upgrade_price/1000}K`
        }
        else if(click_upgrade_price < 1000000000 && click_upgrade_price>=1000000){
            upgrade_click.innerHTML = `УЛУЧШИТЬ ЗА ${click_upgrade_price/1000000}M`
        }
        click_power += 1
        count_click.innerHTML = click_power
        money = solve_money(money)
    }
})
upgrade_sec.addEventListener("click", function(){
    if (money >= sec_upgrade_price){
        money -= sec_upgrade_price
        spend_money += sec_upgrade_price
        sec_upgrade_price =  Math.round(sec_upgrade_price * Math.pow(1.15, sec_power));
        if (sec_upgrade_price < 1000 ){
            upgrade_sec.innerHTML = `УЛУЧШИТЬ ЗА ${sec_upgrade_price}`
        }
        else if (sec_upgrade_price < 1000000 && sec_upgrade_price>=1000){
            upgrade_sec.innerHTML = `УЛУЧШИТЬ ЗА ${sec_upgrade_price/1000}K`
        }
        else if(sec_upgrade_price < 1000000000 && sec_upgrade_price>=1000000){
            upgrade_sec.innerHTML = `УЛУЧШИТЬ ЗА ${sec_upgrade_price/1000000}M`
        }
        sec_power += 1
        count_sec.innerHTML = sec_power
        money = solve_money(money)
        out_points(sec_power)
    }
})
const shopBtn = document.querySelector('.shop-button');
const modal = document.getElementById('shopModal');
const closeBtn = document.querySelector('.close');
const buyButtons = document.querySelectorAll('.buy-item');

// Открываем модальное окно при клике на кнопку магазина
shopBtn.addEventListener('click', function() {
    modal.style.display = 'block';
});

// Закрываем модальное окно при клике на крестик
closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Закрываем модальное окно при клике вне его области
window.addEventListener('click', function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

// Обработка покупок (эта часть должна быть интегрирована с основной логикой игры)
buyButtons.forEach(button => {
    button.addEventListener('click', function() {
        const cost = parseInt(this.getAttribute('data-cost'));
        const type = this.getAttribute('data-type');
        
        // Здесь должна быть проверка, хватает ли денег
        if (money >= cost){
            
            if (type == 'click'){
                click_power += 1
                count_click.innerHTML = click_power
                
            }
            else if (type == 'auto'){
                sec_power += 1
                count_sec.innerHTML = sec_power
                out_points(sec_power)
                
                
            }
            money -= cost
            money = solve_money(money)
        }
        // и логика применения улучшения
        alert(`Куплено улучшение: ${type} за ${cost} очков`);
    });
});
