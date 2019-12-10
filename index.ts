'use strict'

interface Query {
  [propName: string]: string
}

interface Hoegaarden {
  /**
   * 以对象字面量形式返回 url query 解析结果
   * @param url
   * @example
   * parse('http://www.qfed.com?name=aaa&name=bbb&age=25')  // {name: ['aaa', 'bbb'], age: 25}
   */
  parse(url: string): Query

  /**
   * 获取 url 参数中key对应的value
   * @param url
   * @param key
   * @example
   * param('http://www.qfed.com?name=aaa&name=bbb&age=25','name')  // ['aaa', 'bbb']
   */
  param(url: string, key: string): string

  /**
   * 将 url、query 进行拼接
   * @param obj
   * @example
   * NOTE 对象套对象，数组套数组，数组套对象请使用 post 进行请求
   * stringify({name: ['aaa', 'bbb'], age: 25});  // 'age=25&name=aaa&name=bbb'
   */
  stringify(obj: object): string

  /**
   * 将 url、query 分开
   * @param url
   * @example
   * parseUrl('http://www.qfed.com?name=aaa') // {url: 'http://www.qfed.com', query: {name: 'aaa'}}
   */
  parseUrl(url: string): Object
  /**
   * 截取 url 携带的参数
   * @param url
   * @example
   * extract('http://www.qfed.com?name=aaa') // ‘name=aaa’
   */
  extract(url: string): string

}

function encoderFormatter(){

  return key => (result, value) => {
    if (value === undefined) {
      return result;
    }

    if (value === null) {
      return [...result, encodeURIComponent(key)];
    }

    return [...result, [encodeURIComponent(key), '=', encodeURIComponent(value)].join('')];
  };
}

function parserFormatter (key, value, accumulator) {
  if (accumulator[key] === undefined) {
    accumulator[key] = value;
    return;
  }
  return accumulator[key] = [].concat(accumulator[key], value);
};

function splitOnFirst(argc:string, separator:string) {
	if (!(typeof argc === 'string' && typeof separator === 'string')) {
		throw new TypeError('请传入string类型参数');
	}

	if (separator === '') {
		return [];
	}

	const separatorIndex = argc.indexOf(separator);

	if (separatorIndex === -1) {
		return [];
	}

	return [
		argc.slice(0, separatorIndex),
		argc.slice(separatorIndex + separator.length)
	];
}

function keysSorter(argc) {
	if (Array.isArray(argc)) {
		return argc.sort();
	}

	if (typeof argc === 'object') {
		return keysSorter(Object.keys(argc))
			.sort((a, b) => Number(a) - Number(b))
			.map(key => argc[key]);
	}

	return argc;
}

function removeHash(url: string): string {
	const hashStart = url.indexOf('#');
	if (hashStart !== -1) {
		url = url.slice(0, hashStart);
	}

	return url;
}

function param(url: string, key: string): string {
  const obj = this.parse(url)
  return obj[key] || ''
}

function parse(url: string): Query {

	const ret = Object.create(null);

	if (typeof url !== 'string') {
		return ret;
	}

  url = url.trim()
  const index = url.indexOf('?')
  const queryString = index !== -1 ? url.slice(index + 1) : url


	if (!queryString) {
		return ret;
	}

	for (const param of queryString.split('&')) {
    let [key, value] = splitOnFirst(param.replace(/\+/g, ' '), '=');
		value = value === undefined ? null : decodeURIComponent(value);
		parserFormatter(decodeURIComponent(key), value, ret);
	}

	for (const key of Object.keys(ret)) {
		const value = ret[key];
		if (typeof value === 'object' && value !== null) {
			for (const k of Object.keys(value)) {
				value[k] = value[k];
			}
		} else {
			ret[key] = value;
		}
	}

	return Object.keys(ret).sort().reduce((result, key) => {
		const value = ret[key];
		if (Boolean(value) && typeof value === 'object' && !Array.isArray(value)) {
			result[key] = keysSorter(value);
		} else {
			result[key] = value;
		}

		return result;
	}, Object.create(null));
}

function stringify (obj: object): string {
	if (!obj) {
		return '';
  }

	const keys = Object.keys(obj);

	return keys.map(key => {
		const value = obj[key];

		if (value === undefined) {
			return '';
		}

		if (value === null) {
			return encodeURIComponent(key);
		}

		if (Array.isArray(value)) {
      for(let index in value){
        if(Array.isArray(value[index])){
          return alert('存在array嵌套array的情况，暂不支持，请使用post进行请求')
        }else if(typeof value[index] === 'object'){
          return alert('存在array嵌套object的情况，暂不支持，请使用post进行请求')
        }
      }
      return value
      .reduce(encoderFormatter()(key), [])
      .join('&');
    }

    if(typeof value === 'object'){
      return alert('暂不支持object嵌套object，请使用post进行请求')
    }

		return encodeURIComponent(key) + '=' + encodeURIComponent(value);
	}).filter(x => x.length > 0).join('&');
};

function parseUrl(url: string): Object {
	return {
		url: removeHash(url).split('?')[0] || '',
		query: parse(extract(url))
	};
};

function extract(url: string): string {
	url = removeHash(url);
	const queryStart = url.indexOf('?');
	if (queryStart === -1) {
		return '';
	}

	return url.slice(queryStart + 1);
}

const hoegaarden: Hoegaarden = { extract, param, parse, stringify, parseUrl }

export default hoegaarden
