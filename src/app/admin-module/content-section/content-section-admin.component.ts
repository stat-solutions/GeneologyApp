import { Component, OnInit, Input, HostListener } from '@angular/core';
import { LayoutService } from '../../shared/services/layout.service';

@Component({
  selector: 'app-content-section',
  templateUrl: './content-section-admin.component.html',
  styleUrls: ['./content-section-admin.component.scss']
})
export class ContentSectionAdminComponent implements OnInit {
  screenTitle = 'Page Title';
  contentHeight: number;
  @Input() navLayout: string;
  @Input() defaultNavbar: string;
  @Input() toggleNavbar: string;
  @Input() toggleStatus: boolean;
  @Input() navbarEffect: string;
  @Input() deviceType: string;
  @Input() headerColorTheme: string;
  @Input() navbarColorTheme: string;
  @Input() activeNavColorTheme: string;


  constructor(private layoutService: LayoutService) {

   }

  ngOnInit() {
    this.layoutService.contentHeightCast.subscribe(setCtHeight => this.contentHeight = setCtHeight);
  }
  @HostListener('window:resize', ['$event'])
  onResizeHeight(event: any) {
      this.contentHeight = window.innerHeight - this.layoutService.headerHeight;
  }
}
