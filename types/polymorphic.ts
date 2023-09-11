import { ComponentPropsWithRef, ElementType } from "react";

export type AsProp<C extends ElementType> = { as?: C };

type OmitKeys<C extends ElementType, P> = keyof AsProp<C> & P;

export type PolymorphicComponent<C extends ElementType, P> = Omit<
  ComponentPropsWithRef<C>,
  OmitKeys<C, P>
> &
  AsProp<C> &
  P;
