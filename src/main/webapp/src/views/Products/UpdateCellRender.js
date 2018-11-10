import React , {Component}  from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, FormGroup, Label, Input, Button , Media } from "reactstrap";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {MAIN_API} from '../../service/apiService.js';
import { fileURLToPath } from 'url';
class UpdateCellRender extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.action = this.props.action;
        this.state = { 
            modal: false,
            files:[],
            file:this.action.data.imageUrl,
            updating:false,
            name : this.action.data.name,
            price: this.action.data.price
         };
    }

    toggle() {
        this.setState({
          modal: !this.state.modal,
        });
      }

    update =() =>{
      console.log(this.state.files);
        
        var bodyFormData = new FormData();
        bodyFormData.set('id',Number.parseInt(this.action.data.id));
        bodyFormData.set('name', this.state.name);
        bodyFormData.set('price', this.state.price);
        if(this.state.files.length >0){
          bodyFormData.append('files', this.state.files[0]);
        }       
        this.setState({
          updating:true
        });
        MAIN_API({
            url: "/product/update",
            method: "post",
            data: bodyFormData,
            headers: {
              "Content-Type":"multipart/form-data"
            }
          })
            .then(res => {
              console.log("Then functiom");    
              console.log(res);
              var result = [];
              NotificationManager.success('Chỉnh sửa sản phẩm thành công', 'Thông báo',2000);
              this.setState({
                updating:false
              });
              var selectedRowNodes = this.action.api.getSelectedNodes();
              console.log(selectedRowNodes);
              this.action.api.forEachNode(function(rowNode, index) {
                if (index >= 5) {
                  return;
                }
                var data = rowNode.data;
                if (data.id == res.data.id){
                  data.name = res.data.name;
                  data.imageUrl = res.data.imageUrl;
                  data.updatedDate = res.data.updatedDate;
                  data.price = res.data.price;
                    result.push(data);
                }
              });
              this.action.api.updateRowData({update:result});
              //selectedRowNodes.setData(res.data);

            }).catch(res =>{
              console.log("catch funtion " );
              console.log(res);
              
              NotificationManager.warning('Chỉnh sửa sản phẩm thất bại', 'Thông báo',2000);
              this.setState({
                updating:false
              });
            });
    }
    render() {

        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                  <ModalHeader toggle={this.toggle}>{this.state.isCreate ? "Create Modal":"Update Modal"}</ModalHeader>
                  <ModalBody>
                  <FormGroup>
                      <Label htmlFor="name">Name</Label>
                      <Input type="text" id="name" placeholder="Enter product name" required
                      defaultValue={this.action.data.name}
                      onChange={e =>{
                        var newState = Object.assign({},this.state,{
                          name : e.target.value
                        })
                        this.setState(newState);
                      }}  
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="price">Price</Label>
                      <Input type="number" id="price" placeholder="Enter product price" required
                      defaultValue ={this.action.data.price}
                      onChange={e =>{
                        var newState = Object.assign({},this.state,{
                          price : e.target.value
                        })
                        this.setState(newState);
                      }}  
                      />
                    </FormGroup>
                    <FormGroup className="formImage">
                    <Media object src={this.state.file} alt="Generic placeholder image" className="image"/>
                    </FormGroup>
                    <FormGroup>
                      <Input type="file" id="image" placeholder="Enter product price" required
                      onChange={e =>{
                        var newState = Object.assign({},this.state,{
                          files : e.target.files,
                          file:URL.createObjectURL(e.target.files[0])
                        })
                        this.setState(newState);
                      }}
                      />
                    </FormGroup>
                    
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={()=>{this.toggle(); this.update()}}>{this.state.isCreate ?"Create":"Update"}</Button>{' '}
                    <Button color="secondary" onClick={() =>this.toggle()}>Cancel</Button>
                  </ModalFooter>
                </Modal>

                <Button color="primary" onClick={() =>this.toggle()}>Update</Button>
            </div>
        );
    }
}

export default UpdateCellRender;