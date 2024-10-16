/* eslint-disable react/display-name */
"use client";

import { Editor, EditorProps } from "@toast-ui/react-editor";
import React from "react";

interface Props extends EditorProps {
  forwardedRef: React.ForwardedRef<Editor>;
}

const WrappedEditor = ({ forwardedRef, ...props }: Props) => {
  return <Editor {...props} ref={forwardedRef} />;
};

export default WrappedEditor;
