import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrudTableComponent } from './table/crud-table/crud-table.component';
import { RecoveryServiceService } from './service/recovery-service.service';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material-design';
import { DialogDeleteComponent } from './dialogs/dialog-delete/dialog-delete.component';
import { MatFormFieldModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    CrudTableComponent,
    DialogDeleteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule

  ],
  entryComponents: [
    DialogDeleteComponent
  ],
  providers: [
    RecoveryServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
