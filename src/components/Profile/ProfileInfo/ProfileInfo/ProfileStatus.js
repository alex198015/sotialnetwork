import React from 'react';
// import s from './ProfileInfo.module.css'


class ProfileStatus extends React.Component {
    // if(!props.profile){
    //     return <Preloader/>
    // }
    state = {
        editMode: false
    }
    activateEditMode = () => {
        this.setState({
            editMode: true
        })       
        // this.forceUpdate()
    }

    deactivateEditMode () {
        this.setState({
            editMode: false
        })       
        // this.forceUpdate()
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div >
                        <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input autoFocus onBlur={this.deactivateEditMode.bind(this)} value={this.props.status}></input>
                    </div>
                }
            </div>
        )
    }
}
export default ProfileStatus;

