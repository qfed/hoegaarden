# @qfed/hoegaarden(豪格登)

##  Brief Introduction

hoegaarden（豪格登）又名福佳白，一种啤酒的名字。
目前前端处理url时大多靠手动拼接参数，这不仅加重了开发者的工作服单，而且不利于代码维护，针对该痛点，hoegaarden应运而生。
目前 hoegaarden 提供5个API: parse, param, stringify, parseUrl 和 extract。

##  Links to Online

[在线链接](https://qfed.github.io/hoegaarden/)

## Install

```
$ npm install @qfed/hoegaarden
```

## Usage

```js
const url = require('@qfed/hoegaarden');

url.parse('http://www.qfed.com?name=aaa&name=bbb&age=25')
url.param('http://www.qfed.com?name=aaa&name=bbb&age=25','name')
url.stringify({name: ['aaa', 'bbb'], age: 25})
url.parseUrl('http://www.qfed.com?name=aaa&name=bbb&age=25')
url.extract('http://www.qfed.com?name=aaa&name=bbb&age=25')
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
const url = require('@qfed/hoegaarden');

url.param('http://www.qfed.com?name=aaa&name=bbb&age=25','name')
//=> ['aaa', 'bbb']

url.param('http://www.qfed.com?name=aaa&name=bbb&age=25','age')
//=> '25'
```

### .stringify(object)

将一个对象转化为 url 中携带的参数格式的 string

```js
const url = require('@qfed/hoegaarden');

url.stringify({name: ['aaa', 'bbb'], age: 25})
//=> 'age=25&name=aaa&name=bbb'
```

### .parseUrl(string)

复用parse，将 url 中地址与参数分开

```js
const url = require('@qfed/hoegaarden');

url.parseUrl('http://www.qfed.com?name=aaa&name=bbb&age=25');
//=> {url: 'http://www.qfed.com', query: {name: ['aaa', 'bbb'], age: 25}}
```

### .extract(string)

 截取 url 携带的参数

```js
const url = require('@qfed/hoegaarden');

url.extract('http://www.qfed.com?name=aaa&name=bbb&age=25')
//=> 'name=aaa&name=bbb&age=25'
```
