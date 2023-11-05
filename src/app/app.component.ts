import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Widget, WidgetGroup, WidgetItemConfig } from 'src/widget-api/widget.api';
import { WidgetService } from 'src/widget-api/widgets.service';

@Component({
  selector: 'app-root',
  template: `
    <div style="border: 1px solid gray;">
      <div style="color: white; background-color: black; padding: 10px; padding: 10px;">DASHBOARD</div>
      <div style="padding: 10px">
        <dashboard></dashboard>
      </div>
    </div>
    
    <div style="border: 1px solid gray; margin-top:10px;">
        <div style="color: white; background-color: black; padding: 10px; padding: 10px;">widget standalone</div>
        <div style="padding: 10px">
          <ng-container *ngIf="(widgetCfg$ | async) as widgetCfg">
            <div *ngIf="widgetCfg" [widget]="widgetCfg"></div>
          </ng-container>
        </div>
        <div style="padding: 10px">
          <ng-container *ngIf="(widget2Cfg$ | async) as widgetCfg">
            <div *ngIf="widgetCfg" [widget]="widgetCfg"></div>
          </ng-container>
        </div>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  widgetCfg$?: Observable<WidgetItemConfig<any, Widget<any>>|undefined>|null
  widget2Cfg$?: Observable<WidgetItemConfig<any, Widget<any>>|undefined>|null

  constructor(private widgetService: WidgetService){

  }


  ngOnInit(): void {
    this.widgetCfg$ = this.widgetService.getWidgetCfg$('example1-w1', WidgetGroup.DEFAULT);
    this.widget2Cfg$ = this.widgetService.getWidgetCfg$('example3-timer', WidgetGroup.OTHER);
  }

}
