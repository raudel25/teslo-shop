export interface Country {
  id: string;
  code: string;
  name: string;
}

export interface Address {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  postalCode: string;
  city: string;
  countryId: string;
  phone: string;
}
