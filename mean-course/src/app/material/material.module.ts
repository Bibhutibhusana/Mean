import { NgModule } from "@angular/core";
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from "@angular/material/input";
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatTooltipModule} from  '@angular/material/tooltip'
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion'
import { MatFormFieldModule } from "@angular/material/form-field";

const matModule = [
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatToolbarModule,
  MatTooltipModule,
  MatIconModule,
  MatExpansionModule
]
@NgModule({
  imports:[matModule],
  exports:[matModule]
})
export class MaterialModule{

}
