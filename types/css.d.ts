import "react";

/**
 * Lets CSS custom properties be passed through the `style` prop without a cast.
 * The stagger system relies on `style={{ "--d": ".12s" }}`.
 */
declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
