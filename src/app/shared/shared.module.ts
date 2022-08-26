import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {InlineSVGModule} from 'ng-inline-svg';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {TooltipModule} from 'ngx-bootstrap';
import {FieldErrorDisplayComponent} from "./components/field-error-display/field-error-display.component";
import {LoaderComponent} from "./components/loader/loader.component";
import {ModalDialogComponent} from "./components/dialog/modal.dialog.component";
import {LayoutFooterComponent} from "./components/layout-footer/layout-footer.component";
import {UserFooterComponent} from "./components/user-footer/user-footer.component";

// https://angular.io/styleguide#!#04-10
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        InlineSVGModule,
        NgxPaginationModule,
        NgxDatatableModule,
        TooltipModule
    ],
    providers: [DatePipe],
    declarations: [
        FieldErrorDisplayComponent,
        LoaderComponent,
        ModalDialogComponent,
        LayoutFooterComponent,
        UserFooterComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        RouterModule,
        InlineSVGModule,
        NgxPaginationModule,
        TooltipModule,
        NgxDatatableModule,
        FieldErrorDisplayComponent,
        LoaderComponent,
        ModalDialogComponent,
        LayoutFooterComponent,
        UserFooterComponent
    ]
})

// https://github.com/ocombe/ng2-translate/issues/209
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }
}
