export class DirtyContactModel {
  //model for fetching frow external server
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
  //model for object we will work with, without some keys and data we will definitely not use
  //not defined value will be required to create new object
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
