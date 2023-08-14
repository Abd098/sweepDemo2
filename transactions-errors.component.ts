import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { TransactionsError } from '../transactions/transactions-errors.model';
import { Operators } from '../operators/operators.model';
import * as XLSX from 'xlsx';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'transactionsErrors-cmp',
  moduleId: module.id,
  templateUrl: 'transactions-errors.component.html',
  styleUrls: ['../transactions/transaction-errors.component.css'],
})
export class TransactionsErrorsComponent implements OnInit {
  purchaseErrors: any[] = [];
  transactionErrors: any[] = [];
  cardsErrors: any[] = [];

  private apiUrl = environment.apiUrl;
  urlPurchaseErrors: string = this.apiUrl + 'Errors/purchaseErrors';
  urlTransactionErrors: string = this.apiUrl + 'Errors/transactionErrors';
  urlCardsErrors: string = this.apiUrl + 'Errors/cardErrors';
  urlFetchOperators = this.apiUrl + 'operators/getAllOperators';
  isAuthenticated = false;

  fromDate1: string;
  fromDate2: string;
  fromDate3: string;

  toDate1: string;
  toDate2: string;
  toDate3: string;

  selectedOperator1: string;
  selectedOperator2: string;
  selectedOperator3: string;

  filteredData: any[] = [];
  originalData: Operators[] = [];
  data: Operators[] = [];

  transactionsError: TransactionsError;
  errorMessage: string;
  showError = false;
  searchTerm: string = '';
  selectedOperator: string;
  originalDataOperators: Operators[] = [];
  operatorNames: string[] = [];

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Lang': 'en',
    }),
  };

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.http
      .get<Operators[]>(this.urlFetchOperators, this.httpOptions)
      .subscribe(
        (response: Operators[]) => {
          this.originalDataOperators = response;

          // this.operatorNames = Array.from(
          //   new Set(this.originalDataOperators.map((item) => item.operatorSkuName))
          // );

          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  applyPurchaseTransactionErrors() {
    const body = {
      fromDate: this.fromDate1,
      toDate: this.toDate1,
      operatorID: this.selectedOperator1,
    };
    console.log(this.toDate1 + ' toDate ');
    console.log(this.fromDate1 + ' fromDate1 ');
    console.log(this.selectedOperator + ' selectedOperator');

    this.http.post<any[]>(this.urlPurchaseErrors, body).subscribe(
      (response: any[]) => {
        this.purchaseErrors = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  applyCardsErrors() {
    const body = {
      fromDate: this.fromDate2,
      toDate: this.toDate2,
      operatorID: this.selectedOperator2,
    };
    console.log(this.toDate2 + ' todate 2');
    console.log(this.fromDate2 + ' fromDate2 ');
    console.log(this.selectedOperator + ' selectedOperator');

    this.http.post<any[]>(this.urlCardsErrors, body).subscribe(
      (response: any[]) => {
        this.cardsErrors = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  applyUserTransactions() {
    const body = {
      fromDate: this.fromDate3,
      toDate: this.toDate3,
      operatorID: this.selectedOperator3,
    };
    console.log(this.toDate3 + ' todate3 ');
    console.log(this.fromDate3 + ' fromDate 3');
    console.log(this.selectedOperator3 + ' selectedOperator3');

    this.http
      .post<TransactionsError[]>(this.urlTransactionErrors, body)
      .subscribe(
        (response: any[]) => {
          this.transactionErrors = response;
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  generateExcelSheetForTransactionErrors() {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    // Create a new worksheet
    const worksheet = XLSX.utils.json_to_sheet(this.purchaseErrors);
    // const headerRange = XLSX.utils.decode_range(worksheet['!ref']);
    // for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
    //   const cell = XLSX.utils.encode_cell({ r: headerRange.s.r, c: col });
    //   worksheet[cell].s = { fill: { fgColor: { rgb: '#00FF00' } } };
    // }
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'purchaseErrors sheet');

    // Save the workbook to a file
    XLSX.writeFile(workbook, 'purchaseErrors.xlsx');
  }

  generateExcelSheetForUserTransactionErrors() {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    // Create a new worksheet
    const worksheet = XLSX.utils.json_to_sheet(this.transactionErrors);
    // const headerRange = XLSX.utils.decode_range(worksheet['!ref']);
    // for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
    //   const cell = XLSX.utils.encode_cell({ r: headerRange.s.r, c: col });
    //   worksheet[cell].s = { fill: { fgColor: { rgb: '#00FF00' } } };
    // }
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      'UserTransactionErrors sheet'
    );

    // Save the workbook to a file
    XLSX.writeFile(workbook, 'UserTransactionErrors.xlsx');
  }

  generateExcelSheetForCardsErrors() {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    // Create a new worksheet
    const worksheet = XLSX.utils.json_to_sheet(this.cardsErrors);
    // const headerRange = XLSX.utils.decode_range(worksheet['!ref']);
    // for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
    //   const cell = XLSX.utils.encode_cell({ r: headerRange.s.r, c: col });
    //   worksheet[cell].s = { fill: { fgColor: { rgb: '#00FF00' } } };
    // }
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'cardsErrors sheet');

    // Save the workbook to a file
    XLSX.writeFile(workbook, 'cardsErrors.xlsx');
  }

  // callOperatorsAPI(searchTerm: string) {
  //   this.http.get<any[]>(this.urlFetchOperators, this.httpOptions).subscribe(
  //     (response: any[]) => {
  //       this.originalData = response; // set originalData to the array of data from the server
  //       // this.data = [...this.originalData]; // make a copy of originalData and assign it to data        // console.log(response);
  //       this.data = this.originalData.filter((item) =>
  //         item.operatorSkuName
  //           .toLowerCase()
  //           .includes(searchTerm?.toLowerCase() || '')
  //       );
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  // handleSearchTransactionErrors(searchTerm: string) {
  //   if (this.originalData.length === 0) {
  //     this.applyPurchaseTransactionErrors(searchTerm);
  //   } else {
  //     // this.searchTerm = searchTerm;
  //     if (!searchTerm) {
  //       this.data = [...this.originalData]; // reset data to the original array when searchTerm is empty
  //     } else {
  //       this.data = this.originalData.filter((item) =>
  //         item.operatorSkuName
  //           .toLowerCase()
  //           .includes(searchTerm?.toLowerCase() || '')
  //       );
  //       // filter the original array when searchTerm is not empty
  //     }
  //     if (this.data.length === 0) {
  //       this.errorMessage = 'No Operators include the provided Operator Name';
  //       this.showError = true;
  //       setTimeout(() => {
  //         this.showError = false;
  //       }, 2000);
  //     } else {
  //       this.showError = false;
  //     }
  //   }
  // }
}
