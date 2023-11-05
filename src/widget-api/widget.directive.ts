import { Directive, Input, OnInit, ViewContainerRef } from "@angular/core";
import { Widget, WidgetInput, WidgetItemConfig } from "src/widget-api/widget.api";

@Directive({
    selector: "[widget]"
})
export class WidgetDirective<I extends WidgetInput, W extends Widget<I>> implements OnInit {

    @Input('widget') widgetCfg!: WidgetItemConfig<I, W>;

    constructor(private container: ViewContainerRef) {

    }

    ngOnInit(): void {
        const compRef = this.container.createComponent<W>(this.widgetCfg.widget);
        compRef.instance.input = this.widgetCfg.input;
    }

}