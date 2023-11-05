import { Observable, delay, of } from "rxjs";
import { WidgetGroup, WidgetItemConfig, WidgetLoader } from "src/widget-api/widget.api";
import { Injectable } from "@angular/core";
import { TimerComponent } from "./timer.component";

@Injectable({providedIn: 'root'})
export class Example3WidgetLoader extends  WidgetLoader{

    override load$(group: WidgetGroup): Observable<WidgetItemConfig<any, any>[]> {
        if(group==WidgetGroup.OTHER){
            return of([
                {
                    name: 'example3-timer',
                    widget: TimerComponent,
                    input: {}
                },
            ]).pipe(
                delay(4000)
            )
        }else {
            return of([])
        }
        
    }
}