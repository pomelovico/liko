/**
 * Created by Vico on 2016.07.25.
 */
import React from 'react';

class Input extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value:props.defaultValue
        }
    }
    componentWillReceiveProps(nextProps){
        if(this.props.defaultValue!=nextProps.defaultValue){
            this.setState({
                value:nextProps.defaultValue
            });
        }
    }
    /*处理输入区域变化*/
    handleChangeInput(e){
        this.setState({
            value:e.target.value
        });
        this.props.onInputFieldChange(e.target.value);
    }
    handleKeyDown(e){
        /*处理Enter键按下*/
        if(e.keyCode == 13){
            if(this.state.value){
                this.props.onEnterKeyDown(this.state.value);
                /*是否清除文本域*/
                if(this.props.onKeyDownClearField){
                    this.setState({
                        value:''
                    });
                }
            }
            this.refs.input.blur();
        }
    }
    handleBlur(e){

    }
    render(){
        return (
            <input
                type="text"
                ref="input"
                id={this.props.defaultID}
                className={this.props.defaultClass}
                value={this.state.value}
                onChange={(e)=>this.handleChangeInput(e)}
                onKeyDown={(e)=>this.handleKeyDown(e)}
                onBlur={(e)=>this.handleBlur(e)}
                placeholder={this.props.placeholder}
            />)
    }
}
Input.defaultProps = {
    /*按下enter键后提交数据并清除文本域*/
    defaultID:'',
    defaultClass:'',
    defaultValue : '',
    onKeyDownClearField: false,
    placeholder: '...',
    onEnterKeyDown: function (content) {},
    onInputBlur:function(content){},
    onInputFieldChange:function(content){}
};
export default Input;