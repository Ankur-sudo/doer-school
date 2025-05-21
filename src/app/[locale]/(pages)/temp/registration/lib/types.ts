export interface IRegistrationForm {
  fullName: string; // required;
  gender: "MALE" | "FEMALE" | "OTHER"; // required; enum: MALE, FEMALE, OTHER
  dob: string; // required;
  mobileNumber: string; // required;
  email: string; //
  password: string;
  password_confirm: string;
}

export interface IRegistrationResponse {
  uuid: string;
  userRole: string;
  fullName: string;
  fullNameBn: string;
  mobileNumber: string;
  email: string;
  nationalID: null;
  gender: "MALE" | "FEMALE" | "OTHER";
  dob: string;
  division?: string;
  district?: string;
  thana?: string;
  postalCode?: number;
  address?: string;
  userProfileImage?: string;
  nomineeFullName?: string;
  nomineeFullNameBn?: string;
  nomineeMobileNumber?: string;
  nomineeDob?: string;
  relationShip?: string;
  activeStatus: 0 | 1;
  remarks?: null;
  createdAt: string;
  createdBy: string;
}
