# jsHelper
*Libreria personale di funzioni javascript utili allo sviluppo e all'ispezione di pagine web*

## Utilizzo
**Monitor**
Osserva il dom e monitora cambiamenti ad un nodo

```javascript
h.monitor('#idContenitore', 'idNodo', callback);
```

*Esempio*:

```javascript
h.monitor('#container', 'test2', function(){console.log('Ok')});
let  test1 = document.createElement('div');
test1.id="test1";
let  test2 = document.createElement('div');
test2.id="test2";
setTimeout(()=>document.getElementById('container').appendChild(test1), 2001);
setTimeout(()=>document.getElementById('container').appendChild(test2), 2000);
```

**Intercept**
Intercetta qualsiasi chiamata Ajax ed esegue un callback
```javascript
h.intercept(url, f);
```

Esempio:
```javascript
let users1 = [];
let users2 = new Object;
intercept('https://api3.youpic.com/user/1028252/fan/to', function(x) {
  let resp = JSON.parse(x.response);
  let userList = resp.resource.User;
  userList.forEach(function(u) {
    users1.push(u.name);
    users2[u.id] = [u.name];
  });
  console.log('users1');
  console.dir(users1.length);
  console.log('users2');
  console.dir(Object.keys(users2).length);
});
```

## log
Console.dir abbraviato
```javascript
h.l('messaggio');
```
Per abilitare un div visibile sulla pagina
```javascript
h.debugDivEnabled = True
```

## makeButton
Inserisce pulsanti nella parte bassa della pagina
```javascript
h.makeButton(Testo, callback, inlineStyle);
```
Esempio:
```javascript
h.makeButton('ciao', function(){
                                alert('ciao');
                              }, 'color: red');
```

## q
Alias di document.querySelector
```javascript
h.q(selector);
```

## qa
Alias di document.querySelectorAll
```javascript
h.q(selector);
```

## keydown
Esegue un callback alla pressione di un tasto
```javascript
h.keydown(key, callback);
```
Esempio:
```javascript
h.keydown('a', function(){
  console.log('a');
});
```