import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagePipe'
})
export class ImagePipe implements PipeTransform {
  transform( heroe: Heroe ): string {
    return `assets/heroes/${heroe.id}.jpg`;
  }
}