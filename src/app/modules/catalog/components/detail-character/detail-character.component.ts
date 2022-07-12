import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterModel } from '../../models/character.model';
import { CharacteresService } from '../../services/characteres/characteres.service';

@Component({
  selector: 'app-detail-character',
  templateUrl: './detail-character.component.html',
  styleUrls: ['./detail-character.component.scss']
})
export class DetailCharacterComponent implements OnInit, OnDestroy {

  private routeSub: any;
  private characteresSub: any;
  public detailModel: CharacterModel;

  constructor(private route: ActivatedRoute, public characteresService: CharacteresService) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(qparams => {
      const params = qparams["params"]; 
      if (params["id"] != undefined) this.getCharacteresById(params["id"])
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.characteresSub.unsubscribe();
  }

  public getCharacteresById(id: number) {
    this.characteresSub = this.characteresService
      .getCharacterById(id)
      .subscribe(character => {
        this.detailModel = character;
      });
  }
}
