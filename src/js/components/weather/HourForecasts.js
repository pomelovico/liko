/**
 * Created by Vico on 2016.07.07.
 */
import React from 'react';

/*Canvas 圈*/
class Circle extends React.Component{
    componentDidMount(){
        this.drawCircle();
    }
    componentWillReceiveProps(next){
        if(next.dataPer != this.props.dataPer){
            this.drawCircle();
        }
    }
    drawCircle(){
        let c = this.refs.circle;
        let cxt = c.getContext("2d");
        let tScale  = window.devicePixelRatio;

        let tWidth  = this.props.width,
            tHeight = this.props.height;
        c.style.width = tWidth + "px";
        c.style.height = tHeight + "px";
        c.width = tWidth * tScale;
        c.height = tHeight * tScale;

        cxt.clearRect(0, 0, tWidth*tScale, tHeight*tScale);

        cxt.translate(75,75);
        cxt.rotate(-Math.PI * 0.5);

        /*灰色圈*/
        cxt.beginPath();
        cxt.arc(0, 0, 60, 0, Math.PI * 2);
        cxt.lineWidth = 4;
        cxt.strokeStyle = "#eee";
        cxt.stroke();

        this.drawPercentCircle(cxt,0);
    }
    /*绘制百分比圈*/
    drawPercentCircle(cxt,start){
        let end = start+0.01;
        setTimeout(()=>{
            cxt.beginPath();
            cxt.arc(0, 0, 60, Math.PI * 2 * start, Math.PI * 2 * end);
            cxt.lineWidth = 4;
            cxt.strokeStyle = "#96cdde";
            cxt.stroke();
            if(start < this.props.dataPer){
                this.drawPercentCircle(cxt,end);
            }
        },20);
    }
    render(){return(<canvas className="circle" ref="circle" ></canvas>)
    }
}
/*数字*/
class Number extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:0
        }
    }
    componentDidMount(){
        this.renderData(0);
    }
    componentWillReceiveProps(next){
        if(next.to != this.props.to){
            this.renderData(0);
        }
    }
    renderData(s){
        setTimeout(()=>{
            s+=1;
            this.setState({
                data:s
            });
            if(s < this.props.to){
                this.renderData(s);
            }
        },20);
    }
    render(){
        return(<span>{this.state.data}</span>)
    }
}
/*小时预报组件*/
class HourForecast extends React.Component{
    renderTime(time){
        time = time.split(/-|\s|:/).map((v,k)=>{return parseInt(v)});
        return time[3]+'时'+time[4]+'分';
    }
    render(){
        const {hour} = this.props;
        let temp = [];
        hour.map((v,k)=>{
           temp.push(<li className="hour-item d-flex p-l-xl p-r-xl " key={k}>
               <div className="pos-r">
                   <Circle dataPer={v.pop/100} width={150} height={150} />
                   <div className="text-a-c f14 pop">降水概率<br/>
                       <span className="f40 f-light" >
                           <Number to={v.pop}/>%
                       </span>
                   </div>
               </div>
               <div className="text-a-r">
                   <div className="f40 f-light"> <Number to={v.tmp}/>℃</div>
                   <div>{this.renderTime(v.date)}</div>
               </div>
           </li>)
        });
        return(<ul>{temp.slice(0,3)}</ul>)
    }
}

export default class HourForecasts extends React.Component{
    render() {
        const {hourForecast} = this.props;
        return (<div id="hour-forcast" className="panel p-t-xl p-b-xl m-l-xxl">
            <HourForecast  hour={hourForecast} />
        </div>)
    }
}