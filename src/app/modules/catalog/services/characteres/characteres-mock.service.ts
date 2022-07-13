import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CharacterModel } from '../../models/character.model';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FiltersModel } from 'src/app/modules/shared/models/filtesModel';

export class CharacteresMockService {

  constructor() { }

  public getCharacteres() {
    return [
      {
        created: "2017-11-04T18:48:46.250Z",
        gender: "Male",
        id: 1,
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        location: { name: "Citadel of Ricks", url: "https://rickandmortyapi.com/api/location/3" },
        name: "Rick Sanchez",
        origin: { name: "Earth (C-137)", url: "https://rickandmortyapi.com/api/location/1" },
        species: "Human",
        status: "Alive",
        type: "",
        url: "https://rickandmortyapi.com/api/character/1"
      },
      {
        id: 2,
        name: "Morty Smith",
        status: "Alive",
        species: "Human",
        type: "",
        gender: "Male",
        origin: {
          name: "unknown",
          url: ""
        },
        location: {
          name: "Citadel of Ricks",
          url: "https://rickandmortyapi.com/api/location/3"
        },
        image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
        url: "https://rickandmortyapi.com/api/character/2",
        created: "2017-11-04T18:50:21.651Z"
      }
    ]
  }

}
