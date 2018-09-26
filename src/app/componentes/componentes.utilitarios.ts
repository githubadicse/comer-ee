import { Injectable } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Injectable()
export class ComponentesUtilitarios {
    
    constructor(){}

    // calcula el alto del body y de la tabla para aumentar, si existe espacio, mas registros (filas) en la vista (tabla)
    public CalcRowsViewSizeScreen(heightSizeCardBody: number, heightSizeTable: number, paginator: MatPaginator): void {        
        if (paginator.getNumberOfPages() === paginator._pageIndex || heightSizeTable === 0) return;
        let rowI = paginator.pageSize;

        let countRowsAdd = Math.round((heightSizeCardBody - heightSizeTable)/55);
        countRowsAdd  = countRowsAdd > 0 ? countRowsAdd : 0;    

        if ( countRowsAdd > 0 ) {
        // determina si la cantidad de filas a insertar encaja en el alto del carbody (contenedor)
        countRowsAdd = rowI + (countRowsAdd);       
        const RowsxSizeRow = Math.round(countRowsAdd * 55) - heightSizeCardBody;
        if ( RowsxSizeRow > 55) return;
        
        paginator._changePageSize(countRowsAdd);        
        }
    }
}