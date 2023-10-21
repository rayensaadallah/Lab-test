import { Injectable } from '@angular/core';
import { ImageData } from './ImageData';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() { }
  getRandomImageId(): number {
    return Math.floor(Math.random() * 1084);
  }
  getRandomLoremIpsum(): string {
    const sampleTexts = [
      "test text 1 ",
      "test text 2",
      "test text 3",
      "test text 4",
      "test text 5"
    ];
    const randomIndex = Math.floor(Math.random() * sampleTexts.length);
    return sampleTexts[randomIndex];
  }
  generateData(): ImageData[] {
    const jsonArray: ImageData[] = [];

    for (let i = 0; i < 4000; i++) {
      const imageId = this.getRandomImageId();
      jsonArray.push({
        id: imageId,
        photo: `https://picsum.photos/id/${imageId}/500/500.jpg`,
        author: `Author`, 
        text: this.getRandomLoremIpsum(),
        favorite: false
      });
    }

    return jsonArray;
  }
}
