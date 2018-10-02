import { Component, ElementRef, NgZone, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd, ActivationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UserIdleService } from 'angular-user-idle';

import { TranslateService } from '@ngx-translate/core';

import { PerfectScrollbarConfigInterface, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { Title } from '@angular/platform-browser';
import swal from 'sweetalert2';

const SMALL_WIDTH_BREAKPOINT = 960;

@Component({
  selector: 'app-layout',
  templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent implements OnInit, OnDestroy {

  private _router: Subscription;
  public timeOut = 0;
  public showTimeOut = false;  

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
    private router: Router,private userIdle: UserIdleService,
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

      //Start watching for user inactivity.
      this.userIdle.startWatching();
      //this.userIdle.ping$.subscribe(() => console.log("PING"));
    
      // Start watching when user idle is starting.
      //console.log("verifincando ingreso idle");
      this.userIdle.onTimerStart().subscribe(count => {

        this.timeOut = 120 - count;
        this.showTimeOut = true;
        //console.log(count)
        });
      
    
      // Start watch when time is up.
      this.userIdle.onTimeout().subscribe(() => {
        //console.log('Time is up!');
        this.showTimeOut = false;
        this.closeSeccion();
      } );


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


  stop() {
    this.userIdle.stopTimer();
  }
 
  stopWatching() {

    this.userIdle.stopWatching();
  }
 
  startWatching() {
    this.userIdle.startWatching();
  }
 
  restart() {
    this.userIdle.resetTimer();
    this.showTimeOut = false;
    
  }
  closeSeccion(){
    localStorage.removeItem('currentUserName');
    localStorage.removeItem('token');
    this.router.navigate(['/session/signin']);
    swal('Su session fue cerrada')
  }
 
  onLoggedout() {

    localStorage.removeItem('currentUserName');
    localStorage.removeItem('token');
    //localStorage.clear();
  }  
}
