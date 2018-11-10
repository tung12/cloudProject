import React , {Component}  from 'react';
import {Button} from 'reactstrap';
import {MAIN_API} from '../../service/apiService.js';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class DeleteCellRender extends Component {
    /**
     *
     */
    constructor(props) {
        super(props);
        this.action = this.props.action;
        this.state ={
            deleting:false
        };
    }


    delete = () =>{
        console.log("Delete function");
        console.log(this.action);
        this.setState({
            deleting:true
        });
        MAIN_API({
            url: "/product/delete",
            method: "POST",
            data: this.action.data,
            headers: {
              "Content-Type":"application/json"
            }
          })
            .then(res => {
              console.log(res);
              NotificationManager.success('Xóa dữ liệu thành công', 'Thông báo',2000);
              var selectedRowNodes = this.action.api.getSelectedRows();
              console.log(selectedRowNodes);
              
              this.action.api.updateRowData({remove: selectedRowNodes});
            }).catch( res => {
                this.setState({
                    deleting:false
                });
                NotificationManager.warning('Xóa dữ liệu thất bại', 'Thông báo', 2000);
            });
        
        
    }

    render() {
        return (
            <div>
                <Button color="danger" disabled={this.state.deleting} onClick={() => this.delete()}>Delete</Button>
            </div>
        );
    }
}

export default DeleteCellRender;