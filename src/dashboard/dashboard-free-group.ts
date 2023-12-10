import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { BehaviorSubject, Subject, Subscription } from "rxjs";
import { WidgetGroup, WidgetItemConfig } from "src/widget-api/widget.api";
import { WidgetService } from "src/widget-api/widgets.service";


type CustomWidgetItem = {cfg: WidgetItemConfig<any, any>, group: WidgetGroup};

@Component({
    template: `
    <div class="dashboard-group">
        <div class="title-bar">
            <div class="title">Custom</div>
            <ng-container [formGroup]="fg">
                <select formControlName="select">
                    <option [ngValue]="null">select widget to add</option>
                    <optgroup label="DEFAULT" >
                        <option  *ngFor="let w of widgetsDefault$ | async" [ngValue]="w">{{w.cfg.name}}</option>
                    </optgroup>
                    <optgroup label="OTHER" >
                        <option *ngFor="let w of widgetsOther$ | async" [ngValue]="w">{{w.cfg.name}}>{{w.cfg.name}}</option>

                    </optgroup>
                </select>
            </ng-container>
            
        </div>
        <div class="content">
            <div *ngFor="let added of widgetsAdded; let index=index">
                <button (click)="onRemove(index)">remove</button>
                <ng-container [widget]="added.cfg"></ng-container>
            </div>
        </div>
        
    </div>`,
    selector: "dashboard-free-group"
})
export class DashboardFreeGroup implements OnInit, OnDestroy{

    widgetDefaultSubject = new BehaviorSubject<CustomWidgetItem[]>([]);
    widgetOtherSubject = new BehaviorSubject<CustomWidgetItem[]>([]);
    widgetsDefault$ = this.widgetDefaultSubject.asObservable()
    widgetsOther$ = this.widgetOtherSubject.asObservable()
    
    selectModel: CustomWidgetItem| null = null;

    widgetsAdded: CustomWidgetItem[] = []
    fg = new FormGroup({
        select: new FormControl(null)
    });

    private subs: Subscription[] = [];

    constructor(private widgetService: WidgetService){

    }

    ngOnDestroy(): void {
        this.subs.forEach( sub => sub.unsubscribe())
    }

    ngOnInit(): void {
        this.load(WidgetGroup.DEFAULT, this.widgetDefaultSubject);
        this.load(WidgetGroup.OTHER, this.widgetOtherSubject);
        this.subs.push(
            this.fg.valueChanges.subscribe(
                () => this.onSelect()
            )
        )
    }

    private load(group: WidgetGroup, widgetsSubject: BehaviorSubject<CustomWidgetItem[]>){
        this.subs.push(
            this.widgetService.getWidgetsCfg$(group)!.subscribe(
                {
                    next: (cfgs) => {
                        let  widgets = widgetsSubject.getValue();
                        const newItems: CustomWidgetItem[] = cfgs.map(
                            cfg => {
                                return {
                                    cfg,
                                    group
                                }
                            }
                        )
                        widgets = widgets.concat(newItems);
                        console.log("-----> ", widgets);
                        widgetsSubject.next(widgets);
                        
                    },
                }
            )
        )   
    }

    onSelect(){
        const item:CustomWidgetItem|null  = this.fg.get("select")!.value
        if(item){
            this.widgetsAdded = this.widgetsAdded.concat(item);
            this.fg.patchValue(
                {select: null}, {emitEvent: false}
            )
        }
    }

    onRemove(index:number){
        this.widgetsAdded.splice(index,1)
        
    }

}