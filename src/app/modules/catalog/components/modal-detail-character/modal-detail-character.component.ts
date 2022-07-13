import { Component, ComponentRef, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-detail-character',
  templateUrl: './modal-detail-character.component.html',
  styleUrls: ['./modal-detail-character.component.scss']
})
export class ModalDetailCharacterComponent implements OnInit {

  title?: string;
  closeBtnName?: string;
  detailModel: any;

  constructor(public bsModalRef: BsModalRef) { } 

  ngOnInit() {
    
  }
}
