var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    'use strict';
    Object.defineProperty(exports, "__esModule", { value: true });
    function encoderFormatter(key) {
        return function (result, value) {
            if (value === undefined) {
                return result;
            }
            if (value === null) {
                return __spreadArrays(result, [encodeURIComponent(key)]);
            }
            return __spreadArrays(result, [[encodeURIComponent(key), '=', encodeURIComponent(value)].join('')]);
        };
    }
    function parserFormatter(key, value, accumulator) {
        if (accumulator[key] === undefined) {
            return accumulator[key] = value;
        }
        return accumulator[key] = [].concat(accumulator[key], value);
    }
    ;
    function splitOnFirst(argc, separator) {
        if (!(typeof argc === 'string' && typeof separator === 'string')) {
            throw new TypeError('请传入string类型参数');
        }
        if (separator === '') {
            return [];
        }
        var separatorIndex = argc.indexOf(separator);
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
                .sort(function (a, b) { return Number(a) - Number(b); })
                .map(function (key) { return argc[key]; });
        }
        return argc;
    }
    function removeHash(url) {
        var hashStart = url.indexOf('#');
        if (hashStart !== -1) {
            url = url.slice(0, hashStart);
        }
        return url;
    }
    function param(url, key) {
        var obj = this.parse(url);
        return obj[key] || '';
    }
    function parse(url) {
        var ret = Object.create(null);
        if (typeof url !== 'string') {
            return ret;
        }
        url = url.trim();
        var index = url.indexOf('?');
        var queryString = index !== -1 ? url.slice(index + 1) : url;
        if (!queryString) {
            return ret;
        }
        for (var _i = 0, _a = queryString.split('&'); _i < _a.length; _i++) {
            var param_1 = _a[_i];
            var _b = splitOnFirst(param_1.replace(/\+/g, ' '), '='), key = _b[0], value = _b[1];
            value = value === undefined ? null : decodeURIComponent(value);
            parserFormatter(decodeURIComponent(key), value, ret);
        }
        for (var _c = 0, _d = Object.keys(ret); _c < _d.length; _c++) {
            var key = _d[_c];
            var value = ret[key];
            if (typeof value === 'object' && value !== null) {
                for (var _e = 0, _f = Object.keys(value); _e < _f.length; _e++) {
                    var k = _f[_e];
                    value[k] = value[k];
                }
            }
            else {
                ret[key] = value;
            }
        }
        return Object.keys(ret).sort().reduce(function (result, key) {
            var value = ret[key];
            if (Boolean(value) && typeof value === 'object' && !Array.isArray(value)) {
                result[key] = keysSorter(value);
            }
            else {
                result[key] = value;
            }
            return result;
        }, Object.create(null));
    }
    function stringify(obj) {
        if (!obj || Array.isArray(obj) || typeof obj !== 'object') {
            return '';
        }
        var keys = Object.keys(obj);
        return keys.map(function (key) {
            var value = obj[key];
            if (value === undefined) {
                return '';
            }
            if (value === null) {
                return encodeURIComponent(key);
            }
            if (Array.isArray(value)) {
                for (var index in value) {
                    if (Array.isArray(value[index])) {
                        return alert('存在array嵌套array的情况，暂不支持，请使用post进行请求');
                    }
                    else if (typeof value[index] === 'object') {
                        return alert('存在array嵌套object的情况，暂不支持，请使用post进行请求');
                    }
                }
                return value
                    .reduce(encoderFormatter(key), [])
                    .join('&');
            }
            if (typeof value === 'object') {
                return alert('暂不支持object嵌套object，请使用post进行请求');
            }
            return encodeURIComponent(key) + '=' + encodeURIComponent(value);
        }).filter(function (x) { return x.length > 0; }).join('&');
    }
    ;
    function parseUrl(url) {
        return {
            url: removeHash(url).split('?')[0] || '',
            query: parse(extract(url))
        };
    }
    ;
    function extract(url) {
        url = removeHash(url);
        var queryStart = url.indexOf('?');
        if (queryStart === -1) {
            return '';
        }
        return url.slice(queryStart + 1);
    }
    var hoegaarden = { extract: extract, param: param, parse: parse, stringify: stringify, parseUrl: parseUrl };
    exports.default = hoegaarden;
});
