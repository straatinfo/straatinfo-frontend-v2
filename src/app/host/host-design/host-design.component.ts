import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';
import { DesignActionCreator } from '../../store/action-creators';
import swal from 'sweetalert2';

@Component({
  selector: 'app-host-design',
  templateUrl: './host-design.component.html',
  styleUrls: ['./host-design.component.scss']
})
export class HostDesignComponent implements OnInit {

  public hostId: string;
  private routeParamsSubscription: Subscription = null;
  @select(s => s.design.designs) designs;
  @select(s => s.table.page) page;

  public dataNames = [
    'designName'
  ];
  public dataAliases = [
    'Design Name'
  ];

  constructor(
    private actvatedRoute: ActivatedRoute,
    private designActionCreator: DesignActionCreator,
    private router: Router
  ) { }

  ngOnInit() {

      this.routeParamsSubscription = this.actvatedRoute.params
        .subscribe(
          params => {
              this.hostId = params._hostId;
              this.designActionCreator.GetDesignByHostId(params._hostId);
        }
      );
  }

  onAdd() {
      this.router.navigate([`admin/host-design-add/${this.hostId}`]);
  }

  onMoreClick(event) {
    this.designActionCreator.SelectDesign(event._id);
    this.router.navigate([`admin/host-design-detail/${event._id}`]);
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
              this.designActionCreator.DeleteDesign(event._id);
              swal(
                  'Deleted!',
                  `${event.designName} has been deleted.`,
                  'success'
              );
          }
          }).then(() => {
          this.router.navigate([`admin/host-design/${this.hostId}`]);
      });
  } 
}
