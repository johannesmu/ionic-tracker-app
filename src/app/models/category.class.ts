export class Category {
  name: string;
  id: string;
  constructor( name: string ) {
    this.name = name;
    this.id = Math.random().toString(36).substring(2);
  }
}
