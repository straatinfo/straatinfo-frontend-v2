import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarAuthComponent } from './navbar-auth.component';

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ NavbarAuthComponent ],
    exports: [ NavbarAuthComponent ]
})

export class NavbarAuthModule {}
