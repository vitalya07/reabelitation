
let selector = document.querySelector('#phone');
let im = new Inputmask("+7(999)999-99-99");
im.mask(selector)

const validate = new window.JustValidate('#form');
validate.addField('#name', [
    {
        rule: "required",
        errorMessage: "*Введите имя"
    },
    {
        rule: "minLength",
        value: 2,
        errorMessage: "*минимум 2 символа"
    },
]).addField('#email', [
    {
        rule: "required",
        errorMessage: "*Введите email"
    },
    {
        rule: "minLength",
        value: 2,
        errorMessage: "*минимум 2 символа"
    },
]).addField('#phone', [
    {
        validator: (value)=> {
            const phones = selector.inputmask.unmaskedvalue()
            return Boolean(Number(phones) && phones.length > 0)
        },
        errorMessage: '*Введите телефон'
    },
    {
        validator: (value)=> {
            const phones = selector.inputmask.unmaskedvalue()
            return Boolean(Number(phones) && phones.length === 10)
        },
        errorMessage: '*Введите телефон полностью'
    },
]).addField('#msg', [
    {
        rule:"minLength",
        value : 10,
        errorMessage: "Введите не менее 10 символов"
    },
    {
        rule:"maxLength",
        value : 20,
        errorMessage: "Введите не более 20 символов"
    }
]).onSuccess(async function() {
    let data = {
        name: document.getElementById('name').value,
        tel: document.getElementById('phone').value,
        message: document.getElementById('msg').value
    }
    let responsive = await fetch("mail.php", {
        method: "POST",
        body:JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })
    let result = await responsive.text();
    alert(result)
});
document.querySelector("#hamburger").addEventListener('click', function() {
    document.querySelector(".header").classList.toggle("open")
});
document.querySelector('.header__menu').addEventListener('click', event=> {
    event.hamburgerClose = true
});
document.querySelector('.hamburger').addEventListener('click', event=> {
    event.hamburgerClose = true
});
document.body.addEventListener('click', event => {
    if(event.hamburgerClose) return;
    document.querySelector('.header').classList.remove('open')
});
document.querySelector("#header-btn").addEventListener('click', function() {
    document.querySelector('.modal').classList.add('open')
});
document.querySelector(".modal__close").addEventListener('click', function() {
    document.querySelector('.modal').classList.remove('open')
});
document.querySelector('.modal .modal__box').addEventListener('click', event=> {
    event.modalClose = true;
});
document.querySelector('.modal').addEventListener('click', event=> {
    if(event.modalClose) return;
    event.currentTarget.classList.remove('open')
});
window.addEventListener('keydown', (e)=> {
    if(e.key === "Escape") {
        document.querySelector(".modal").classList.remove("open");
        document.querySelector(".header").classList.remove("open")
    }
});

const mySlider = new Splide('#mySlider', {
    perPage: 2,
    gap: '30px',
});
mySlider.mount()