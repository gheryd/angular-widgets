import { Component } from "@angular/core";
import { WidgetGroup } from "src/widget-api/widget.api";
import { WidgetService } from "src/widget-api/widgets.service";

@Component({
    template: `
        <div style="display: flex; gap: 10px;">
            <dashboard-group [group]="WidgetGroup.DEFAULT"></dashboard-group>
            <dashboard-group [group]="WidgetGroup.OTHER"></dashboard-group>
        </div>
        
    `,
    selector: "dashboard"
})
export class DashboadComponent{

    WidgetGroup = WidgetGroup;



    constructor(private widgetService: WidgetService){
        
    }


}