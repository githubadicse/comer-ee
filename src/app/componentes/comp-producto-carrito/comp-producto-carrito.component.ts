import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { LocalStorageManagerService } from '../../shared/servicio/local-storage-manager.service';
import { Subscription } from 'rxjs/internal/Subscription';


@Component({
  selector: 'app-comp-producto-carrito',
  templateUrl: './comp-producto-carrito.component.html',
  styleUrls: ['./comp-producto-carrito.component.scss'],
  // providers: [LocalStorageManagerService],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompProductoCarritoComponent implements OnInit {
  
  @ViewChild('countCarrito') countCarrito: ElementRef;
  private countLocalStorageSuscription: Subscription;
  
  constructor(
    public localStorageManagerService: LocalStorageManagerService,
    private renderer: Renderer2, private el: ElementRef
  ) { 
            
  }

  ngOnInit() {      
    this.localStorageManagerService.countInitLocalStorage('carrito');

    this.countLocalStorageSuscription = this.localStorageManagerService.countItem$
    .subscribe(res => {
      
      this.renderer.addClass(this.countCarrito.nativeElement, 'animationAddItem');
      
      setTimeout(() => {
        this.renderer.removeClass(this.countCarrito.nativeElement, 'animationAddItem');
      }, 400);
    })

  }

  ngOnDestroy(): void {
    this.countLocalStorageSuscription.unsubscribe();
  }

}
