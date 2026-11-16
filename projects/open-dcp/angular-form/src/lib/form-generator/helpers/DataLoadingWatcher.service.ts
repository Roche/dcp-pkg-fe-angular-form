import {Injectable, OnDestroy} from "@angular/core";
import {BehaviorSubject, firstValueFrom, zip} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataLoadingWatcherService implements OnDestroy {
  private loadedData: {[key: string]: BehaviorSubject<any>} = {};

  watchers = new Map<string, string[]>();

  ngOnDestroy() {
    Object.values(this.loadedData).forEach(subject => subject.complete());
  }

  registerLoader(key: string) {
    this.loadedData[key] = new BehaviorSubject(null);
  }

  dataLoaded(key: string, data: any) {
    this.loadedData[key].next(data);
  }
  createWatcher(watcherName: string, keys: string[], callback: () => void) {
    this.watchers.set(watcherName, keys);
    firstValueFrom(
      zip(keys.map(key => this.loadedData[key]))
    ).then((value) => {
      setTimeout(() => {
        callback();
        this.watchers.delete(watcherName);
      }, 50);
    });
  }

  watcherExist(watcherName: string, keys: string[]) {
    return this.watchers.has(watcherName) && (this.watchers.get(watcherName) || []).sort().join(',') === keys.sort().join(',');
  }
}
