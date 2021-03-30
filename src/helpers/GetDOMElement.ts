interface GetDOMElementInterface {
  getDOMElement(): Element | null;
  getChildrenRects(): DOMRect[];
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

  getChildrenRects(): DOMRect[] {
    const element = this.getDOMElement();
    const children = element?.children;
    const childrenArr: Element[] = children ? [...children] : [];
    const params = childrenArr.map((el: Element) => el.getBoundingClientRect());

    return params;
  }
}

export default GetDOMElement;
