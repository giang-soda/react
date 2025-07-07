import { Button } from '~/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { useTheme } from '~/context/ThemeContext';
import { Language, Theme } from '~/constans/app';
import { Moon, Sun } from 'lucide-react';

export function SwitchTheme() {
  const { theme, toggleTheme, language, toggleLanguage } = useTheme();

  return (
    <>
      <div className="flex gap-4">
        <Button onClick={toggleTheme} variant="outline">
          {theme === Theme.LIGHT ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>
        <Select onValueChange={lang => toggleLanguage(lang as Language)} value={language}>
          <SelectTrigger className="mb-2 ml-auto w-[120px]">
            <SelectValue placeholder={language?.toUpperCase()} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={Language.EN}>{Language.EN.toUpperCase()}</SelectItem>
            <SelectItem value={Language.VI}>{Language.VI.toUpperCase()}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
