import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import jsQR, { QRCode } from 'jsqr';


@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.page.html',
  styleUrls: ['./miclase.page.scss'],
})
export class miclasePage {

  @ViewChild('fileinput', {static: false}) private fileinput!: ElementRef;
  @ViewChild('video', {static: false}) private video!: ElementRef;
  @ViewChild('canvas', {static: false}) private canvas!: ElementRef;


}

