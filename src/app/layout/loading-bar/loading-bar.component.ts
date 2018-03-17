import { Component, OnInit, OnDestroy } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { UtilsService } from '../../shared/services/utils.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.css']
})
export class LoadingBarComponent implements OnInit, OnDestroy {
  public isLoading: boolean;
  private subscriptionOverlay: Subscription;
  constructor(private slimLoadingBarService: SlimLoadingBarService,
    private utilsService: UtilsService) {
    this.subscriptionOverlay = new Subscription();
  }

  ngOnInit() {
    this.subscribeOverlayStatus();
  }
  ngOnDestroy() {
    this.subscriptionOverlay.unsubscribe();
  }
  private subscribeOverlayStatus = () => {
    this.subscriptionOverlay = this.utilsService.getOverlay.subscribe( (res: boolean) => {
      if (res) {
        this.start();
        this.isLoading = true;
      } else {
        this.stop();
        this.isLoading = false;
      }
    })
  };

  private start = () => {
    this.slimLoadingBarService.start(() => {
    });
  };

  private stop = () => {
    this.slimLoadingBarService.complete();
  };
}
