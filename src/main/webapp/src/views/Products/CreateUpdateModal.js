import React, { Component } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, FormGroup, Label, Input, Button } from "reactstrap";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {MAIN_API} from '../../service/apiService.js';

class CreateUpdateModal extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        
        this.state = { 
            name:"",
            price:"",
            files: [],
         };
    }

    bindCreateModal(){
        this.setState({
            isCreate: true
          });
    }

    createFunction(){
        console.log(this.state.files);
        
        var bodyFormData = new FormData();
        bodyFormData.set('name', this.state.name);
        bodyFormData.set('price', this.state.price);
        bodyFormData.append('files', this.state.files[0]);
        this.setState({
          creating:true
        });
        MAIN_API({
            url: "/product",
            method: "post",
            data: bodyFormData,
            headers: {
              "Content-Type":"multipart/form-data"
            }
          })
            .then(res => {
              console.log("Then functiom");    
              console.log(res);
              NotificationManager.success('Tạo sản phẩm thành công', 'Thông báo',2000);
              this.setState({
                creating:false
              });
              this.gridApi.updateRowData({add: [res.data]});
            }).catch(res =>{
              console.log("catch funtion " );
              console.log(res);
              
              NotificationManager.warning('Tạo sản phẩm thất bại', 'Thông báo',2000);
              this.setState({
                creating:false
              });
            });
    }


    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default CreateUpdateModal;