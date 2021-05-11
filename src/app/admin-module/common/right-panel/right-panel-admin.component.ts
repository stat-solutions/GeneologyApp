import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../shared/services/layout.service';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel-admin.component.html',
  styleUrls: ['./right-panel-admin.component.scss'],
})
export class RightPanelAdminComponent implements OnInit {
  rightPanelStatus = false;
  lHeaderTheme: any;
  headerTheme: any;
  leftPanelTheme: any;
  navBarMenuEffectList = [];
  navbarEffect: any;

  constructor(private layoutService: LayoutService) {}


  changeTheRightPanelStatus() {
    this.rightPanelStatus = !this.rightPanelStatus;
  }
  setThemeLayout(event: any) {
    if (event.target.checked) {
      this.layoutService.getThemeLayout('box');
    } else {
      this.layoutService.getThemeLayout('wide');
    }
  }
  setCollapsedLeftHeader(event: any) {
    if (event.target.checked) {
       this.layoutService.getCollapsedLeftHeader(true);
    } else {
      this.layoutService.getCollapsedLeftHeader(false);
    }
  }
  changeNavbar(event: any) {
    if (event.target.checked) {
      this.layoutService.getNavLayout('horizontal');
   } else {
    this.layoutService.getNavLayout('vertical');
   }
  }
  onLheaderThemeChange(themeName: string) {
    event.stopPropagation();
    this.layoutService.getLeftHeaderThemeOnChange(themeName);

  }
  onHeaderThemeChange(themeName: string) {
    event.stopPropagation();
    this.layoutService.getHeaderThemeOnChange(themeName);
  }
  onAsidebarThemeChange(themeName: string) {
    event.stopPropagation();
    this.layoutService.getAsidebarThemeOnChange(themeName);
  }
  onChangeEffect(effect: string) {
    this.layoutService.getNavBarEffect(effect);
    if( effect === 'overlay' || effect === 'push' ) {
      this.layoutService.getDefaultNavbar('offcanvas');
      this.layoutService.getToggleNavbar('expanded');
    }
  }
  ngOnInit() {
    this.navBarMenuEffectList = this.layoutService.navBarMenuEffect;
    this.layoutService.nvEffectCast.subscribe(
      nvEffect => (this.navbarEffect = nvEffect)
    );

    this.lHeaderTheme = [
      {
        theme: 'theme1',
      },
      {
        theme: 'theme2',
      },
      {
        theme: 'theme3',
      },
      {
        theme: 'theme4',
      },
      {
        theme: 'theme5',
      },
      {
        theme: 'theme6',
      },
      {
        theme: 'theme7',
      },
    ];
    this.headerTheme = [
      {
        theme: 'theme1',
      },
      {
        theme: 'theme2',
      },
      {
        theme: 'theme3',
      },
      {
        theme: 'theme4',
      },
      {
        theme: 'theme5',
      },
      {
        theme: 'theme6',
      },
      {
        theme: 'theme7',
      },
    ];
    this.leftPanelTheme = [
      {
        theme: 'theme1',
      },
      {
        theme: 'theme2',
      },
      {
        theme: 'theme3',
      },
      {
        theme: 'theme4',
      },
      {
        theme: 'theme5',
      },
      {
        theme: 'theme6',
      },
      {
        theme: 'theme7',
      },
    ];
  }
}
