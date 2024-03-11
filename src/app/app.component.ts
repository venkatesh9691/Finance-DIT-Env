import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AgGridComponent } from "./ag-grid/ag-grid.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, AgGridComponent]
})
export class AppComponent {
  title = 'my-ag-grid-project';
}
