import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CharacterModel } from '../../models/character.model';
import { CharacteresService } from '../../services/characteres/characteres.service';

@Component({
  selector: 'app-list-characteres',
  templateUrl: './list-characteres.component.html',
  styleUrls: ['./list-characteres.component.scss']
})
export class ListCharacteresComponent implements OnInit, OnDestroy {

  public characterSub: any[] = [];
  public listCharacteres: CharacterModel[] = [];
  private countPag = 1;

  constructor(private characterService: CharacteresService) {
    this.createSubscriptions();
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.characterSub.map(item => item.unsubscribe());
  }

  private createSubscriptions() {
    this.characterSub.push(this.characterService.getAllCharacteres(this.countPag).subscribe(items => this.getAllCharacteres(items)));
  }

  private getAllCharacteres(items: CharacterModel[]) { 
    console.log("getAllCharacteres", items);   
    if (this.listCharacteres.length > 0) this.listCharacteres = this.listCharacteres.concat(items);
    else this.listCharacteres = items
  }

  private getCharacterById(items) {
    console.log("getCharacterById", items);
  }

  private getCharacteresById(items) {
    console.log("getCharacteresById", items);
  }

  private getCharacteresByFilters(items) {
    console.log("getCharacteresById", items);
  }

  public onScroll(ev) {
    this.countPag++;
    this.createSubscriptions();
  }
}
