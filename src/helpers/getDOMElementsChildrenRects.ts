const getDOMElementsChildrenRects = (selector: string): DOMRect[] => {
  const element: Element | null = document.querySelector(selector);
  const children = element?.children;
  const childrenArr: Element[] = children ? [...children] : [];
  const params = childrenArr.map((el: Element) => el.getBoundingClientRect());

  return params;
};

export default getDOMElementsChildrenRects;
