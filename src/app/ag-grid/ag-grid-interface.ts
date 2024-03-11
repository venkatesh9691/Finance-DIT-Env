export interface ICallRecord {
    name: string;
    callId: number;
    duration: number;
    switchCode: string;
    direction: string;
    number: string;
  }
  
  export interface IAccount {
    name: string;
    account: string;
    mobile: number;
    region: string;
    callRecords: ICallRecord[];
  }