import React from "react";
import { Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

/**
 * Transition padrão para Dialogs e Snackbars, (Mobile)
 */
const SlideTransition = React.forwardRef(function SlideTransition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default SlideTransition;
