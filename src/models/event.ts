export interface IEvent {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  country: string;
  state: string;
  city: string;
  street: string;
  geoLocation: {
    lat: number;
    lon: number;
  };
}
