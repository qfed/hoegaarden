import React, { Component } from 'react'
import { render } from 'react-dom'
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

  render() {
    return (
      <div className='manage'>
        <div>
          <h1 className='title'>hoegaarden</h1>
          <div className='manage__line'>
            <span className='manage__line__title'>parse:</span>
            <input
              className='manage__line__input'
              placeholder='parse'
              onChange={e => {
                this.setState({
                  parse: e.target.value,
                },()=>{
                  try {
                    this.setState({
                      parseResult: JSON.stringify(hoegaarden.parse(this.state.parse)),
                    })
                  } catch (error) {}
                })
              }}
              value={this.state.parse}
            />
          </div>
          <div className='manage__line'>
            <span className='manage__line__title'>结果:</span>
            {this.state.parseResult}
          </div>
          <div className='manage__line'>
            <span className='manage__line__title'>param:</span>
            <input
              className='manage__line__input manage__line__input1'
              placeholder='param'
              onChange={e => {
                this.setState({
                  param: e.target.value,
                },()=>{
                  try {
                    this.setState({
                      paramResult: JSON.stringify(hoegaarden.param(this.state.param,this.state.paramKey)),
                    })
                  } catch (error) {}
                })
              }}
              value={this.state.param}
            />
            <input
              className='manage__line__input manage__line__input2'
              placeholder='paramKey'
              onChange={e => {
                this.setState({
                  paramKey: e.target.value,
                },()=>{
                  try {
                    this.setState({
                      paramResult: JSON.stringify(hoegaarden.param(this.state.param,this.state.paramKey)),
                    })
                  } catch (error) {}
                })
              }}
              value={this.state.paramKey}
            />
          </div>
          <div className='manage__line'>
            <span className='manage__line__title'>结果:</span>
            {this.state.paramResult}
          </div>
          <div className='manage__line'>
            <span className='manage__line__title'>stringify:</span>
            <input
              className='manage__line__input'
              placeholder='stringify'
              onChange={e => {
                this.setState({
                  stringify: e.target.value,
                },()=>{
                  function get(text){
                    return text;
                  }
                  const res = eval('get(' + this.state.stringify + ')')
                  try {
                    this.setState({
                      stringifyResult: hoegaarden.stringify(res),
                    })
                  } catch (error) {}
                })
              }}
              value={this.state.stringify}
            />
          </div>
          <div className='manage__line'>
            <span className='manage__line__title'>结果:</span>
            {this.state.stringifyResult}
            <pre></pre>
          </div>
          <div className='manage__line'>
            <span className='manage__line__title'>parseUrl:</span>
            <input
              className='manage__line__input'
              placeholder='parseUrl'
              onChange={e => {
                this.setState({
                  parseUrl: e.target.value,
                },()=>{
                  try {
                    this.setState({
                      parseUrlResult: JSON.stringify(hoegaarden.parseUrl(this.state.parseUrl)),
                    })
                  } catch (error) {}
                })
              }}
              value={this.state.parseUrl}
            />
          </div>
          <div className='manage__line'>
            <span className='manage__line__title'>结果:</span>
            {this.state.parseUrlResult}
          </div>
          <div className='manage__line'>
            <span className='manage__line__title'>extract:</span>
            <input
              className='manage__line__input'
              placeholder='extract'
              onChange={e => {
                this.setState({
                  extract: e.target.value,
                },()=>{
                  try {
                    this.setState({
                      extractResult: hoegaarden.extract(this.state.extract),
                    })
                  } catch (error) {}
                })
              }}
              value={this.state.extract}
            />
          </div>
          <div className='manage__line'>
            <span className='manage__line__title'>结果:</span>
            {this.state.extractResult}
          </div>
        </div>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))

