import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { WidgetGroup } from "src/widget-api/widget.api";
import { WidgetModule } from "src/widget-api/widget.module";
import { Example2WidgetLoader } from "./example2_loaders";

@NgModule({
    // declarations: [
    //     Widget2Component
    // ],
    imports: [
        BrowserModule,
        WidgetModule.forRoot(
            {
                loaders: {
                    [WidgetGroup.DEFAULT]: Example2WidgetLoader,
                    [WidgetGroup.OTHER]: Example2WidgetLoader
                }
            },
            
        )

    ]
    
})
export class Example2Module {

}