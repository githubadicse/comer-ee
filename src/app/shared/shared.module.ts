import { PaginationComponent } from './pagination/pagination.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockUIModule, DataTableModule, GrowlModule } from 'primeng/primeng';

import { DecimalDirective } from './directives/decimal.directive';
import { CurrencyPipePipe } from './directives/currency-pipe.pipe';
import { CtrlAutocompleteDirective } from './directives/ctrl-autocomplete.directive';

import { AuthGuard } from './guard/auth.guard';
import { HighlightDirective } from './directives/highlight.directive';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorAutorizationService } from './interceptor-autorization.service';
import {TableModule} from 'primeng/table';
import { AutocompleteSelectionValidatorDirective } from './validators/autocomplete-selection-validator.directive';




@NgModule({
  imports: [
    
    CommonModule,
    GrowlModule,
    DataTableModule,
    CommonModule,
    BlockUIModule,
    TableModule
   
  ],
  declarations: [PaginationComponent, DecimalDirective, CurrencyPipePipe, HighlightDirective, CtrlAutocompleteDirective, AutocompleteSelectionValidatorDirective],
  providers: [AuthGuard,CurrencyPipePipe
     
    //  {
    //    provide : HTTP_INTERCEPTORS,
    //    useClass : InterceptorAutorizationService,
    //    multi : true
    //  }
 
  ],
  exports: [PaginationComponent, HighlightDirective, CurrencyPipePipe, DecimalDirective, CtrlAutocompleteDirective, AutocompleteSelectionValidatorDirective]

})
export class SharedModule { }
