export default class LoadingSpinner {
  constructor() {
    this.spinner = document.createElement("div");
    this.spinner.role = "status";
    this.span = document.createElement("span");
    this.spinner.classList.add("spinner-border", "text-primary");
    this.span.classList.add("sr-only");
    this.spinner.appendChild(this.span);
    this.spinner.style.position = "absolute";
    this.spinner.style.top = "50vh";
    this.spinner.style.left = "50vw";
    this.spinner.style.display = "none";
    document.querySelector("body").appendChild(this.spinner);
  }
  hide() {
    this.spinner.style.display = "none";
  }
  show() {
    this.spinner.style.display = "block";
  }
}
