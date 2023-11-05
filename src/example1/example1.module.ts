import { NgModule } from "@angular/core";
import { Widget1Component } from "./widget_1.component";
import { BrowserModule } from "@angular/platform-browser";
import { WidgetModule } from "src/widget-api/widget.module";
import { WidgetGroup } from "src/widget-api/widget.api";
import { Example1WidgetLoader } from "./example1_loaders";

@NgModule({
    declarations: [
        Widget1Component
    ],
    imports: [
        BrowserModule,
        WidgetModule.forRoot(
            {
                loaders: {
                    [WidgetGroup.DEFAULT]: Example1WidgetLoader
                }
            }
        )

    ]
    
})
export class Example1Module {

}