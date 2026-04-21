import * as Headless from '@headlessui/react';
import { createLink, type LinkComponent } from '@tanstack/react-router';
import React, { forwardRef } from 'react';

type AnchorProps = Omit<React.ComponentPropsWithoutRef<'a'>, 'href'>;

const TanstackLink = createLink(
  forwardRef<HTMLAnchorElement, AnchorProps>(function TanstackLink(props, ref) {
    return (
      <Headless.DataInteractive>
        <a {...props} ref={ref} />
      </Headless.DataInteractive>
    );
  }),
);

export const Link: LinkComponent<typeof TanstackLink> = (props) => {
  return <TanstackLink preload="intent" {...props} />;
};
