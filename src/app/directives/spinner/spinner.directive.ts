import { Directive, ComponentFactory, ComponentRef, Input, TemplateRef, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { SpinnerComponent } from './spinner.component';

@Directive({
  selector: '[appspinner]'
})
export class SpinnerDirective {

  spinnerFactory: ComponentFactory<SpinnerComponent>;
  spinnerComponent: ComponentRef<SpinnerComponent>;

  @Input() 
  set appspinner(loading: boolean) {
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
    this.spinnerFactory = this.componentFactoryResolver.resolveComponentFactory(SpinnerComponent);
  }

}
