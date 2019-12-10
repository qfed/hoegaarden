import React, { Component } from 'react'
import { render } from 'react-dom'
import { Input, Button } from 'antd'
import hoegaarden from '../index'
import './style'

export default class App extends Component {

  state = {
    parse: 'http://www.qfed.com?name=aaa&name=bbb&age=25',
    parseResult: '{"age":"25","name":["aaa","bbb"]}',
    param: 'http://www.qfed.com?name=aaa&name=bbb&age=25',
    paramKey: 'name',
    paramResult: '["aaa","bbb"]',
    stringify: `{name: ['aaa', 'bbb'], age: 25}`,
    stringifyResult: 'name=aaa&name=bbb&age=25',
    parseUrl: 'http://www.qfed.com?name=aaa&name=bbb&age=25',
    parseUrlResult: '{"url":"http://www.qfed.com","query":{"age":"25","name":["aaa","bbb"]}}',
    extract: 'http://www.qfed.com?name=aaa&name=bbb&age=25',
    extractResult: 'name=aaa&name=bbb&age=25',
  }

  // 获取筛选输入框内容
  onFormItemChange = (key: string) => (e: any) => {
    if (e && e.target) {
      this.setState({ [key]: e.target.value })
    } else {
      this.setState({ [key]: e })
    }
  }

  getFormItem = (key: string) => {
    return {
      value: this.state[key],
      onChange: this.onFormItemChange(key),
    }
  }

  render() {
    return (
      <div className='manage'>
        <pre>
          {
            `
            examples:
              parse('http://www.qfed.com?name=aaa&name=bbb&age=25')
              param('http://www.qfed.com?name=aaa&name=bbb&age=25','age')
              stringify({name: ['aaa', 'bbb'], age: 25})
              parseUrl('http://www.qfed.com?name=aaa&name=bbb&age=25')
              extract('http://www.qfed.com?name=aaa&name=bbb&age=25')
            `
          }
        </pre>
        <div className='manage__line'>
          <span className='manage__line__title'>parse:</span>
          <Input
            style={{width:'300px'}}
            placeholder='parse'
            {...this.getFormItem('parse')}
          />
          <Button
            type='primary'
            onClick={() => {
              this.setState({
                parseResult: JSON.stringify(hoegaarden.parse(this.state.parse))
              })
            }}
          >
            转换
          </Button>
        </div>
        <div className='manage__line'>
          <span className='manage__line__title'>结果:</span>
          {this.state.parseResult}
        </div>
        <div className='manage__line'>
          <span className='manage__line__title'>param:</span>
          <Input
            style={{width:'150px'}}
            placeholder='param'
            {...this.getFormItem('param')}
          />
          <Input
            style={{width:'150px'}}
            placeholder='paramKey'
            {...this.getFormItem('paramKey')}
          />
          <Button
            type='primary'
            onClick={() => {
              this.setState({
                paramResult: JSON.stringify(hoegaarden.param(this.state.param,this.state.paramKey))
              })
            }}
          >
            转换
          </Button>
        </div>
        <div className='manage__line'>
          <span className='manage__line__title'>结果:</span>
          {this.state.paramResult}
        </div>
        <div className='manage__line'>
          <span className='manage__line__title'>stringify:</span>
          <Input
            style={{width:'300px'}}
            placeholder='stringify'
            {...this.getFormItem('stringify')}
          />
          <Button
            type='primary'
            onClick={() => {
              function get(text){
                return text;
              }
              const res = eval('get(' + this.state.stringify + ')')
              this.setState({
                stringifyResult: hoegaarden.stringify(res),
              })
            }}
          >
            转换
          </Button>
        </div>
        <div className='manage__line'>
          <span className='manage__line__title'>结果:</span>
          {this.state.stringifyResult}
          <pre></pre>
        </div>
        <div className='manage__line'>
          <span className='manage__line__title'>parseUrl:</span>
          <Input
            style={{width:'300px'}}
            placeholder='parseUrl'
            {...this.getFormItem('parseUrl')}
          />
          <Button
            type='primary'
            onClick={() => {
              this.setState({
                parseUrlResult: JSON.stringify(hoegaarden.parseUrl(this.state.parseUrl))
              })
            }}
          >
            转换
          </Button>
        </div>
        <div className='manage__line'>
          <span className='manage__line__title'>结果:</span>
          {this.state.parseUrlResult}
        </div>
        <div className='manage__line'>
          <span className='manage__line__title'>extract:</span>
          <Input
            style={{width:'300px'}}
            placeholder='extract'
            {...this.getFormItem('extract')}
          />
          <Button
            type='primary'
            onClick={() => {
              this.setState({
                extractResult:hoegaarden.extract(this.state.extract)
              })
            }}
          >
            转换
          </Button>
        </div>
        <div className='manage__line'>
          <span className='manage__line__title'>结果:</span>
          {this.state.extractResult}
        </div>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))

