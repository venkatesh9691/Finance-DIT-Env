import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatSelectModule } from '@angular/material/select'; 
// import { MasterDetailModule } from '@ag-grid-enterprise';
import {
  ColDef,
  CsvCell,
  CsvExportParams,
  ExcelCell,
  ExcelExportParams,
  ExcelRow,
  ExcelStyle,
  GridApi,
  GridReadyEvent,
  ProcessRowGroupForExportParams,
  FirstDataRenderedEvent,
  ModuleRegistry,
  IDetailCellRendererParams,
} from 'ag-grid-community';
import { IAccount, ICallRecord } from './ag-grid-interface';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

@Component({
  selector: 'app-ag-grid',
  standalone: true,
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.css'],
  imports: [AgGridAngular, HttpClientModule]
})
export class AgGridComponent {
  @ViewChild('exportButton') exportButtonRef: any;
  public rowData: any;

  public columnDefs: ColDef[] = [
    { field: 'name',headerName: 'Name', cellRenderer: 'agGroupCellRenderer' },
    { field: 'account',headerName: 'Account', },
    { field: 'mobile',headerName: 'Mobile', },
    { field: 'region',headerName: 'Region', }, //, valueFormatter: "x.toLocaleString() + 'm'"
  ];
  public detailCellRendererParams: any = {
    detailGridOptions: {
      rowSelection: 'multiple',
      suppressRowClickSelection: true,
      enableRangeSelection: true,
      pagination: true,
      paginationAutoPageSize: true,
      columnDefs: [
        { field: 'callId', checkboxSelection: true },
        { field: 'direction' },
        { field: 'number', minWidth: 150 },
        { field: 'duration' }, //, valueFormatter: "x.toLocaleString() + 's'"
        { field: 'switchCode', minWidth: 150 },
      ],
      defaultColDef: {
        flex: 1,
      },
    },
    getDetailRowData: (params) => {
      params.successCallback(params.data.callRecords);
    },
  } as IDetailCellRendererParams<IAccount, ICallRecord>;
  public defaultColDef: ColDef = {
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    flex: 1,
  };
  public rowSelection: 'single' | 'multiple' = 'multiple';
  public paginationPageSize = 100;
  public paginationPageSizeSelector: number[] | boolean = [20, 50, 100];
  public themeClass: string = "ag-theme-quartz";
  public gridApi!: GridApi;

  public defaultCsvExportParams: CsvExportParams = {
    getCustomContentBelowRow: (params) => {
      const rows = this.getRows(params);
      return rows.map((row) => row.cells) as CsvCell[][];
    },
  };
  public defaultExcelExportParams: ExcelExportParams = {
    getCustomContentBelowRow: (params) => this.getRows(params) as ExcelRow[],
    columnWidth: 120,
    fileName: 'ag-grid.xlsx',
  };
  public excelStyles: ExcelStyle[] = [
    {
      id: 'header',
      interior: {
        color: '#aaaaaa',
        pattern: 'Solid',
      },
    },
    {
      id: 'body',
      interior: {
        color: '#dddddd',
        pattern: 'Solid',
      },
    },
  ];

  constructor(private http: HttpClient) { }

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    // arbitrarily expand a row for presentational purposes
    setTimeout(() => {
      params.api.getDisplayedRowAtIndex(1)!.setExpanded(true);
    }, 0);
  }


  onGridReady(params: GridReadyEvent<IAccount>) {
    this.gridApi == params.api;
    params.api.sizeColumnsToFit();
    params.api.resetRowHeights();
    this.http
      .get<IAccount[]>(
        'assets/jsons/master-detail-data.json'
      )
      .subscribe((data) => {
        this.rowData = data;
      });
  }
  ngAfterViewInit(): void {
    // Access gridApi after initialization
    if (this.gridApi) {
      this.exportButtonRef.nativeElement.disabled = false;
      this.gridApi.exportDataAsExcel(); // Export data after grid is ready
    }
  }
  onBtExport() {
    this.gridApi.exportDataAsExcel();
  }

  getRows = (params: ProcessRowGroupForExportParams) => {
    const rows = [
      {
        outlineLevel: 1,
        cells: [
          this.cell(''),
          this.cell('Call Id', 'header'),
          this.cell('Direction', 'header'),
          this.cell('Number', 'header'),
          this.cell('Duration', 'header'),
          this.cell('Switch Code', 'header'),
        ],
      },
    ].concat(
      ...params.node.data.callRecords.map((record: any) => [
        {
          outlineLevel: 1,
          cells: [
            this.cell(''),
            this.cell(record.callId, 'body'),
            this.cell(record.direction, 'body'),
            this.cell(record.number, 'body'),
            this.cell(record.duration, 'body'),
            this.cell(record.switchCode, 'body'),
          ],
        },
      ])
    );
    return rows;
  };
  cell(text: string, styleId?: string): ExcelCell {
    return {
      styleId: styleId,
      data: {
        type: /^\d+$/.test(text) ? 'Number' : 'String',
        value: String(text),
      },
    };
  }

}

// const gridDiv = document.querySelector<HTMLElement>('#myGrid')!;


// public rowData: any[] | null = [
//   {
//     make: 'Tesla',
//     model: 'Model Y',
//     price: 64950,
//     electric: true,
//     month: 'June',
//   },
//   {
//     make: 'Ford',
//     model: 'F-Series',
//     price: 33850,
//     electric: false,
//     month: 'October',
//   },
//   {
//     make: 'Toyota',
//     model: 'Corolla',
//     price: 29600,
//     electric: false,
//     month: 'August',
//   },
//   {
//     make: 'Mercedes',
//     model: 'EQA',
//     price: 48890,
//     electric: true,
//     month: 'February',
//   },
//   {
//     make: 'Fiat',
//     model: '500',
//     price: 15774,
//     electric: false,
//     month: 'January',
//   },
//   {
//     make: 'Nissan',
//     model: 'Juke',
//     price: 20675,
//     electric: false,
//     month: 'March',
//   },
//   {
//     make: 'Vauxhall',
//     model: 'Corsa',
//     price: 18460,
//     electric: false,
//     month: 'July',
//   },
//   {
//     make: 'Volvo',
//     model: 'EX30',
//     price: 33795,
//     electric: true,
//     month: 'September',
//   },
//   {
//     make: 'Mercedes',
//     model: 'Maybach',
//     price: 175720,
//     electric: false,
//     month: 'December',
//   },
//   {
//     make: 'Vauxhall',
//     model: 'Astra',
//     price: 25795,
//     electric: false,
//     month: 'April',
//   },
//   {
//     make: 'Fiat',
//     model: 'Panda',
//     price: 13724,
//     electric: false,
//     month: 'November',
//   },
//   {
//     make: 'Jaguar',
//     model: 'I-PACE',
//     price: 69425,
//     electric: true,
//     month: 'May',
//   },
// ];
// public columnDefs: ColDef[] = [
//   {
//     field: 'make',
//     checkboxSelection: true,
//     editable: true,
//     cellEditor: 'agSelectCellEditor',
//     cellEditorParams: {
//       values: [
//         'Tesla',
//         'Ford',
//         'Toyota',
//         'Mercedes',
//         'Fiat',
//         'Nissan',
//         'Vauxhall',
//         'Volvo',
//         'Jaguar',
//       ],
//     },
//   },
//   { field: 'model' },
//   { field: 'price', filter: 'agNumberColumnFilter' },
//   { field: 'electric' },
//   {
//     field: 'month',
//     comparator: (valueA, valueB) => {
//       const months = [
//         'January',
//         'February',
//         'March',
//         'April',
//         'May',
//         'June',
//         'July',
//         'August',
//         'September',
//         'October',
//         'November',
//         'December',
//       ];
//       const idxA = months.indexOf(valueA);
//       const idxB = months.indexOf(valueB);
//       return idxA - idxB;
//     },
//   },
// ];
