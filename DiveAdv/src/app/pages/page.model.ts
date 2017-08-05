export class Page {
  constructor(public pageNumber: number,
              public pageText: string,
              public imagePath: string,
              public choices?: [{
                choice: string,
                // goToPage?: number
                page: number
              }]) {}
}
