window.onload = () => {
  const area = document.getElementById("area")! as HTMLTextAreaElement;
  const testDiv = document.getElementById("test")!;
  area.addEventListener("input", () => {
    const text = area.value;
    testDiv.innerText = text.replace(/\s/g, "_");
  });
  testDiv.addEventListener("input", () => {
    area.value = testDiv.innerText;
  });
};
