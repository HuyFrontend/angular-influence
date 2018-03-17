import { Http } from '@angular/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, 'i18n/', '.json');
}

export let AppTranslation = TranslateModule.forRoot({
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [Http]
  }
});
