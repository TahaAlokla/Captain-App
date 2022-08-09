import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http);
// }
const materialComponent = [
  MatSidenavModule,
  MatMomentDateModule,
  MatDividerModule,
  MatDialogModule,
  MatDatepickerModule,
  MatListModule,
  MatButtonModule,
  MatFormFieldModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,


]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // TranslateModule

  ],
  exports:[
    TranslateModule,
    ...materialComponent
  ]
})
export class SharedModule { }
