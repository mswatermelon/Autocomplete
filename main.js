/**
 * Created by Вероника on 25.07.2016.
 */
"use strict";

//После загрузки страницы
window.addEventListener('load', () => {
    // Поле для ввода и контейнер для подсказок
    let inputField = document.querySelector('#enterSomething'),
        container = document.querySelector('#container');

    // Создаем "обещание"
    let Prom = new Promise(function (resolve, reject) {
        // Ajax запрос и url, куда будет отправлен запрос
        let request = new XMLHttpRequest(),
            url = "https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json";

        // Инициируем звпрос с методом GET
        request.open("GET", url);
        // Определяем тип возвращаемых данных
        request.responseType = "json";

        // Если запрос успешен - меняем состояние "обещания" на "выполнено"
        request.addEventListener('load', () => resolve(request.response));
        // Если произошла ошибка - меняем состояние "обещания" на "отклонено"
        request.addEventListener('error', () => reject());

        // Отправляем запрос
        request.send();
    });

    // Вызываем обработчик для "обещания"
    Prom.then(function (response) {
        let names = [];

        for ({name} of response) {
            names.push(name);
        }

        return names.sort();
    }).then(function (names) {
        inputField.addEventListener("input", () => {
            // Очищаем контейнер
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }

            // Выводим список городов, в которых есть введенное значение
            if (inputField.value) {
                for (let i = 0; i < names.length; i++) {
                    if (names[i].indexOf(inputField.value) > -1) {
                        let p = document.createElement('p');
                        p.innerText = names[i];
                        container.appendChild(p);
                    }
                }
            }
        });
    });
});
