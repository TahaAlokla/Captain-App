import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http);
// }

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // TranslateModule

  ],
  exports:[
    TranslateModule
  ]
})
export class SharedModule { }
