import { NgModule } from '@angular/core';
import { ImageSanitizerPipe } from './image-sanitizer.pipe';
import { FiltroPipe } from './filtro.pipe';



@NgModule({
  declarations: [ImageSanitizerPipe, FiltroPipe],
  exports: [ImageSanitizerPipe, FiltroPipe]
})
export class PipesModule { }
