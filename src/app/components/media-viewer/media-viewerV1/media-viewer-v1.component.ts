import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { IMediaUpload } from '../../../interface/media-upload/media-upload.interface';
import { ISession } from '../../../interface/session/session.interface';
import { ReportService } from '../../../services';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';


@Component({
  selector: 'app-media-viewer-v1',
  templateUrl: './media-viewer-v1.component.html',
  styleUrls: ['./media-viewer-v1.component.scss']
})
export class MediaViewerV1Component implements OnInit, OnDestroy {

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  @Input() reportId: string;
  @Input() height: number;
  @Input() width: number;

  private reportSubscription: Subscription = null;
  public attachments: IMediaUpload[];
  public noImage: string = 'http://healthcarechronicle.com/templateDesign/images/no_Image.jpg';

  constructor(
    private reportService: ReportService
  ) { }

  ngOnInit() {
    this.loadReportAttachments();
  }

  

  ngOnDestroy() {
    (this.reportSubscription) ? this.reportSubscription.unsubscribe() : null;
  }

  loadReportAttachments () {
    if (this.reportId) {
      this.reportSubscription = this.reportService.GetAttachments(this.reportId)
      .subscribe(
        (attachments: IMediaUpload[]) => {
          if (attachments) {
            this.galleryOptions = [
              {
                  width: `${(this.width) ? this.width : 400}px`,
                  height: `${(this.height) ? this.height : 300}px`,
                  thumbnailsColumns: 4,
                  imageAnimation: NgxGalleryAnimation.Slide
              },
              // max-width 800
              {
                  breakpoint: 500,
                  width: '100%',
                  height: '600px',
                  imagePercent: 80,
                  thumbnailsPercent: 20,
                  thumbnailsMargin: 20,
                  thumbnailMargin: 20
              },
              // max-width 400
              {
                  breakpoint: 400,
                  preview: false
              }
            ];

            if (attachments.length !== 0) {
              this.galleryImages = _.map(attachments, (a) => {
                return { small: a.url, medium: a.url, big: a.url };
              });
            } else {
              this.galleryImages = [
                {small: this.noImage, medium: this.noImage, big: this.noImage}
              ];
            }
          }
        }
      );
    }
  }

}
