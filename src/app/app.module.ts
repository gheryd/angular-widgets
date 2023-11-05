import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DashboardModule } from 'src/dashboard/dashboard.module';
import { Example1Module } from 'src/example1/example1.module';
import { Example2Module } from 'src/example2/example2.module';
import { WidgetModule } from 'src/widget-api/widget.module';
import { Example3Module } from 'src/example3/example3.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DashboardModule,
    Example1Module,
    Example2Module,
    Example3Module,
    WidgetModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
