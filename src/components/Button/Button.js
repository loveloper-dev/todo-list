export default class Button {
  constructor(text, additionalClassName, clickEvent) {
    this._text = text;
    this._additionalClassName = additionalClassName;
    this._clickEvent = clickEvent;

    this.$button = null;
  }

  render() {
    if (!this.$button) {
      this.$button = document.createElement("button");
      this.$button.setAttribute("type", "button");
      this.$button.classList.add("button");
      if (this._additionalClassName) {
        this.$button.classList.add(this._additionalClassName);
      }

      this.$button.addEventListener("click", (e) => {
        this._clickEvent();
      });
    }

    this.$button.innerText = this._text;

    return this.$button;
  }
}
