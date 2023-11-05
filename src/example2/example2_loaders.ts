import { Observable, delay, of } from "rxjs";
import { WidgetGroup, WidgetItemConfig, WidgetLoader } from "src/widget-api/widget.api";
import { Injectable } from "@angular/core";
import { Widget2Component } from "./widget_2.component";
import { Widget3Component } from "./widget_3.component";

@Injectable({providedIn: 'root'})
export class Example2WidgetLoader extends  WidgetLoader{

    override load$(group: WidgetGroup): Observable<WidgetItemConfig<any, any>[]> {
        if(group==WidgetGroup.DEFAULT){
            return of(
                [
                    {
                        name: 'CCC example1-w2',
                        widget: Widget2Component,
                        input: {label: 'Example 2 Riciao'}
                    },
                    {
                        name: 'BBB example1-w2-bis',
                        widget: Widget2Component,
                        input: {label: 'Example 2 Hello!'}
                    },
                    {
                        name: 'AAA example1-w3',
                        widget: Widget3Component,
                        input: {name: "Mario", surname: "Rossi"}
                    },
                ]
            ).pipe(
                delay(5000)
            )
        }else if(group==WidgetGroup.OTHER){
            return of([
                {
                    name: 'example1-w2-other',
                    widget: Widget2Component,
                    input: {label: 'Riciao from other group'}
                },
            ]).pipe(
                delay(1000)
            )
        }else {
            return of([])
        }
        
    }
}