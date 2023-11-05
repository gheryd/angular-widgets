import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { DashboardGroupComponent } from "./dashboard-group.component";
import { DashboadComponent } from "./dashboard.component";
import { WidgetModule } from "src/widget-api/widget.module";

@NgModule({
    declarations: [
        DashboadComponent, 
        DashboardGroupComponent, 
    ],
    imports: [
        BrowserModule,
        WidgetModule
    ],
    exports: [DashboadComponent]
})
export class DashboardModule {

}