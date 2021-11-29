import { Draggable } from "../models/drag-drop.js";
import { Project } from "../models/project.js";
import Component from "./base-component.js";
import { autobind } from "../decorators/autobind.js";

// ProjectItem Class
export class ProjectItem
  extends Component<
    HTMLUListElement,
    HTMLLIElement
  >
  implements Draggable
{
  private project: Project;

  get persons() {
    if (this.project.people === 1) {
      return "1 person";
    } else {
      return `${this.project.people} persons`;
    }
  }

  constructor(hostId: string, project: Project) {
    super(
      "single-project",
      hostId,
      true,
      project.id
    );
    this.project = project;

    this.configure();
    this.renderContent();
  }

  @autobind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData(
      "text/plain",
      this.project.id
    );
    event.dataTransfer!.effectAllowed = "move";
  }

  dragEndHandler(_: DragEvent) {
    console.log("DragEnd");
  }

  configure() {
    this.element.addEventListener(
      "dragstart",
      this.dragStartHandler
    );
    this.element.addEventListener(
      "dragend",
      this.dragEndHandler
    );
  }

  renderContent() {
    this.element.querySelector(
      ".list-title"
    )!.textContent = this.project.title;
    this.element.querySelector(
      ".list-desc"
    )!.textContent = this.project.description;
  }
}
