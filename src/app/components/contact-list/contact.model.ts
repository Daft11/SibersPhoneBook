export class ContactModel {
  constructor(
    public name: string,
    public phone: string,
    public id: string,
    public username: string = '',
    public email: string = '',
    public adress: Object = {},
    public company: Object = {},
    public posts: Object = {},
    public accountHistoory: Object = {},
    public favorite: boolean = false,
    public avatar: string = ''
  ) {}
}
