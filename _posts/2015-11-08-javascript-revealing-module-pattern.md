---
layout: post
title: Javascript Шаблони - Revealing Module Pattern
description: За подобрената версия на модулния шаблон и за нейните добри и лоши страни.
---

Разкриващият модулен шаблон (revealing module pattern) е леко подобрена версия на [модулния шаблон](http://kleopetrov.me/2015/11/05/javascript-module-pattern), създаден от Кристчън Хейлман.

Хейлман не бил доволен от това, че всеки път се налагало да пише името на главния обект, когато искал да извика един публичен метод от друг публичен метод или да достъпи публична променлива.

Решението до което стигнал било обновен шаблон, в който всички функции и променливи се дефинират в изолирания scope, а се връща анонимен обект, с указатели към частните функции, които искаме да разкрием като публични.

Пример за разкриващ модулен шаблон:

```js

// Дефиниране на шаблона
var myRevealingModulePattern = (function() {
    'use strict';

    // Изолирани методи и променливи
    var privateVariable = 'Christian Heilmann';
    var publicVariable = 'Hello World';

    var privateMethod = function() {
        return privateVariable;
    }

    var publicSetName = function(name) {
        privateVariable = name;
    }

    var publicGetName = function() {
        return privateVariable;
    }

    // Обект с указатели към частните функции и променливи
    return {
        setName: publicSetName,
        greeting: publicVariable,
        getName: publicGetName
    };
}());

console.log(myRevealingModulePattern.setName('Chris Price'));
console.log(myRevealingModulePattern.getName());
console.log(myRevealingModulePattern.greeting);

```

## Предимства

Чрез разкриващия модулен шаблон, синтаксиса на скриптовете ни е по-консистентен. Също така, лесно може да се види в края на модула кои функции и променливи са достъпни публично.

## Недостатъци

Недостатъка е, че изолирана функция се използва като публична. Това значи, че тази функция не може да бъде променена(пачната), ако се наложи, тъй като тя винаги ще води към изолираната.

Резултатът - модулите, които се създават чрез разкриващия модулен шаблон са "по-чупливи" от тези, създадени чрез оригиналния разкриващ шаблон.

## Обощение (TL;DR)

- Разкриващият модулен шаблон (revealing module pattern) е леко подобрена версия на модулния шаблон.
- Всички функции и променливи в разкриващия модулен шаблон се дефинират в изолирания scope.
- Публичните методи и променливи са указатели към изолираните променливи и функции.
- Разкриващият модулен шаблон предоставя по-консистентен синтаксис, но неговите публични функции и променливи не могат да бъдат променяни(пачвани).