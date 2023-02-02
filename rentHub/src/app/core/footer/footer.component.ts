import { Component, OnInit } from '@angular/core';
import {faFacebook, faInstagram, faLinkedin, faTwitter} from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  faFacebook= faFacebook;
  faInstagram= faInstagram;
  faLinkedin= faLinkedin;
  faTwitter=faTwitter

  constructor() { }

  ngOnInit(): void {
  }

}
