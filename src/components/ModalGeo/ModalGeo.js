import React, {PureComponent} from "react";
import '../Modal/modal.css';

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

        return (
            <div className={`modal-wrapper ${this.props.showModal?'active': ''}`}>
                <div className={`grey-modal-wrapper ${this.props.showModal?'active': ''}` } onClick={()=>this.props.closeDrawModal()}/>
                <div className={`modal-main ${this.props.showModal?'active': ''}`}>
                    <h3>Edit / Create a Geo Fence zone</h3>
                    <div>
                        {this.props.isPolygonPresent?null : <div>
                            <button onClick={()=>this.props.createPolygon()}>Create</button>
                            <br/>
                        </div>
                        }
                        {this.props.isPolygonPresent?
                            <div>
                                <button onClick={()=>this.props.editPolygon(this.state.clicked)}>Edit</button>
                                <br/>
                            </div>
                            : null
                        }
                        {this.props.isPolygonPresent?
                            <div>
                                <button onClick={()=>this.props.deletePolygon()}>Delete</button>
                                <br/>
                            </div>
                            : null
                        }
                    </div>
                </div>
            </div>

        );
    }

};


export default Modal;