import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { worker } from './mocks/browser';

if (environment.production) {
  enableProdMode();
}

worker.start({ onUnhandledRequest: 'bypass' });

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
