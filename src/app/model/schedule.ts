export class Schedule {
  id: any;
  clinic: { clinicName: string; address: string; } = {
    clinicName: "",
    address: "",
  }
  cabinet: any;
  starttime: Array<number> = [0, 0];
  stoptime: Array<number> = [0, 0];
  durationofreception: Array<number> = [0, 0];
  day: any;
}
