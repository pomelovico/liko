/**
 * Created by Vico on 2016.07.22.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Input from '../../components/listlite/Input';

class ListPanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list_name:'',
            isEdit:false,
            isDelete:false,
            expanded:false
        };
    }
    componentWillReceiveProps(nextProps){
        let {list_name,list_id} = nextProps;
        this.setState({
            list_name:list_name
        });
        if(list_id){
            this.setState({
                expanded:true
            });
        }else{
            this.setState({
                isEdit:false,
                isDelete:false,
                expanded:false
            });
        }
    }
    isSync(key){
        this.setState({
            [key]:true
        });
    }
    save(){
        if(this.state.list_name && this.state.list_name!=this.props.list_name){
            this.props.editList({
                list_id:this.props.list_id,
                list_name:this.state.list_name
            });
            this.isSync('isEdit');
            // this.props.Fetching(this.props.list_id);
        }else{
            this.collapsePanel();
        }
    }
    add(){
        if(this.state.list_name){
            this.props.addList({
                owner:1,
                list_name:this.state.list_name,
                create_time:Date.parse(new Date())
            });
            this.isSync('isEdit');
        }
    }
    del(){
        this.props.delList({
            list_id:this.props.list_id
        });
        this.isSync('isDelete');
    }
    handleInputChange(name){
        this.setState({
            list_name:name
        })
    }
    collapsePanel(){
        this.setState({
            isEdit:false,
            isDelete:false,
            expanded:false
        })
    }
    render(){
        // const list = this.props.list;
        const {list_name} = this.props;
        return (<div className={this.state.expanded ? "ll-list-editpanel-bg active" : "ll-list-editpanel-bg"}>
                <div className="ll-list-editpanel p-ml">
                <div onClick={()=>this.collapsePanel()} className="ll-close-btn" ><i className="icon-remove"></i></div>
                <div className="m-t-sm m-b-ml">清单名称：</div>
                <Input
                    type="text"
                    defaultValue={list_name}
                    onKeyDownClearField={true}
                    onEnterKeyDown={(name)=>{list_name?this.save():this.add()}}
                    onInputFieldChange={(name)=>this.handleInputChange(name)}
                />
                {list_name
                    ? <div className="btn-group">
                        <button onClick={()=>this.del()}>
                            <i className={this.state.isDelete ? "icon-spin icon-spinner" : "icon-trash"}></i>
                        </button>
                        <button onClick={()=>this.save()}>
                            <i className={this.state.isEdit ? "icon-spin icon-spinner" : "icon-ok"}></i>
                        </button>
                    </div>
                    : <div className="btn-group">
                        <button onClick={()=>this.add()}>
                            <i className={this.state.isEdit ? "icon-spin icon-spinner" : "icon-ok"}></i>
                        </button>
                    </div>
                }
            </div>
        </div>);
    }
}
ListPanel.defaultProps = {
    list_name:'',
    list_id: ''
};
export default connect(
    (state,ownProps)=>{
        let list_id = ownProps.list_id != -1 ? ownProps.list_id : false;
        return list_id ? {
            list_name:state.listlite.lists[list_id]?state.listlite.lists[list_id].list_name:'',
            list_id: list_id
        } : {};
    },
    dispatch=>{
        let listActions = bindActionCreators(Action.listlite,dispatch);
        return{
            addList:listActions.addList,
            editList:listActions.editList,
            delList:listActions.delList,
            Fetching:listActions.Fetching
        };
    })(ListPanel)