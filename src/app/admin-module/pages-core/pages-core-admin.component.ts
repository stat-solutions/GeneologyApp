import { Component, OnInit, HostListener } from '@angular/core';
import { LayoutService } from '../../shared/services/layout.service';

@Component({
  selector: 'app-pages-core-admin',
  templateUrl: './pages-core-admin.component.html',
  styleUrls: ['./pages-core-admin.component.scss']
})
export class PagesCoreAdminComponent implements OnInit {
  setNavLayout: string;
  themeLayout: string;
  setDefaultNavbar: string;
  setToggleNavbar: string;
  setToggleStatus: boolean;
  setVerticalNavbarEffect: string;
  setDeviceType: string;
  setHeaderColorTheme: string;
  setLeftHeaderColorTheme: string;
  setNavbarColorTheme: string;
  setActiveNavColorTheme: string;
  setHeaderHeight: number;
  setFooterHeight: number;
  setCollapsedLeftHeader: boolean;
  constructor(private layoutService: LayoutService) {}

  ngOnInit() {
    this.layoutService.checkWindowWidth(window.innerWidth);

    this.layoutService.navLayoutCast.subscribe(
      navlayout => (this.setNavLayout = navlayout)
    );

    this.layoutService.dfNavbarCast.subscribe(
      dfNavbar => (this.setDefaultNavbar = dfNavbar)
    );
    this.layoutService.toggleNavbarCast.subscribe(
      tNavbar => (this.setToggleNavbar = tNavbar)
    );
    this.layoutService.tStatusCast.subscribe(
      tStatus => (this.setToggleStatus = tStatus)
    );
    this.layoutService.nvEffectCast.subscribe(
      nvEffect => (this.setVerticalNavbarEffect = nvEffect)
    );
    this.layoutService.headerThemeCast.subscribe(
      headerTheme => (this.setHeaderColorTheme = headerTheme)
    );
    this.layoutService.leftHeaderThemeCast.subscribe(
      leftHeaderTheme => (this.setLeftHeaderColorTheme = leftHeaderTheme)
    );
    this.layoutService.navbarThemeCast.subscribe(
      navbarTheme => (this.setNavbarColorTheme = navbarTheme)
    );
    this.layoutService.activeNavThemeCast.subscribe(
      activeNavTheme => (this.setActiveNavColorTheme = activeNavTheme)
    );
    this.layoutService.themeLayoutCast.subscribe(
      themeLayout => (this.themeLayout = themeLayout)
    );
    this.layoutService.collapsedLeftHeaderCast.subscribe(
      collapsedLeftHeader => (this.setCollapsedLeftHeader = collapsedLeftHeader)
    );
    this.layoutService.deviceTypeCast.subscribe(
      appDeviceType => (this.setDeviceType = appDeviceType)
    );

    this.setHeaderHeight = this.layoutService.headerHeight;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.layoutService.getVerticalNavbarOnWindowResize(event.target.innerWidth);
  }
  changeTheToggleStatus() {
    this.layoutService.getToggleStatus();
  }
}
