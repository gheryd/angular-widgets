import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs";
import { WidgetGroup, WidgetItemConfig } from "src/widget-api/widget.api";
import { WidgetService } from "src/widget-api/widgets.service";

@Component({
    template: `
        <div style="border: 1px solid gray;">
        
            <div style="display: flex; justify-content:space-between; background-color: gray; color: white; padding: 5px; margin-bottom: 10px;">
                <div style="margin-right: 50px;">Group: {{group}}</div>
                <button (click)="onReload()">reload</button>
            </div>

            <div style="display: flex; flex-direction: row; gap: 10px;padding: 10px;flex-wrap:wrap;">
                <div *ngFor="let wCfg of widgets">
                    <ng-container [widget]="wCfg"></ng-container>
                </div>
                <div *ngIf="pending$|async">loading...</div>
            </div>
        </div>
    `,
    selector: "dashboard-group"
})
export class DashboardGroupComponent implements OnInit, OnDestroy{
    @Input() group!: WidgetGroup;
    pendingSubject = new BehaviorSubject<boolean>(false);

    WidgetGroup = WidgetGroup;
    widgets: WidgetItemConfig<any, any>[] = [];
    private sub = Subscription.EMPTY;


    constructor(private widgetService: WidgetService){

    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    get pending$(){
        return this.pendingSubject.asObservable();
    }

    ngOnInit(): void {
        this.load();
    }


    onReload(){
        this.widgets = [];
        this.load();
    }

    private load(){
        this.sub.unsubscribe();
        this.pendingSubject.next(true);
        this.sub = this.widgetService.getWidgetsCfg$(this.group)!.subscribe(
            {
                next: (cfgs) => {
                    this.widgets = this.widgets.concat(cfgs).sort(
                        (a, b) => {
                            if(a.name<b.name){
                                return -1;
                            }else if(a.name>b.name){
                                return 1;
                            }
                            return 0
                        }
                    )
                },
                complete: () => this.pendingSubject.next(false)
            }
        );
    }
} 