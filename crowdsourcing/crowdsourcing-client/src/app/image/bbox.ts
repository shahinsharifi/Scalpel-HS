export class Bbox {
  private _label: String;
  private _color: String;
  private _top: number
  private _left: number
  private _bottom: number
  private _right: number


  constructor(label: String, color: String, left: number, top: number,  right: number , bottom: number) {
    this._label = label;
    this._color = color;
    this._top = top;
    this._left = left;
    this._bottom = bottom;
    this._right = right;
  }

  get top(): number {
    return this._top;
  }

  set top(value: number) {
    this._top = value;
  }

  get left(): number {
    return this._left;
  }

  set left(value: number) {
    this._left = value;
  }

  get bottom(): number {
    return this._bottom;
  }

  set bottom(value: number) {
    this._bottom = value;
  }

  get right(): number {
    return this._right;
  }

  set right(value: number) {
    this._right = value;
  }


  get label(): String {
    return this._label;
  }

  set label(value: String) {
    this._label = value;
  }

  get color(): String {
    return this._color;
  }

  set color(value: String) {
    this._color = value;
  }
}
