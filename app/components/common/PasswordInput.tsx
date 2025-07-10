import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

type PasswordInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className={cn('relative rounded-md', className)}>
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder={props.placeholder ?? '********'}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          size="icon"
          variant="ghost"
          disabled={props.disabled}
          className="text-muted-foreground absolute top-1/2 right-1 h-6 w-6 -translate-y-1/2 rounded-md"
          onClick={() => setShowPassword(prev => !prev)}
        >
          {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
        </Button>
      </div>
    );
  }
);
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
