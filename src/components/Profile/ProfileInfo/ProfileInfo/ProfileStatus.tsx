import React, { ChangeEvent } from 'react';

// import s from './ProfileInfo.module.css'
type PropsType = {
    status:string,
    updateStatus: (newStatus:string) => void
}

type StateType = {
    EditMode: boolean,
    status:string
}

class ProfileStatus extends React.Component<PropsType,StateType > {
    // if(!props.profile){
    //     return <Preloader/>
    // }
    // statusInputRef = React.createRef()
    
    state = {
        
        EditMode: false,
        status:this.props.status
    }


    activateEditMode = () => {
        
        this.setState({
            EditMode: true
        })       
        // this.forceUpdate()
    }

    deactivateEditMode = () => {
        
        this.setState({
            EditMode: false
        })       
        // this.forceUpdate()
        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
       this.setState({
        status: e.currentTarget.value
       }) 
    }
    
    componentDidUpdate(prevProps:PropsType, prevState:StateType){
       
        if(prevProps.status !== this.props.status){
            this.setState({
            status: this.props.status
        })
        
        }
        
    }
    render() { 
  
      return (
             <div>
            
                {!this.state.EditMode &&
                    <div >
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || "----"}</span>
                    </div>
                }
                {this.state.EditMode &&
                    <div>
                        <input autoFocus onChange={this.onStatusChange} onBlur={this.deactivateEditMode} value={this.state.status}></input>
                    </div>
                }
            </div>
        )
    }
}



        
export default ProfileStatus;

