import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-artwork-card',
  templateUrl: './artwork-card.component.html',
  styleUrls: ['./artwork-card.component.scss']
})
export class ArtworkCardComponent implements OnInit {

  @Input() artwork: any;

  constructor() { }

  ngOnInit(): void {
  }

}
