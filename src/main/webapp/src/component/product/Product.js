import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class Product extends Component {

    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
                {headerName: "Image", field: "image_url",headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true},
                {headerName: "Name", field: "name"},
                {headerName: "Price", field: "price"},
                {headerName:"Quantity", field:"quantity"}

            ],
            rowData: [
                // {make: "Toyota", model: "Celica", price: 35000},
                // {make: "Ford", model: "Mondeo", price: 32000},
                // {make: "Porsche", model: "Boxter", price: 72000}
            ]
        }
    }

    componentDidMount() {
        
        }

    countryCellRenderer(params) {
        var flag =
        '<img border="0" width="15" height="10" src="https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/images/flags/' +
        params.data.code +
        '.png">';
    return '<span style="cursor: default;">' + flag + " " + params.value + "</span>";
    }    

    onGridReady(params) {
        // this.gridApi = params.api;
        // this.gridColumnApi = params.columnApi;
    
        // const httpRequest = new XMLHttpRequest();
        // const updateData = data => {
        //   this.setState({ rowData: data });
        // };
    }
  render() {
    return (
        <div>
            <div style={{ position: "absolute", top: "0px", left: "0px" }}>
          <input
            type="text"
            // onInput={this.onQuickFilterChanged.bind(this)}
            id="quickFilter"
            placeholder="quick filter..."
          />
        </div>
        <div 
        className="ag-theme-balham"
        style={{ 
          height: '500px', 
          width: '100%' }} 
          >
          <AgGridReact
            enableSorting={true}
            enableColResize={true}
            suppressRowClickSelection={true}
            rowSelection="multiple"
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}>
          </AgGridReact>
      </div>
      </div>
    )
  }
}

export default Product;
