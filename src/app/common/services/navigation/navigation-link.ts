export class NavigationLink {
    public id: number;
    public label: string;
    public url: string;
    public active: boolean;
  
    constructor(id: number, label: string, url: string, active: boolean){
      this.id = id;
      this.label = label;
      this.url = url;
      this.active = active;
    }
}
