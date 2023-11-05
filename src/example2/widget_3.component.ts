import { Component } from "@angular/core";
import { Widget } from "src/widget-api/widget.api";

type Widget3Input = { name: string; surname: string };

@Component({
    template: `
        <div style="color: white; background-color: blue; padding: 10px; border-radius: 5px;">
            <div>Widget 3</div>
            <div>name: {{input.name}}</div>
            <div>surname: {{input.surname}}</div>
        </div>
    `
})
export class Widget3Component implements Widget<Widget3Input> {
    input!: Widget3Input;

}