export default class InputSection {
  constructor(keypressEvent) {
    this._keypressEvent = keypressEvent;

    this.$input = null;
    this.$inputSection = null;
  }

  reset() {
    this.$input.value = "";
  }

  render() {
    if (!this.$input) {
      this.$input = document.createElement("input");
      this.$input.setAttribute("type", "text");
      this.$input.setAttribute("placeholder", "What needs to be done?");
      this.$input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this._keypressEvent(e.target.value);
        }
      });

      this.$inputSection = document.createElement("div");
      this.$inputSection.id = "inputSection";
      this.$inputSection.appendChild(this.$input);
    }

    return this.$inputSection;
  }
}
