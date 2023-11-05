import { ModuleWithProviders, NgModule } from "@angular/core";
import { WIDGET_CFG_TOKEN, WidgetsConfig } from "./widget.api";
import { WidgetService } from "./widgets.service";
import { WidgetDirective } from "./widget.directive";

@NgModule({
    declarations: [
        WidgetDirective
    ],
    providers: [WidgetService],
    exports: [
        WidgetDirective
    ]
})
export class WidgetModule {
    static forRoot(configs: WidgetsConfig):  ModuleWithProviders<WidgetModule>{
        return {
            ngModule: WidgetModule,
            providers: [
                {provide: WIDGET_CFG_TOKEN, useValue: configs, multi: true}
            ]
        }
    }
}