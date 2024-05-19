export class DisplayColumn {
  public header: string;
  public propName: string;
  public position: number;

  constructor(propName: string, header: string) {
    this.header = header;
    this.propName = propName;
    this.position = 0;
  }
}
