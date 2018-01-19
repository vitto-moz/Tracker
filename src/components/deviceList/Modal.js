import React, {PureComponent} from "react";
import './modal.css';

const MAP_TYPE = [ {type : 'roadmap', name :'Classic'},
                   {type : 'satellite', name: 'Satellite'},
                   {type: 'hybrid', name: "Hybrid"},
                   {type: 'terrain', name : 'Terrain'},
                   {type: 'styled_map', name: 'Styled'}
                   ];

class Modal extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            clicked : this.props.mapType
        }
    }
    click(type){
        this.setState({
            clicked : type
        })
    }

    render(){
        let itemList = MAP_TYPE.map((item, index)=>{
            let itemClass = item.type === this.state.clicked?'active':'';
            return  <li key={index} className={itemClass} onClick={()=>{this.click(item.type)}}>{item.name}</li>
        });
        return (
            <div className={`modal-wrapper ${this.props.showModal?'active': ''}`}>
                <div className={`grey-modal-wrapper ${this.props.showModal?'active': ''}` } onClick={()=>this.props.changeMapType(this.state.clicked)}/>
                <div className={`modal-main ${this.props.showModal?'active': ''}`}>
                    <h3>Settings</h3>
                    <div>
                        <p>Choose Map Type:</p>
                        <ul>
                            {itemList}
                        </ul>
                        <button onClick={()=>this.props.changeMapType(this.state.clicked)}>Save</button>
                    </div>
                </div>
            </div>

        );
    }

};


export default Modal;