// номера городов
const cities = [1, 2, 3, 4, 5];

// таблица с расстояниями между городами
const towns = [
    [0, 7, 6, 2, 11],
    [7, 0, 7, 10, 6],
    [6, 7, 0, 1, 7],
    [2, 10, 1, 0, 9],
    [11, 6, 7, 9, 0]
];
// массив для результатов перестановок
let results = [];

// порядковый номер текущего маршрута
let counter = 0;
// самый короткий путь
let path;
// самый короткий путь — сразу ставим заведомо большим, чтобы уменьшать его по мере работы алгоритма
let minPath = 10000;
// номер самого короткого маршрута
let minCounter;

// вспомогательные переменные
let p1, p2;

// рекурсивная функция
// на вход получаем текущий массив и массив с памятью предыдущих вычислений
function permute(arr, memo) {
    // переменная для хранения фрагмента массива
    let cur;

    // делаем переменную для хранения промежуточных результатов
    memo = memo || [];

    // какой размер входного массива — такой длины и делаем цикл, чтобы перебрать все элементы
    for (let i = 0; i < arr.length; i++) {

        // получаем новый массив cur, удаляя из входного массива один элемент, начиная с текущей позиции
        // при этом из входного массива этот элемент тоже удалится
        cur = arr.splice(i, 1);

        // если от входного массива ничего не осталось
        if (arr.length === 0) {
            // то приклеиваем текущее значение нарезки к варианту, который лежит в памяти,
            // и добавляем получившийся результат в итоговый массив
            results.push(memo.concat(cur));
        }

        // вызываем новый виток рекурсии
        // в качестве аргументов передаём копию входящего массива и добавляем к кешу памяти то, что получилось после удаления одного символа из входящего массива
        permute(arr.slice(), memo.concat(cur));

        // возвращаем в исходный массив первый элемент из нового массива, но уже на другую позицию
        arr.splice(i, 0, cur[0]);
    }

    // возвращаем обратно массив с результатами перестановок
    return results;
}

permute(cities, []);
// перебираем все варианты перестановок
for (let i = 0; i < results.length; i++) {
    // обнуляем длину текущего маршрута
    path = 0;
    // проходим по каждому городу в текущем варианте пути
    for (let j = 1; j < cities.length; j++) {
        // достаём очередную пару городов
        // отнимаем единицу, потому что в массиве towns нумерация ячеек начинается с нуля, а не с единицы
        p1 = results[i][j - 1] - 1;
        p2 = results[i][j] - 1;

        // прибавляем это к общей длине текущего маршрута
        path = path + towns[p1][p2];
    }

    // если мы нашли маршрут короче, чем был до этого
    if (path < minPath) {
        // запоминаем, какой это номер в перестановках
        minCounter = i;
        // обновляем минимальную длину маршрута
        minPath = path;
    }
}
let tableDistance = document.querySelector('.tableDistance');

// =========  Создание таблицы с расстояниями ===============
let table = document.createElement('table');
// строка с номерами городов
let trFirst = document.createElement('tr');
for (let i = 0; i < cities.length + 1; i++) {
    let td = document.createElement('td');
    i === 0 ? td.innerText = '' : td.innerText = cities[i - 1];
    trFirst.appendChild(td);
}
table.appendChild(trFirst);

// первый столбец с номерами городов остальные с расстояниями
for (let i = 0; i < towns.length; i++) {
    let tr = document.createElement('tr');
    for (let j = 0; j < towns[i].length + 1; j++) {
        let td = document.createElement('td');
        // первый столбец с номерами городов остальные с расстояниями
        j === 0 ? td.innerText = cities[i] : td.innerText = towns[i][j - 1];
        tr.appendChild(td);
    }
    table.appendChild(tr);
}
tableDistance.appendChild(table);


// ====================== Вывод кратчайшего пути ======================
let shortPath = document.querySelector('.path');
let titlePAth = document.createElement('h2');
titlePAth.innerText = 'Кратчайший путь: ';
shortPath.appendChild(titlePAth);

let trPath = document.createElement('tr');
for (let i = 0; i < results[minCounter].length; i++) {
    let td = document.createElement('td');

    td.innerText = results[minCounter][i];
    trPath.appendChild(td);
}
shortPath.appendChild(trPath);

// ====================== Вывод кратчайшего расстояния ======================
let distanceDiv = document.querySelector('.distance');
let titleDistance = document.createElement('h2');
titleDistance.innerText = 'Кратчайшее расстояние: ';
distanceDiv.appendChild(titleDistance);

let distance=document.createElement('p')
distance.innerText=minPath
distanceDiv.appendChild(distance)
