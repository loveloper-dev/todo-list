export default class Emptyset {
  constructor(content) {
    this._content = content;
  }

  render() {
    const $wapper = document.createElement("div");
    $wapper.className = "emptyset-wrapper";

    const $content = document.createElement("div");
    $content.className = "emptyset-content";
    $content.innerText = this._content;

    $wapper.appendChild($content);

    console.log($wapper);
    return $wapper;
  }
}
