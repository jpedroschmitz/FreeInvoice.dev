import clsx from 'clsx';

export function Text({ className, ...props }: React.ComponentPropsWithoutRef<'p'>) {
  return <p data-slot="text" {...props} className={clsx(className, 'text-base/6 text-zinc-500 sm:text-sm/6')} />;
}
