export class TransactionsError {
  public fromDate: string | null = null;
  public toDate: string | null = null;
  public operatorID: string | null = null;

  constructor(data?: any) {
    if (data) {
      this.fromDate = data?.fromDate;
      this.toDate = data?.toDate;
      this.operatorID = data?.operatorID;
    }
  }
}

