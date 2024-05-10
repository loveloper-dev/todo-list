export default class TodoItem {
  constructor(isChecked, content, clickEvent) {
    this._isChecked = isChecked;
    this._content = content;
    this._clickEvent = clickEvent;

    this.$li = null;
    this.$checkbox = null;
  }

  render() {
    if (!this.$li) {
      this.$li = document.createElement("li");
      this.$li.classList.add("todo-item");
      if (this._isChecked) {
        this.$li.classList.add("completed");
      }

      this.$checkbox = document.createElement("input");
      this.$checkbox.setAttribute("type", "checkbox");
      if (this._isChecked) {
        this.$checkbox.setAttribute("checked", this._isChecked);
      }
      this.$li.appendChild(this.$checkbox);

      const $textNode = document.createTextNode(this._content);
      this.$li.appendChild($textNode);

      this.$li.addEventListener("click", () => {
        this._clickEvent();
      });
    }

    return this.$li;
  }
}
