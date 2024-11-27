import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,PlaceholderContent,PlaceholderName
} from '@microsoft/sp-application-base';
// import { Dialog } from '@microsoft/sp-dialog';
// import styles from "./ApplicationCustomizer.module.scss";
import styles from './ApplicationCustomizer.Module.scss';
import {escape} from "@microsoft/sp-lodash-subset";
import * as strings from 'ApplicationCustomizerApplicationCustomizerStrings';

const LOG_SOURCE: string = 'ApplicationCustomizerApplicationCustomizer';


 
export interface IApplicationCustomizerApplicationCustomizerProperties {
 
 Top:string;
 Bottom:string
}

export default class ApplicationCustomizerApplicationCustomizer
  extends BaseApplicationCustomizer<IApplicationCustomizerApplicationCustomizerProperties> {
    private _topPlaceHolder:PlaceholderContent|undefined;
    private _bottomPlaceHolder:PlaceholderContent|undefined

  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    this.context.placeholderProvider.changedEvent.add(this,this._renderPlaceHolder);
    return Promise.resolve();
  }
private _renderPlaceHolder():void{
  console.log("Available Placeholder",this.context.placeholderProvider.placeholderNames.map(name=>PlaceholderName[name]).join(","));

  //Handling top Placeholder
  if(!this._topPlaceHolder){
    this._topPlaceHolder=this.context.placeholderProvider.tryCreateContent(
      PlaceholderName.Top,{onDispose:this._onDispose}
    );
    //the extension should not assume that the expected place holder is not availble
    if(!this._topPlaceHolder){
      console.error("The expected Top placeholder is not availble");
      return;
    }
    if(this.properties){
      let topString:string=this.properties.Top;
      if(!topString){
        topString="Top string property is undefined";
      }
      if(this._topPlaceHolder.domElement){
        this._topPlaceHolder.domElement.innerHTML=`
        <div class="${styles.app}">
        <div class="${styles.top}">
        <i class ="ms-Icon--Info" aria-hidden="true"></i>${escape(topString)}
        </div>
        </div>
        `
      }
    }
  }

  //Handling Bottom Placeholde
  if(!this._bottomPlaceHolder){
    this._bottomPlaceHolder=this.context.placeholderProvider.tryCreateContent(
      PlaceholderName.Bottom,{onDispose:this._onDispose}
    );
    //Simple comment
    //the extension should not assume that the expected place holder is not availble
    if(!this._bottomPlaceHolder){
      console.error("The expected Bottom placeholder is not availble");
      return;
    }
    if(this.properties){
      let BottomString:string=this.properties.Bottom;
      if(!BottomString){
        BottomString="BottomString string property is undefined";
      }
      if(this._bottomPlaceHolder.domElement){
        this._bottomPlaceHolder.domElement.innerHTML=`
        <div class="${styles.app}">
        <div class="${styles.bottom}">
        <i class ="ms-Icon--Info" aria-hidden="true"></i>${escape(BottomString)}
        </div>
        </div>
        `
      }
    }
  }
}
  //Dispose method

  private _onDispose(){
    console.log("it's a dispose method");
  }
}
