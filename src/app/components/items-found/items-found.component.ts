import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-items-found',
  templateUrl: './items-found.component.html',
  styleUrls: ['./items-found.component.scss']
})
export class ItemsFoundComponent implements OnInit {

  @Input() itemsFound: number;

  constructor() { }

  ngOnInit(): void { }

}
