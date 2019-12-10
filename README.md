# @qfed/hoegaarden

## Install

```
$ npm install hoegaarden
```

## Usage

```js
const hoegaarden = require('hoegaarden');

console.log('parse:',hoegaarden.parse('http://www.qfed.com?name=aaa&name=bbb&age=25'))
console.log('param:',hoegaarden.param('http://www.qfed.com?name=aaa&name=bbb&age=25','name'))
console.log('stringify:',hoegaarden.stringify({name: ['aaa', 'bbb'], age: 25}))
console.log('parseUrl',hoegaarden.parseUrl('http://www.qfed.com?name=aaa&name=bbb&age=25'))
console.log('extract',hoegaarden.extract('http://www.qfed.com?name=aaa&name=bbb&age=25'))
```


## API

### .parse(string)

以对象字面量形式返回 url 中的 query 解析结果

```js
const hoegaarden = require('@qfed/hoegaarden');

hoegaarden.parse('http://www.qfed.com?name=aaa&name=bbb&age=25')
//=> {name: ['aaa', 'bbb'], age: 25}
```

### .param(string, string)

复用parse，传入 url 与 key 返回其对应的 value

```js
const hoegaarden = require('hoegaarden');

hoegaarden.param('http://www.qfed.com?name=aaa&name=bbb&age=25','name')
//=> ['aaa', 'bbb']

hoegaarden.param('http://www.qfed.com?name=aaa&name=bbb&age=25','age')
//=> '25'
```

### .stringify(object)

将一个对象转化为 url 中携带的参数格式的 string

```js
const hoegaarden = require('hoegaarden');

hoegaarden.stringify({name: ['aaa', 'bbb'], age: 25})
//=> 'age=25&name=aaa&name=bbb'
```

### .parseUrl(string)

复用parse，将 url 中地址与参数分开

```js
const hoegaarden = require('hoegaarden');

hoegaarden.parseUrl('http://www.qfed.com?name=aaa&name=bbb&age=25');
//=> {url: 'http://www.qfed.com', query: {name: ['aaa', 'bbb'], age: 25}}
```

### .extract(string)

 截取 url 携带的参数

```js
const hoegaarden = require('hoegaarden');

hoegaarden.extract('http://www.qfed.com?name=aaa&name=bbb&age=25')
//=> 'name=aaa&name=bbb&age=25'
```
