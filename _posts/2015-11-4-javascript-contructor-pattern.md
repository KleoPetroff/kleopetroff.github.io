---
layout: post
title: Javascript Шаблони - Constructor Pattern
description: Един от най-използваните шаблони в обектно-ориентираното програмиране е констуктора. Ето как да го използваме в JavaScript.
---

Това е първата от няколко статии, в които ще обясним с няколко изречения имплементацията и ролята на различните дизайн шаблони в JavaScript. Днес ще разгледаме **Конструктор** шаблона.

## Какво е контруктор

Конструкторът е специален обект, който се използва за инициализация (създаване) на нови обекти.

## Създаване на обекти

Има три начина за създаване на нови обекти в JavaScript:

{% highlight javascript linenos %}

var myObject = {} // обект, създаден чрез Обектен литерал

var myObject = Object.create(Object.prototype) // използвайти Object.create() метода

var myObject = new Object() // Използване на Обектния контруктор

{% endhighlight %}

В Javascript съществуват 4 начина, по които могат да се присвоят дадени атрибути към обект:

{% highlight javascript linenos %}

/** ES3 съвместимо **/

/* 1. Dot notation */

// Задаване на property
myObject.someKey = 'Hello World!';

// Извикване на property
var myValue = myObject.someKey;

/* 2. Bracket notation */

// Задаване на property
myObject['someKey'] = 'Hello World!';

// Извикване на property
var myValue = myObject['someKey'];


/** Само ES5 съвместимо **/

/* 3. Използване на Object.defineProperty метода */
Object.defineProperty(myObject, 'someKey', {
    value: 'Hello World',
    writeable: true,
    enumerable: true,
    configurable: true
})


/* 4. Използване на Object.defineProperties метода */
Object.defineProperties(myObject, {
    'someKey': {
        value: 'Hello World!',
        writable: false
    },
    'anotherValue': {
        value: 'Hey there!',
        writeable: true
    }
});
{% endhighlight %}

## Обектен Контруктор

В Javascript няма класове (поне до последната версия на ECMAScript), но се поддържа специална контруктор функция, чрез която можем да създаваме нови обекти. (В JavaScript всичко е обект, дори и функциите!). Чрез използването на ключовата дума `new`, казваме на Javascript енджина, че искаме да използваме дадената функция като конструктор и по този начин да инициализираме нов обект.

В контруктора, ключовата дума `this` е референция към новосъздадените обекти. Един обекновен контруктор би изглеждал по следния начин:

{% highlight javascript linenos %}
// Дефиниране на конструктора
function Car(model, color, age) {
    this.model = model;
    this.color = color;
    this.age = age;

   // Дефинираме property information, което присвоява стойност анонимна функция
    this.information = function() {
        return 'This car model is ' + this.model + ', with ' + this.color + ' color from' + this.age + ' year!';
    }
}


// Създаване на нова инстанция на обекта
var ford = new Car('Fiesta', 'red', 2005);
var fiat = new Car('Uno', 'blue', 2001);


//Извикване на метода information
console.log(ford.information()); // 'This car model is Fiesta, with red color from 2005 year!'
console.log(fiat.information()); // 'This car model is Uno, with blue color from 2001 year!'
{% endhighlight %}

## Обобщение (TL;DR)

- Конструкторът е специален обект, който се използва за инициализация (създаване) на нови обекти.
- Има 3 начина за създаване на обект и 4 начина за присвояване на атрибути към даден обект
- JavaScript няма класове, но може да 'симулира' създаването на класове, чрез специални **контруктор функции**