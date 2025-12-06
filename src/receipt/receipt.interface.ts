export interface ReceiptData {
  goldRate: number;
  items: Array<{
    itemPurchase: string;
    HUID: string;
    weight: number;
  }>;
  makingCharge: number;
  URD: number;
  finalPrice: number;
  discount: number;
  paymenrtMode: string;
}