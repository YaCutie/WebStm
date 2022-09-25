export class Card {
  id: any;
  surname: any;
  name: any;
  middlename: any;
  postid: { postName: string; } = {
    postName: '',
  };
  specializationId: { specializationName: string; id:number } = {
    id:0,
    specializationName: '',
  };
  clinicid: {id:number, clinicName: string; address: string; } = {
    id: 0,
    clinicName: "",
    address: "",
  }
  category: any;
  rating: any;
  type: any;
  photo: any;

}
