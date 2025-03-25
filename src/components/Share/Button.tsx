import { VariantProps, cva } from 'class-variance-authority';
import Link from 'next/link';
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export const buttonStyles = cva(['transition-colors'], {
    variants: {
        variant: {
            default: [
                'bg-[#22d3ee]',
                'text-white',
                'font-bold',
                'flex',
                'justify-center',
                'hover:bg-[#06b6d4]',
                'hover:cursor-pointer',
            ],
            ghost: ['hover:underline'],
            dark: [
                'bg-secondary-dark',
                'hover:bg-secondary-dark-hover',
                'text-secondary',
            ],
            outline: [''],
            borderOnly: [
                'border',
                'border-secondary-border',
                'rounded-md',
                'hover:border-primary',
                'hover:text-primary',
                'dark:text-white',
                'dark:text-secondary-border',
                'dark:hover:text-primary',
            ],
        },
        size: {
            default: ['rounded', 'py-4', 'px-5'],
            icon: [
                'rounded-full',
                'w-10',
                'h-10',
                'flex',
                'items-center',
                'justify-center',
                'p-2.5',
                'text-white',
            ],
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
});

type ButtonProps = VariantProps<typeof buttonStyles> & {
    to?: string; // URL nếu là thẻ <Link>
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ size, variant, className, to, ...props }: ButtonProps) => {
    const buttonClassName = twMerge(buttonStyles({ size, variant }), className);

    if (to) {
        return (
            <Link
                href={to}
                {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
                className={buttonClassName}
            ></Link>
        );
    }

    return <button {...props} className={buttonClassName} />;
};

export default Button;
