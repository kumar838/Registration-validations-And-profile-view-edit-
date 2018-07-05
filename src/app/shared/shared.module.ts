import { NgModule } from '@angular/core';

import { HiddenDirective } from '../Directives/mydirective.directive';

@NgModule({
    declarations: [
      HiddenDirective
    ],
    exports: [
      HiddenDirective
    ]
})
export class SharedModule{}