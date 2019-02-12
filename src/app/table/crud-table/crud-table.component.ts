import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Recovery } from 'src/app/model/recovery.model';
import { RecoveryServiceService } from 'src/app/service/recovery-service.service';
import { MatDialog, MatSnackBar, MatPaginator, MatSort, MatTableDataSource, MatFormFieldModule } from '@angular/material';
import { DialogDeleteComponent } from 'src/app/dialogs/dialog-delete/dialog-delete.component';
import { FormControl, Validators } from '@angular/forms';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';



@Component({
  selector: 'app-crud-table',
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.scss']
})
export class CrudTableComponent implements OnInit {

  constructor(private serv: RecoveryServiceService, public dialog: MatDialog, public snackBar: MatSnackBar) {
    this.recovery = new Array<Recovery>();
}

    @ViewChild(MatPaginator) paginator: MatPaginator;

    addNewRecovery: Recovery[] = [
        { id: 0, unitname: null, mtm: null, recoveryName: null, os: null, mediaTypes: null, location: null  }
    ];

    recovery: Array<Recovery>;
    showTable: boolean;
    statusMessage: string;
    isLoaded = true;
    displayedColumnsRecoverys: string[] = ['id', 'unitname', 'mtm', 'recoveryName', 'os', 'mediaTypes', 'location', 'Change'];
    displayedColumnsAddRecovery: string[] = ['unitname', 'mtm', 'recoveryName', 'os', 'mediaTypes', 'location', 'Change'];
    dataSourceRecoverys: any;
    dataSourceAddRecovery: any;
    newRecovery: Recovery;

    public show1 = true;


    @ViewChild(MatSort) sort: MatSort;
      // типы шаблонов

// //   Form field with error messages
    unitname = new FormControl('', [Validators.required]);
    mtm = new FormControl('', [Validators.required]);
    recoveryName = new FormControl('', [Validators.required]);
    os = new FormControl('', [Validators.required]);
    mediaTypes = new FormControl('', [Validators.required]);
    location = new FormControl('', [Validators.required]);








    ngOnInit() {
        this.loadRecoverys();
        this.dataSourceAddRecovery = new MatTableDataSource();
    }

    applyFilter(filterValue: string) {
        this.dataSourceRecoverys.filter = filterValue.trim().toLowerCase();

        if (this.dataSourceRecoverys.paginator) {
            this.dataSourceRecoverys.paginator.firstPage();
        }
    }

    private loadRecoverys() {
        this.isLoaded = true;
        this.serv.getRecoverys().subscribe((data: Recovery[]) => {
            this.recovery = data;
            this.recovery.sort(function (obj1, obj2) {
                // Descending: first id less than the previous
                return obj2.id - obj1.id;
            });
            this.isLoaded = false;
            this.dataSourceRecoverys = new MatTableDataSource(this.recovery);
            this.dataSourceAddRecovery = new MatTableDataSource(this.addNewRecovery);
            this.dataSourceRecoverys.sort = this.sort;
            this.dataSourceRecoverys.paginator = this.paginator;
        },
            // tslint:disable-next-line:no-shadowed-variable
            error => {
                alert('Error: ' + error.name);
                this.isLoaded = false;
            }
        );
    }

    deleteRecoveryForDialog(recovery: Recovery) {
        this.serv.deleteRecovery(recovery.id).subscribe(data => {
            this.statusMessage = 'Recovery ' + recovery.unitname + ' is deleted',
                this.openSnackBar(this.statusMessage, 'Success');
            this.loadRecoverys();
        });
    }

    editRecovery(recovery: Recovery) {
        this.serv.updateRecovery(recovery.id, recovery).subscribe(data => {
            this.statusMessage = 'Recovery ' + recovery.unitname + ' is updated',
            this.openSnackBar(this.statusMessage, 'Success');
            this.loadRecoverys();
            this.show1 = !this.show1;
            console.log(this.show1);
        },
            // tslint:disable-next-line:no-shadowed-variable
            error => {
                this.openSnackBar(error.statusText, 'Error');
            }
        );
    }


    saveRecovery(recovery: Recovery) {
        // tslint:disable-next-line:max-line-length
        if (recovery.unitname != null && recovery.mtm != null && recovery.recoveryName != null && recovery.os != null  && recovery.mediaTypes != null && recovery.location != null) {
            this.serv.createRecovery(recovery).subscribe(data => {
                this.statusMessage = 'Recovery ' + recovery.unitname + ' is added',
                this.showTable = false;
                this.openSnackBar(this.statusMessage, 'Success');
                this.loadRecoverys();
            },
                // tslint:disable-next-line:no-shadowed-variable
                error => {
                    this.showTable = false;
                    this.openSnackBar(error.statusText, 'Error');
                }
            );
        } else {
            this.openSnackBar('Please enter correct data', 'Error');
        }
    }

    show() {
        this.showTable = true;
        this.addNewRecovery = [{ id: 0, unitname: null, mtm: null, recoveryName: null, os: null, mediaTypes: null , location: null  }];

    }

    cancel() {
        this.showTable = false;
    }

    // snackBar
    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
        });
    }

    // material dialog
    openDialog(element): void {
        const dialogRef = this.dialog.open(DialogDeleteComponent, {
            width: '250px',
            data: element,
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            if (result === 'Confirm') {
                this.deleteRecoveryForDialog(element);
            }
        });
    }
    onSubmit(newRecovery: Recovery) {
        this.newRecovery = new Recovery(0, '', '', '', '', '', '');
    }

    showhideEdit() {
        this.show1 = !this.show1;
    }

    getErrorMessageName() {
        return this.unitname.hasError('required') ? 'Required field. Minimum input 4 characters.'
                : '';
      }

      getErrorMessageMTM() {
        return this.mtm.hasError('required') ? 'Required field. Minimum input 4 characters.'
                : '';
      }

      getErrorMessageRecovery() {
        return this.recoveryName.hasError('required') ? 'Required field. Minimum input 7 characters.'
                : '';
      }

      getErrorMessageOs() {
        return this.os.hasError('required') ? 'Required field. Please select option from dropdown menu.'
                : '';
      }

      getErrorMessageMedia() {
        return this.mediaTypes.hasError('required') ? 'Required field. Please select option from dropdown menu.'
                : '';
      }

      getErrorMessageLocation() {
        return this.location.hasError('required') ? 'Required field. Please select option from dropdown menu.'
                : '';
      }



}
