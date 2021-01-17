export class DirtyContactModel {
  constructor(
    public name: string,
    public phone: string,
    public id: number,
    public username: string,
    public email: string,
    public adress: Object,
    public company: Object,
    public posts: Object,
    public accountHistory: Object,
    public favorite: boolean,
    public avatar: string,
    public website: string
  ) {}
}

export class ContactModel {
  //not defined value will be required to create new ContactModel
  constructor(
    public name: string,
    public phone: string,
    public id: number,
    public email: string = 'none',
    public company: Object = {},
    public favorite: boolean = false,
    public avatar: string = ''
  ) {}
}
