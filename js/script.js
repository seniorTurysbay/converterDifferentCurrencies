window.addEventListener("DOMContentLoaded", function () {
    // header functionality
    const prevBtn = document.querySelector('#btnPrev');
    const nextBtn = document.querySelector('#btnNext');
    const btnFooter = document.querySelectorAll('#btnFooter');
    let slides = document.querySelectorAll('.currency');
    let inputNumber = document.getElementById('input');

    let slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let i;
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].className = slides[i].className.replace(" activeCurrency", "");
        }
        slides[slideIndex - 1].style.display = "block";
        slides[slideIndex - 1].className += " activeCurrency";
    }

    prevBtn.addEventListener('click', function () {
        plusSlides(-1);
    });

    nextBtn.addEventListener('click', function () {
        plusSlides(1);
    });

    slides.forEach((item, i) => {
        item.addEventListener('click', function () {
            currentSlide(i + 1);
        })
    });
    // main body functionality
    slides.forEach((element) => {
        element.addEventListener('click', () => {
            selectedCurrency(element.value)
            changeCurrencyNames(element.value)
        })
    });
    inputNumber.addEventListener('input', function () {
        let changeNumber = document.querySelectorAll('.calcCurrency');

        changeNumber.forEach(element => {
            element.innerHTML = `${inputNumber.value}`
        })
    })
    class GetDate {
        constructor(date) {
            this.date = date;
            this.parent = document.querySelector(".dateBox")
        }
        clean() {
            this.parent.innerHTML = "";
        }
        render() {
            const dateSpan = document.createElement('span');

            dateSpan.innerHTML = `
                <span>${this.date}</span>
            `;
            this.parent.append(dateSpan)
        }
    }

    function changeCurrencyNames(currencyName) {
        const currencyHeader = document.querySelector('.currency-header');
        const currencyLabel = document.querySelector('.currency-label');
        const currencySpan = document.querySelectorAll('.currency-span');
        currencyHeader.innerHTML = `Курс ${currencyName} сегодня`;
        currencyLabel.innerHTML = `${currencyName}`;
        currencySpan.forEach(element => {
            element.innerHTML = `${currencyName}`
        })
    }
    function selectedCurrency(base) {
        const endpoint = "latest"
        axios.get(`https://api.exchangeratesapi.io/${endpoint}?base=${base}`).then((mainObj) => {
            let { data } = mainObj;
            let { rates, date } = data;
            let jsonDate = JSON.stringify(date).replace(/"/g, " ");//в страницу выходило "yyyy-mm-dd", replace(/"/g," ") добавил чтобы убрать кавычки
            changeToCurrency(rates, data.base);
            new GetDate().clean();
            new GetDate(jsonDate).render();
        })
    }

    function changeToCurrency(rates, base) {
        console.log("base is ", base)
        let { USD, RUB, HRK, CNY, JPY, EUR, CAD } = rates;
        console.log(USD, RUB, HRK, CNY, JPY, EUR, CAD)
        inputNumber.addEventListener('input', function () {
            let mainCalc = document.querySelectorAll('.calculatedCurrency');
            mainCalc.forEach(element => {

                if (element.getAttribute('id') === "USD") {
                    element.innerHTML = `${(+inputNumber.value * USD).toFixed(2)}USD`
                }
                if (element.getAttribute('id') === "RUB") {
                    element.innerHTML = `${(+inputNumber.value * RUB).toFixed(2)}RUB`
                }
                if (element.getAttribute('id') === "HRK") {
                    element.innerHTML = `${(+inputNumber.value * HRK).toFixed(2)}HRK`
                }
                if (element.getAttribute('id') === "CNY") {
                    element.innerHTML = `${(+inputNumber.value * CNY).toFixed(2)}CNY`
                }
                if (element.getAttribute('id') === "JPY") {
                    element.innerHTML = `${(+inputNumber.value * JPY).toFixed(2)}JPY`
                }
                if (element.getAttribute('id') === "EUR") {
                    element.innerHTML = `${(+inputNumber.value * EUR).toFixed(2)}EUR`
                }
                if (element.getAttribute('id') === "CAD") {
                    element.innerHTML = `${(+inputNumber.value * CAD).toFixed(2)}CAD`
                }
            });
        })
    }
    // footer functionality
    btnFooter.forEach((item, i) => {
        if (i === 0) {
            item.addEventListener('click', function () {
                plusSlides(-1);
            });
        } else {
            item.addEventListener('click', function () {
                plusSlides(1);
            });
        }
    })
});
