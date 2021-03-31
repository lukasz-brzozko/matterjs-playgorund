interface GetDOMElementInterface {
  getDOMElement(): Element | null;
  getChildrenRects(): DOMRect[];
}
export interface OffsetsParams {
  x: number;
  y: number;
  height: number;
  width: number;
}
class GetDOMElement implements GetDOMElementInterface {
  #selector: string;

  constructor(selector: string) {
    this.#selector = selector;
  }

  getDOMElement(): Element | null {
    const element = document.querySelector(this.#selector);

    return element;
  }

  getDOMElementOffsets(withChildren = false): OffsetsParams[] {
    let elements: HTMLElement[] = [];
    const element = this.getDOMElement() as HTMLElement;
    elements.push(element);
    if (withChildren) {
      const children = this.getChildren();
      const childrenHTML: HTMLElement[] = children !== undefined
        ? [...children] as HTMLElement[]
        : [];
      elements = elements.concat(childrenHTML);
    }

    const offsetsArr = elements.map((el) => {
      const offsets: OffsetsParams = {
        x: el?.offsetLeft,
        y: el?.offsetTop,
        height: el?.offsetHeight,
        width: el?.offsetWidth,
      };
      return offsets;
    });

    return offsetsArr;
  }

  getChildren(): HTMLCollection | undefined {
    const element = this.getDOMElement();
    const children = element?.children;

    return children;
  }

  getChildrenRects(): DOMRect[] {
    const children = this.getChildren();
    const elements: Element[] = children ? [...children] : [];
    const params = elements.map((el: Element) => el.getBoundingClientRect());

    return params;
  }
}

export default GetDOMElement;
