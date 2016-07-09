/**
 * Created by Vico on 2016.07.08.
 */
import React from 'react';

class DayForecast extends React.Component{
    renderTime(time){
        time = time.split(/-|\s|:/).map((v,k)=>{return parseInt(v)});
        return time[1]+'月'+time[2]+'日';
    }
    render(){
        const day = this.props.day;
        var temp = [];
        day.map((v,k)=>{
            temp.push(<li className="text-a-c day-item f14" key={k} >
                <div className="short p-t-xl p-b-xl" >
                    <div className="weather-icon">
                        <img src={`http://files.heweather.com/cond_icon/${v.cond.code_d}.png`} alt="weather-icon"/>
                    </div>
                    <div className="detail">
                        <div>
                            <p>{v.cond.txt_d}</p>
                            <p>{v.tmp.min}℃ ~ {v.tmp.max}℃</p>
                            <p>降水概率:{v.pop}%</p>
                        </div>
                        <div>
                            <p>风力：{v.wind.sc}</p>
                            <p>风向：{v.wind.dir}</p>
                            <p>能见度：{v.vis}km</p>
                        </div>
                    </div>
                    <div>
                        {this.renderTime(v.date)}
                    </div>
                </div>
                {
                    /*
                    * <div className="detail p-t-xl p-b-xl">
                     <div>
                     风力状况：
                     <p>风力：{v.wind.sc}</p>
                     <p>风向：{v.wind.dir}</p>
                     </div>
                     </div>*/
                }
            </li>)
        });
        return(<ul>
            {temp}
        </ul>)
    }
}
export default class DailyForecasts extends React.Component{
    render(){
        const {dailyForecast} = this.props;
        return(<div id="daily-forecast" className="panel m-t-xxl" >
            <DayForecast day={dailyForecast}/>
        </div>)
    }
}