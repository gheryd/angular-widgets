import { Observable, delay, of } from "rxjs";
import { WidgetGroup, WidgetItemConfig, WidgetLoader } from "src/widget-api/widget.api";
import { Widget1Component } from "./widget_1.component";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class Example1WidgetLoader extends  WidgetLoader{

    override load$(group: WidgetGroup): Observable<WidgetItemConfig<any, any>[]> {
        if(group==WidgetGroup.DEFAULT){
            return of(
                [
                    {
                        name: 'example1-w1',
                        widget: Widget1Component,
                        input: {label: 'ciao'}
                    }
                ]
            ).pipe(
                delay(2000)
            )
        }else {
            return of([])
        }
        
    }
}