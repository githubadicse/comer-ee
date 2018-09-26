import { Component, ElementRef, NgZone, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd, ActivationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';

import { PerfectScrollbarConfigInterface, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { Title } from '@angular/platform-browser';

const SMALL_WIDTH_BREAKPOINT = 960;

@Component({
  selector: 'app-layout',
  templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent implements OnInit, OnDestroy {

  private _router: Subscription;

  mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
  url: string;
  sidePanelOpened;
  options = {
    collapsed: false,
    compact: false,
    boxed: false,
    dark: false,
    dir: 'ltr'
  };

  @ViewChild('sidemenu') sidemenu;
  @ViewChild(PerfectScrollbarDirective) directiveScroll: PerfectScrollbarDirective;

  titulo:string;
  public config: PerfectScrollbarConfigInterface = {};

  constructor(
    private title:Title,
    private _element: ElementRef,
    private router: Router,
    zone: NgZone) {
  
      this.getDataRoute()
      .subscribe(
        data => {
          console.log(data);
          this.titulo = data.tituloModulo;
          this.title.setTitle(this.titulo);
        }
      )
      
    this.mediaMatcher.addListener(mql => zone.run(() => {
      this.mediaMatcher = mql;
    }));
  }

  ngOnInit(): void {

    this.url = this.router.url;

    this._router = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      document.querySelector('.app-inner > .mat-drawer-content > div').scrollTop = 0;
      this.url = event.url;
      this.runOnRouteChange();
    });
  }

  getDataRoute(){

    return this.router.events.pipe(
      filter( evento => evento instanceof ActivationEnd ),
      filter( (evento:ActivationEnd) => evento.snapshot.component === undefined ),
      map( (evento:ActivationEnd) => evento.snapshot.data )
    )    

  }

  ngOnDestroy(): void  {
    this._router.unsubscribe();
  }

  runOnRouteChange(): void {
    if (this.isOver()) {
      this.sidemenu.close();
    }

    this.updatePS();
  }

  receiveOptions($event): void {
    this.options = $event;
  }

  isOver(): boolean {
    if (this.url === '/apps/messages' ||
      this.url === '/apps/calendar' ||
      this.url === '/apps/media' ||
      this.url === '/maps/leaflet' ||
      this.url === '/taskboard') {
      return true;
    } else {
      return this.mediaMatcher.matches;
    }
  }

  menuMouseOver(): void {
    if (this.mediaMatcher.matches && this.options.collapsed) {
      this.sidemenu.mode = 'over';
    }
  }

  menuMouseOut(): void {
    if (this.mediaMatcher.matches && this.options.collapsed) {
      this.sidemenu.mode = 'side';
    }
  }

  updatePS(): void  {
    if (!this.mediaMatcher.matches && !this.options.compact) {
      setTimeout(() => {
        this.directiveScroll.update();
      }, 350);
    }
  }
}
