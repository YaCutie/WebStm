export class Appointment {
  clinicid: { id: number, clinicName: string; address: string; } = {
    id: 0,
    clinicName: "",
    address: "",
  }
  personalid: { id: number, surname: string, name: string, middlename: string} = {
    id: 0,
    surname: "",
    name: "",
    middlename: "",
  }
  receptionTime: any;
  status: { statusname: string } = {
    statusname: ""
  }
}
