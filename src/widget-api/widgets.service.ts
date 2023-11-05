import { Inject, Injectable, Injector, Optional } from "@angular/core";
import { Observable, map, merge, mergeMap, of, toArray } from "rxjs";
import { WIDGET_CFG_TOKEN, Widget, WidgetGroup, WidgetItemConfig, WidgetLoader, WidgetsConfig } from "./widget.api";

@Injectable({providedIn:"root"})
export class WidgetService {
    
    private loadersByGroup: {[group in WidgetGroup]?: WidgetLoader[]} = {}
    private cfgsCache : {[group in WidgetGroup]?: WidgetItemConfig<any, any>[]} = {}


    constructor(injector: Injector, @Inject(WIDGET_CFG_TOKEN) @Optional() widgetConfig?:WidgetsConfig[]){
        widgetConfig?.forEach(
            (cfg) => {
                Object.keys(cfg.loaders).forEach(
                    (k) => {

                        const group = k as WidgetGroup
                        if(!this.loadersByGroup[group]){
                            this.loadersByGroup[group] = []
                        }
                        const loader =  cfg.loaders[group]!;
                        const instance = injector.get<WidgetLoader>(loader);
                        this.loadersByGroup[group]!.push(instance);
                    }
                )
            }
        )
        console.log("loadersByGroup", this.loadersByGroup);
    }


    getWidgetsCfg$(group: WidgetGroup): Observable<WidgetItemConfig<any, any>[]>|null {
        if(this.loadersByGroup[group]) {
            if( group in this.cfgsCache){
                return of(this.cfgsCache[group]!)
            }
            const loaders = this.loadersByGroup[group]!;
            const widgets$ = loaders.map( loader => loader.load$(group) );
            return merge(...widgets$);
        }else {
            return null;
        }
    }


    getWidgetCfg$(name: string, group: WidgetGroup): Observable<WidgetItemConfig<any, Widget<any>>|undefined>|null{
        
        const cfg$ = group in this.cfgsCache ? of(this.cfgsCache[group]!) : this.getWidgetsCfg$(group);
        
        if(!cfg$){
            return null;
        }

        return cfg$.pipe(
            mergeMap( cfgs => cfgs ),
            toArray(),
            map(
                (cfgs) => {
                    const find = cfgs.find(
                        (cfg) => {
                            return cfg.name == name
                        }
                    );
                    return find;
                }
            ),
            
        );
    }

    
}