import React, { Component } from 'react';
import DeleteCellRender from './DeleteCellRender';
import UpdateCellRender from './UpdateCellRender';
class ActionCellRender extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div>
                <DeleteCellRender action={this.props}/>
                <UpdateCellRender action={this.props}/>
            </div>
        );
    }
}

export default ActionCellRender;