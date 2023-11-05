import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription, interval } from "rxjs";
import { Widget } from "src/widget-api/widget.api";

@Component({
    template: `
        <div style="background-color: yellow; padding: 10px; border-radius: 5px;">
            <div>timer</div>
            <div>{{time}}</div>
        </div>
    `
})
export class TimerComponent implements Widget<{}>, OnInit, OnDestroy {
    
    
    input: {} = {};

    time: number = 0;
    private sub = Subscription.EMPTY;

    ngOnInit(): void {
     
        this.sub = interval(1000).subscribe(
            () => this.time++
        )
    }


    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}