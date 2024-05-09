export default class Emptyset {
  constructor(content) {
    this._content = content;
  }

  render() {
    const $wrapper = document.createElement("div");
    $wrapper.className = "emptyset-wrapper";

    const $content = document.createElement("div");
    $content.className = "emptyset-content";
    $content.innerText = this._content;

    $wrapper.appendChild($content);

    return $wrapper;
  }
}
