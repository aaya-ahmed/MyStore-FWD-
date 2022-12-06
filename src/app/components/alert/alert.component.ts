import { Component, Input, OnInit, Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input()type:string=''
  @Input()data:any
  @Output()answer:EventEmitter<boolean>=new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  replay(ans:boolean){
    this.answer.emit(ans)
  }
}
