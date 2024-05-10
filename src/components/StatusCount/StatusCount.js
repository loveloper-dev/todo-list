import { STATUS_TYPE } from "../../constants/todo.constants";
export default class StatusCount {
  constructor(type, count) {
    this._type = type;
    this._count = count;
  }

  getIcon() {
    switch (this._type) {
      case STATUS_TYPE.ACTIVE:
        return "☑️";
      case STATUS_TYPE.COMPLETED:
        return "✅";
      default:
        console.error("[getIcon] Invalid type");
        return "";
    }
  }

  render() {
    const $status = document.createElement("div");
    $status.innerText = `${this.getIcon()} ${this._count}`;

    return $status;
  }
}
