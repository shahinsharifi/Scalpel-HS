export class Relation {
  public id: number;
  public object1Label: String;
  public object1Bbox: String;
  public object1Score: number;
  public object1Type: String;
  public object1Attribute: String;
  public object2Label: String;
  public object2Bbox: String;
  public object2Score: number;
  public object2Type: String;
  public object2Attribute: String;
  public relationLabel: String;
  public relationScore: number;
  public valid: boolean;
  public weight: number;
  public isTypical: boolean;
  public reason: String;
  public isAnnotated: boolean;
  public isEdited: boolean;
  public isChosen: boolean;
  public isNewRelation: boolean;
  public sceneCategory: String;


  constructor() {

  }


}

