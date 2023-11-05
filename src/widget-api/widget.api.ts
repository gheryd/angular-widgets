import { InjectionToken, Type } from "@angular/core"
import { Observable } from "rxjs";

export type WidgetInput = {[key: string]: any}

export interface Widget<I extends WidgetInput> {
    input: I
}

export interface WidgetItemConfig<I extends WidgetInput, W extends Widget<I>> {
    name:  string,
    widget: Type<W>,
    input: I
}

export enum WidgetGroup {
    DEFAULT= "DEFAULT",
    OTHER = "OTHER",
}


export abstract class  WidgetLoader {
    abstract load$(group:WidgetGroup): Observable<WidgetItemConfig<any, any>[]>;
    
}

export type WidgetsConfig = {
    loaders: {
        [widget in WidgetGroup]?: Type<WidgetLoader>
    }
}

export const WIDGET_CFG_TOKEN = new InjectionToken<WidgetsConfig>("WIDGET_CFG_TOKEN")