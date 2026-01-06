import * as React from 'react';
import { cn } from '@/app/utils/cn';

function FloatingInput({
                           id,
                           label,
                           className,
                           error,
                           onChange,
                           onFocus,
                           onBlur,
                           ...props
                       }) {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(false);

    const handleFocus = (e) => {
        setIsFocused(true);
        onFocus?.(e);
    };

    const handleBlur = (e) => {
        setIsFocused(false);
        setHasValue(e.target.value.length > 0);
        onBlur?.(e);
    };

    const handleChange = (e) => {
        setHasValue(e.target.value.length > 0);
        onChange?.(e);
    };

    const isFloating = isFocused || hasValue;
    const hasError = !!error;

    return (
        <div className="relative">
            <input
                id={id}
                className={cn(
                    "peer h-14 w-full rounded-md border-2 border-input bg-background px-3 pt-4 text-base outline-none transition-colors",
                    "focus:border-ring focus:ring-ring/30 focus:ring-[3px]",
                    hasError && "border-destructive focus:border-destructive focus:ring-destructive/30",
                    className
                )}
                placeholder=" "
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                {...props}
            />
            <label
                htmlFor={id}
                className={cn(
                    "absolute left-3 transition-all pointer-events-none",
                    isFloating
                        ? "top-2 text-xs"
                        : "top-4 text-base",
                    hasError
                        ? "text-destructive"
                        : isFloating
                            ? "text-primary"
                            : "text-muted-foreground"
                )}
            >
                {label}
            </label>
            {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
    );
}

export { FloatingInput };