import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { ToastrModule } from "ngx-toastr";
import { HttpClientModule } from '@angular/common/http';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms'; // import the FormsModule
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {AuthGuard} from "./pages/services/auth-guard.service"
import { AuthService } from "../app/pages/services/auth.service";
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrandService } from "./pages/services/brand.service";
import { DenomService } from "./pages/services/denoms.service";
import { lettersOnlyDirective } from './directives/letters-only';
import {EmailValidationDirective} from './directives/email-validation'

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    lettersOnlyDirective,
    EmailValidationDirective
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes),
    SidebarModule,
    NavbarModule,
    // ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,  ],
  providers: [
    AuthService,AuthGuard,BrandService, DenomService],
  bootstrap: [AppComponent]
})
export class AppModule { }
