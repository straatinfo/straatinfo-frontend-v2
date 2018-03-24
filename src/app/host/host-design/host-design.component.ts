import { Component, OnInit, DoCheck } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';
import { DesignActionCreator, HostActionCreator } from '../../store/action-creators';
import swal from 'sweetalert2';
import { IHostView } from '../../interface/host/host-view.interface';
import { IDesignView } from '../../interface/design/design-view.interface';

@Component({
  selector: 'app-host-design',
  templateUrl: './host-design.component.html',
  styleUrls: ['./host-design.component.scss']
})
export class HostDesignComponent implements OnInit, DoCheck {

  private routeParamsSubscription: Subscription = null;
  private hostSubscription: Subscription = null;

  @select(s => s.design.designs) designs;
  @select(s => s.design.spinner) designSpinner;
  @select(s => s.host.spinner) hostSpinner$: Observable<boolean>;
  @select(s => s.table.page) page;
  @select(s => s.host.selectedHost) selectedHost;
  @select(s => s.host.selectedHostActiveDesign) activeDesign$: Observable<IDesignView>;

  public hostName: string;
  public hostId: string;
  public activeDesignName: string;

  public dataNames = [
    'designName'
  ];
  public dataAliases = [
    'Design Name'
  ];

  private isHostDataLoaded = false;

  constructor(
    private actvatedRoute: ActivatedRoute,
    private designActionCreator: DesignActionCreator,
    private router: Router,
    private hostActionCreator: HostActionCreator
  ) { }

  ngOnInit() {

    this.routeParamsSubscription = this.actvatedRoute.params
      .subscribe(
        params => {
          this.hostId = params._hostId;
          this.designActionCreator.GetDesignByHostId(params._hostId);
          this.hostActionCreator.SelectHost(params._hostId);
          this.loadHostData();
        }
      );
  }

  ngDoCheck() {
    
  }

  onAdd() {
    this.router.navigate([`admin/host/design/add/${this.hostId}`]);
  }

  onBack() {
    this.router.navigate([`admin/host/${this.hostId}`]);
  }

  onMoreClick(event) {
    this.designActionCreator.SelectDesign(event._id);
    this.router.navigate([`admin/host/design/detail/${event._id}`]);
  }

  onSelectClick(event) {
    if (event._id && event._host) {
      this.hostActionCreator.SetActiveDesign(event._id, event._host, false);
    }
  }

  loadHostData () {
    this.hostSubscription = this.selectedHost
    .subscribe((host: IHostView) => {
      if (host) {
        this.hostActionCreator.GetActiveDesign(host._activeDesign);
        this.hostName = host.hostName;
        this.isHostDataLoaded = true;
      }
    });
  }

  onDeleteClick(event) {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result) {
        this.designActionCreator.DeleteDesign(event._id, event);
        swal(
          'Deleted!',
          `${event.designName} has been deleted.`,
          'success'
        );
      }
    }).then(() => {
    });
  }
}
