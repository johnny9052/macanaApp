import { NgModule } from '@angular/core';
import { ImageSanitizerPipe } from './image-sanitizer.pipe';
import { FiltroPipe } from './filtro.pipe';
import { IndicadorDecimalPipe } from './indicador-decimal.pipe';



@NgModule({
  declarations: [ImageSanitizerPipe, FiltroPipe, IndicadorDecimalPipe],
  exports: [ImageSanitizerPipe, FiltroPipe]
})
export class PipesModule { }
