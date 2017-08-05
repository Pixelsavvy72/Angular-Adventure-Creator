import { Component, OnInit, Input } from '@angular/core';
import { Page } from "../pages/page.model";

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {
  @Input() currentPage: Page;

  constructor() { }

  ngOnInit() {

  }
}
