import React from 'react';

// import s from './ProfileInfo.module.css'



class ProfileStatus extends React.Component {
    // if(!props.profile){
    //     return <Preloader/>
    // }
    // statusInputRef = React.createRef()
    
    state = {
        
        editMode: false,
        status:this.props.status
    }


    activateEditMode = () => {
        
        this.setState({
            editMode: true
        })       
        // this.forceUpdate()
    }

    deactivateEditMode = () => {
        
        this.setState({
            editMode: false
        })       
        // this.forceUpdate()
        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (e) => {
       this.setState({
        status: e.currentTarget.value
       }) 
    }
    
    componentDidUpdate(prevProps, prevState){
       
        if(prevProps.status !== this.props.status){
            this.setState({
            status: this.props.status
        })
        
        }
        
    }
    render() { 
  
      return (
             <div>
            
                {!this.state.editMode &&
                    <div >
                        <div onDoubleClick={this.activateEditMode}>{this.props.status || "----"}</div>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input autoFocus onChange={this.onStatusChange} onBlur={this.deactivateEditMode} value={this.state.status}></input>
                    </div>
                }
            </div>
        )
    }
}



        
export default ProfileStatus;

