/**
 * Created by Vico on 2016.07.22.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';

class ListLite extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.listInitialize(
            {owner:1}
        );
    }
    buildList(){
        const lists = this.props.listlite.lists;
        let temp = [];
        lists.map((v,k)=>{
           temp.push(<li key={k} data-id={v.list_id}>
               <div className="d-flex flex-j-between">
                   <p>{v.list_name}</p>
                   <p>{v.todo_count}</p>
               </div>
           </li>)
        });
    }
    render(){
        return (<div id="list-lite-app">
            <header>
                <h2>my List lite.</h2>
            </header>
            <div>
                {this.buildList()}
            </div>
        </div>)
    }
}
export default connect(
    (state)=>{
        return {
            listlite:state.listlite
        };
    },(dispatch)=>{
        let listLiteActions = bindActionCreators(Action.listlite,dispatch);
        return {
            listInitialize:listLiteActions.listInitialize
        };
    })(ListLite);