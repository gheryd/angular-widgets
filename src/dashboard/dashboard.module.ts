import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { DashboardGroupComponent } from "./dashboard-group.component";
import { DashboadComponent } from "./dashboard.component";
import { WidgetModule } from "src/widget-api/widget.module";
import { DashboardFreeGroup } from "./dashboard-free-group";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        DashboadComponent, 
        DashboardGroupComponent, 
        DashboardFreeGroup
    ],
    imports: [
        BrowserModule,
        WidgetModule,
        ReactiveFormsModule
    ],
    exports: [DashboadComponent]
})
export class DashboardModule {

}