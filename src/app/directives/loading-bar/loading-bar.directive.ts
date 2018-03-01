import { Directive, ComponentFactory, ComponentRef, Input, TemplateRef, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { LoadingBarComponent } from './loading-bar.component';

@Directive({
  selector: '[appLoadingBar]'
})
export class LoadingBarDirective {

  spinnerFactory: ComponentFactory<LoadingBarComponent>;
  spinnerComponent: ComponentRef<LoadingBarComponent>;

  @Input() 
  set appLoadingBar(loading: boolean) {
    this.vcRef.clear();

    if (loading)
    {
      // create and embed an instance of the spinner component
      this.spinnerComponent = this.vcRef.createComponent(this.spinnerFactory);
    }
    else
    {
      // embed the contents of the host template
      this.vcRef.createEmbeddedView(this.templateRef);
    }    
  }

  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver) {
    // Create resolver for spinner component
    this.spinnerFactory = this.componentFactoryResolver.resolveComponentFactory(LoadingBarComponent);
  }

}
