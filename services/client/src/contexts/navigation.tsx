"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { Route } from "next";
import { RouteType } from "next/dist/lib/load-custom-routes";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { cloneElement, ReactElement, useCallback, useEffect } from "react";

export function useConfirmNavigation(
  message: string = "Are you sure you want to leave this page?"
) {
  const router = useRouter();

  useEffect(() => {
    const abortController = new AbortController();
    // intercept browser reload/forward/back events
    window.addEventListener(
      "beforeunload",
      (e: BeforeUnloadEvent) => {
        if (!window.confirm(message)) {
          e.preventDefault();
          e.returnValue = "";
          return e.returnValue;
        }
      },
      {
        capture: true,
        signal: abortController.signal,
      }
    );
    window.addEventListener(
      "popstate",
      (e: PopStateEvent) => {
        if (!window.confirm(message)) {
          e.preventDefault();
          router.forward();
          return;
        }
      },
      { capture: true, signal: abortController.signal }
    );
    // cleanup event listeners
    return () => abortController.abort();
  }, [message]);

  function withConfirmation<T extends (...args: any[]) => any>(
    routerFunction: T
  ) {
    return (...args: Parameters<T>): Promise<boolean> => {
      const userConfirmed = window.confirm(message);
      if (userConfirmed) {
        const result = routerFunction(...args);
        return Promise.resolve(true as any); // Casting to match the expected return type
      }
      return Promise.resolve(false as any); // Casting to match the expected return type
    };
  }

  const pushWithConfirmation = useCallback(withConfirmation(router.push), [
    router,
  ]);
  const backWithConfirmation = useCallback(withConfirmation(router.back), [
    router,
  ]);
  const replaceWithConfirmation = useCallback(
    withConfirmation(router.replace),
    [router]
  );

  return {
    ...router,
    push: pushWithConfirmation,
    back: backWithConfirmation,
    replace: replaceWithConfirmation,
    // Add other router methods here if needed
  };
}

interface ConfirmLinkProps extends LinkProps<RouteType> {
  children: ReactElement | string;
}

export const ConfirmLink: React.FC<ConfirmLinkProps> = ({
  children,
  ...props
}) => {
  const router = useConfirmNavigation();

  const handleClick = (e: React.MouseEvent, href: Route) => {
    e.preventDefault();
    router.push(href);
  };

  const content =
    typeof children === "string" ? (
      <a onClick={(e) => handleClick(e, props.href as Route)}>{children}</a>
    ) : (
      cloneElement(children as ReactElement, {
        onClick: (e: React.MouseEvent) => handleClick(e, props.href as Route),
      })
    );

  return <Link {...props}>{content}</Link>;
};

export default ConfirmLink;
