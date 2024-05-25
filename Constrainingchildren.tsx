
Code that needs to be fixed
import React from "react";
import "./styles.css";

type PropsA = { customProp: string };

const ComponentA: React.FC<PropsA> = ({ customProp }) => {
  return <div>{customProp}</div>;
};

type Child = React.ReactElement<PropsA>;

type PropsB = { children: Child | Child[] };

const ComponentB: React.FC<PropsB> = ({ children }) => {
  return <div>{children}</div>;
};

export default function App() {
  return (
    <ComponentB>
      <ComponentA customProp="Hello" />
      <p>ComponentB should complain</p>
    </ComponentB>
  );
}



// Updated code

import React, { ReactElement, ReactNode } from "react";

type ValidChild = ReactElement<{ customProp: string }>;

type ParentProps = {
  children: ValidChild | ValidChild[];
};

const Parent: React.FC<ParentProps> = ({ children }) => {
  if (!Array.isArray(children)) {
    children = [children];
  }

  const invalidChildren = children.filter(
    (child) => child.type !== ChildComponent
  );

  if (invalidChildren.length > 0) {
    throw new Error("Invalid child components in Parent");
  }

  return <div>{children}</div>;
};

type ChildProps = {
  customProp: string;
};

const ChildComponent: React.FC<ChildProps> = ({ customProp }) => {
  return <div>{customProp}</div>;
};

export default function App() {
  return (
    <Parent>
      <ChildComponent customProp="Hello" />
      <p>Parent should complain</p>
    </Parent>
  );
}


// uupdated this code to avoid looping (filter) children in runtime.

// This approach allows you to catch errors at compile time and ensures that the child components adhere to the expected props and structure.



import React, { ReactElement, ReactNode } from "react";

type ChildProps = {
  customProp: string;
};

type ChildComponentProps = {
  children: ReactNode;
  customProp: string;
};

const ChildComponent: React.FC<ChildProps> = ({ customProp }) => {
  return <div>{customProp}</div>;
};

const Parent: React.FC<ChildComponentProps> = ({ children, customProp }) => {
  return (
    <div>
      <div>{customProp}</div>
      {children}
    </div>
  );
};

export default function App() {
  return (
    <Parent customProp="Parent Custom Prop">
      <ChildComponent customProp="Child 1 Custom Prop" />
      <ChildComponent customProp="Child 2 Custom Prop" />
    </Parent>
  );
}
