import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthGuard } from './shared/guard/auth.guard';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  providers : [AuthGuard]
})
export class AppComponent {
  constructor(translate: TranslateService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');

    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    
  }
}
