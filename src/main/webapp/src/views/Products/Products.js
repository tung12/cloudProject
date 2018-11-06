import React, { Component , Fragment} from 'react';
import { Alert,Button, Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, FormGroup,
    Label,Input } from 'reactstrap';
import {AgGridReact } from 'ag-grid-react';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import Dropzone from 'react-dropzone'
import moment  from "moment/moment.js";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import {MAIN_API} from '../../service/apiService.js';
import "./Products.css";
import $ from 'jquery';
class Products extends Component {


    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
                {headerName: "Image", field: "image_url" ,headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,cellRenderer: this.countryCellRenderer,autoHeight: true},
                {headerName: "Name", field: "name"},
                {headerName: "Price", field: "price"},
                {headerName: "Created", field: "createdDate", cellRenderer:this.createdDateCellRenderer},
                {headerName: "Updated", field: "updatedDate" , cellRenderer: this.updatedDateCellRenderer},
                {headerName: "Action", field: "action" , cellRenderer: this.actionCellRenderer}

            ],
            rowData: [

            ],
            files: [],
            modal: false,
            isCreate:true,
            name:"",
            price:"",
            filter:"",
            successNotification:false
        }

        this.toggle = this.toggle.bind(this);
        this.createFunction = this.createFunction.bind(this);
        this.bindCreateModal = this.bindCreateModal.bind(this);
        this.onPreviewDrop = this.onPreviewDrop.bind(this);
        this.updateRecord = this.updateRecord.bind(this);
    }

    onPreviewDrop = (files) => {
        console.log(files);

        this.setState({
          files: this.state.files.concat(files),
         });
      }


    toggle() {
        this.setState({
          modal: !this.state.modal,
        });
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
        MAIN_API({
            url: "/product",
            method: "post",
            data: bodyFormData,
            headers: {
              "Content-Type":"multipart/form-data"
            }
          })
            .then(res => {
              console.log(res);


            }).catch();
    }

    onGridReady(params) {
      //console.log(params);

        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;


        const updateData = data => {
          this.setState({ rowData: data });
        };

        MAIN_API({
            url: "/product",
            method: "get"
          })
            .then(res => {
              console.log(res);
              updateData(res.data);

            }).catch();
    }

    countryCellRenderer(params) {
        //console.log(params);

        var flag =
        '<img border="0" width="100" height="100" src="'+params.data.imageUrl+'"';
    return '<span style="cursor: default;">'+flag+'</span>';
    }

    createdDateCellRenderer(params) {
        var t = new Date(params.data.createdDate);
    return '<span>'+moment(t).format("hh:mm:ss DD-MM-YYYY")+'</span>';
    }

    updatedDateCellRenderer(params) {
        var t = new Date(params.data.updatedDate);
    return '<span>'+moment(t).format("hh:mm:ss DD-MM-YYYY")+'</span>';
    }

    actionCellRenderer(params) {
      // var updateBtn  = document.createElement('button');
      // updateBtn.innerText = 'Update';
      // updateBtn.className='btn btn-info';
      // updateBtn.addEventListener('click',(e)=>{
      //     console.log(params.data.id);

      // });

      // var deleteBtn  = document.createElement('button');
      // deleteBtn.innerText = 'Delete';
      // deleteBtn.className='btn btn-danger';
      // deleteBtn.addEventListener('click',);
      // });

      // var element = document.createElement('span');
      // element.append(updateBtn);
      // element.append(deleteBtn);

      // return element;
  }

    onQuickFilterChanged() {
        this.gridApi.setQuickFilter(document.getElementById("filter").value);
      }
     updateRecord(value) {
      console.log(value);

      // var value = this.gridColumnApi.

    }
  render() {

    //const userList = usersData.filter((user) => user.id < 10)
    const previewStyle = {
        display: 'inline',
        width: 100,
        height: 100,
      };

    return (
      <div className="animated fadeIn">
      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                  <ModalHeader toggle={this.toggle}>{this.state.isCreate ? "Create Modal":"Update Modal"}</ModalHeader>
                  <ModalBody>
                  <FormGroup>
                      <Label htmlFor="name">Name</Label>
                      <Input type="text" id="name" placeholder="Enter product name" required
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
                      onChange={e =>{
                        var newState = Object.assign({},this.state,{
                          price : e.target.value
                        })
                        this.setState(newState);
                      }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="image">Price</Label>
                      <Input type="file" id="image" placeholder="Enter product price" required
                      onChange={e =>{
                        var newState = Object.assign({},this.state,{
                          files : e.target.files
                        })
                        this.setState(newState);
                      }}
                      />
                    </FormGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={()=>{this.toggle(); this.createFunction()}}>{this.state.isCreate ?"Create":"Update"}</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                  </ModalFooter>
                </Modal>

                <FormGroup>

                      <Input type="text" id="filter" placeholder="Search"
                      onInput={this.onQuickFilterChanged.bind(this)}
                      />
                    </FormGroup>
        <Button onClick={()=> {this.toggle() ; this.bindCreateModal()}} className="btn btn-primary" >Create</Button>
            <div style={{ height: '550px', width: '100%' }} className="ag-theme-balham">
                <AgGridReact
                    columnDefs={this.state.columnDefs} rowSelection="multiple"
                    rowData={this.state.rowData}
                    enableFilter={true}
                    pagination={true}
                    enableSorting={true}
                    enableColResize={true}
                    onGridReady={this.onGridReady.bind(this)}
                    >
                </AgGridReact>
                <Alert color="primary" isOpen={this.state.successNotification}>
                  This is a primary alert — check it out!
                </Alert>
            </div>
      </div>
    )
  }
}

export default Products;
