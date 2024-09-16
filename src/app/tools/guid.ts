// namespace System {
export class Guid {
  // constructor(public guid: string) {
  //   this._guid = guid;
  // }

  // private _guid: string;

  // public ToString(): string {
  //   return this.guid;
  // }

  // // Static member
  // static MakeNew(): Guid {
  //   var result: string;
  //   var i: string;
  //   var j: number;

  //   result = '';
  //   for (j = 0; j < 32; j++) {
  //     if (j == 8 || j == 12 || j == 16 || j == 20) result = result + '-';
  //     i = Math.floor(Math.random() * 16)
  //       .toString(16)
  //       .toUpperCase();
  //     result = result + i;
  //   }
  //   return new Guid(result);
  // }
  static newGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}
// }
