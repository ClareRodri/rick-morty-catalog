import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CharacterModel } from '../../models/character.model';

@Component({
  selector: 'app-card-character',
  templateUrl: './card-character.component.html',
  styleUrls: ['./card-character.component.scss']
})
export class CardCharacterComponent implements OnInit, OnChanges {

  @Input() character: CharacterModel;

  constructor() { }
  
  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log("CardCharacterComponent", changes);
  }

}
