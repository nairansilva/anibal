import { WhereFilterOp } from "firebase/firestore";

export interface FilterFirebaseInterface {
  field: string;
  operator: WhereFilterOp;
  value: string;
}
