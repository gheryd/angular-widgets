import { Component } from "@angular/core";
import { Widget } from "src/widget-api/widget.api";

@Component({
    template: `
        <div style="color: white; background-color: red; padding: 10px; border-radius: 5px;">
            <div>Widget 2</div>
            <div>label: {{input.label}}</div>
        </div>
    `
})
export class Widget2Component implements Widget<{label: string}> {
    input!: { label: string; };

}