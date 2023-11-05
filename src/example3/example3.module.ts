import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { WidgetGroup } from "src/widget-api/widget.api";
import { WidgetModule } from "src/widget-api/widget.module";
import { TimerComponent } from "./timer.component";
import { Example3WidgetLoader } from "./example3_loaders";

@NgModule({
    declarations: [TimerComponent],
    imports: [
        BrowserModule,
        WidgetModule.forRoot(
            {
                loaders: {
                    [WidgetGroup.OTHER]: Example3WidgetLoader
                }
            },
            
        )
    ]
})
export class Example3Module {}