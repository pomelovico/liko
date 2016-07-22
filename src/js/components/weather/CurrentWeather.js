/**
 * Created by Vico on 2016.07.07.
 */

/*当前天气组件*/

import React from 'react';

export default class CurrentWeather extends React.Component {
    renderTime(time){
        time = time.split(/-|\s|:/).map((v,k)=>{return parseInt(v)});
        return time[1]+'月'+time[2]+'日'+time[3]+'时'+time[4]+'分';
    }
    render() {
        const {now,basic} = this.props;
        return (<div id="current-weather" className='d-flex panel  p-xl'>
            <div className='d-flex flex-item'  >
                <div className="weather-icon"><img src={`http://files.heweather.com/cond_icon/${now.cond.code}.png`} alt="weather-icon"/></div>
                <ul className='text-a-r'>
                    <li className="f60 p-t-sm p-b-sm f-light">{now.tmp}℃</li>
                    <li className="f20">{now.cond.txt}</li>
                    <li className="f20">相对湿度: {now.hum}%</li>
                </ul>
            </div>
           <div className='d-flex basic-info'>
               <div className='f12 color-ccc '><span>数据更新于 {this.renderTime(basic.update.loc)}</span></div>
               <div ><span>{basic.cnty} · {basic.city}</span></div>
           </div>
        </div>)
    }
}
