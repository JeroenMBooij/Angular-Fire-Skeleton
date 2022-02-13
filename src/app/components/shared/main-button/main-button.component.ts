import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'main-button',
  templateUrl: './main-button.component.html',
  styleUrls: ['./main-button.component.scss']
})
export class MainButtonComponent implements OnInit {

    @Input()
    public label: string = "";

    @Input()
    public disabled = false;


  constructor() { }

  ngOnInit(): void {
  }

}
