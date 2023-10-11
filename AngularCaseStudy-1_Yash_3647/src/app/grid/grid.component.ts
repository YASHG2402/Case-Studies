import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html'
})
export class GridComponent {

    @Input("grid-title") // html aattribute 
    gridTitle : string = ""; // typescript attribute

    // recives 
    gridData : Array<any> = new Array<any>();

    gridColumns : Array<any> = new Array<any>();
    
    
    @Input("grid-data")
    set gridDataSet(_gridData:Array<any>) {
        if(_gridData.length > 0) {
            if(this.gridColumns.length == 0) {
                var columnnames = Object.keys(_gridData[0]);
                for(var index in columnnames)
                this.gridColumns.push(columnnames[index]);
                console.log(index + " " + columnnames[index])
            }
        }
        this.gridData = _gridData;
    console.log(this.gridData)
    }    

    @Output("grid-selected")
    eventemitter : EventEmitter<any> = new EventEmitter<any>();

    SelectedRecord(_selectedobj : any) {
        console.log(_selectedobj)
        this.eventemitter.emit(_selectedobj); 
    }
}
