import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public homeBackground = `https://media.artsper.com/homepage/mainImageDesktop.jpg`;
  public artsperLogo = `https://www.artsper.com/bundles/app/img/ill/ill_logo_full.png`;

  constructor() { }

  ngOnInit(): void { }

}
