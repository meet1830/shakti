export interface Form {
  phone: {value: string; error: string};
  street: {value: string; error: string};
  landmark: {value: string; error: string};
  area: {value: string; error: string};
  city: {value: string; error: string};
  zipCode: {value: string; error: string};
}

export enum FormEnum {
  phone = 'phone',
  street = 'street',
  landmark = 'landmark',
  area = 'area',
  city = 'city',
  zipCode = 'zipCode',
}
