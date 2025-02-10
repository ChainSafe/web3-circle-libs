import type { TokenIconProps } from '@web3icons/react';
import { lazy, Suspense } from 'react';

const TokenIcon = lazy(() =>
  import('@web3icons/react').then((mod) => ({
    default: mod.TokenIcon,
  })),
);

export type LazyTokenIconProps = TokenIconProps & {
  ref?: React.Ref<SVGSVGElement>;
};

export function LazyTokenIcon(props: LazyTokenIconProps) {
  return (
    <Suspense fallback={<div className="w-10 h-10 bg-muted rounded-full" />}>
      <TokenIcon {...props} />
    </Suspense>
  );
}
