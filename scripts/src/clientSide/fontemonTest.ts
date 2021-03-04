class GameSync {
  readonly area: HTMLTextAreaElement;
  readonly playerDiv: HTMLDivElement;
  readonly colorPreset: HTMLSelectElement;
  readonly backgroundColorPicker: HTMLInputElement;
  readonly textColorPicker: HTMLInputElement;

  readonly customOption: HTMLOptionElement;

  customBackgroundColor = "#FFFFFF";
  customTextColor = "#000000";

  constructor() {
    this.area = document.getElementById("area")! as HTMLTextAreaElement;
    this.playerDiv = document.getElementById("player")! as HTMLDivElement;
    this.colorPreset = document.getElementById(
      "game-style"
    )! as HTMLSelectElement;
    this.backgroundColorPicker = document.getElementById(
      "background-color"
    )! as HTMLInputElement;
    this.textColorPicker = document.getElementById(
      "text-color"
    )! as HTMLInputElement;
    this.customOption = document.createElement("option");
    this.customOption.value = "Custom";
    this.customOption.innerText = "Custom";
    this.addMouseAndEventListeners();

  }


  addMouseAndEventListeners = () => {
    this.area.addEventListener("input", () => {
      const text = this.area.value;
      this.playerDiv.innerText = text.replace(/\s/g, "_");
    });
    this.playerDiv.addEventListener("input", () => {
      this.area.value = this.playerDiv.innerText;
    });

    this.colorPreset.addEventListener("change", () => {
      const colors = this.presetToColors();
      if (!colors) {
        return;
      }
      const { background, text } = colors;
      this.playerDiv.style.backgroundColor = background;
      this.backgroundColorPicker.value = background;
      this.playerDiv.style.color = text;
      this.textColorPicker.value = text;
    });

    this.backgroundColorPicker.addEventListener("change", () => {
      this.playerDiv.style.backgroundColor = this.backgroundColorPicker.value;
      this.setCustomColors();
    });
    this.textColorPicker.addEventListener("change", () => {
      this.playerDiv.style.color = this.textColorPicker.value;
      this.customTextColor = this.textColorPicker.value;
      this.setCustomColors();
    });
  };
  presetToColors = () => {
    switch (this.colorPreset.value) {
      case "Classic":
        return { background: "#9bbc0f", text: "#0f380f" };
      case "Black and White":
        return { background: "#FFFFFF", text: "#000000" };
      case "Inverted":
        return { background: "#000000", text: "#FFFFFF" };
      case "Custom":
        return {
          background: this.customBackgroundColor,
          text: this.customTextColor,
        };
      default:
        return null;
    }
  };

  setCustomColors = () => {
    if (this.customOption.parentElement == null) {
      this.colorPreset.appendChild(this.customOption);
    }
    this.customBackgroundColor = this.backgroundColorPicker.value;
    this.customTextColor = this.textColorPicker.value;
    this.colorPreset.value = "Custom";
  };
}

let gameSync: GameSync | null = null;
window.onload = () => {
  gameSync = new GameSync();
};
