import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  public pnfBackground = `https://www.wallpapertip.com/wmimgs/77-774852_leonid-afremov-late-stroll.jpg`;
  public artsperLogo = `https://blog.artsper.com/wp-content/uploads/2018/06/Logo_Black.png`;

  constructor() { }

  ngOnInit(): void { }

}
