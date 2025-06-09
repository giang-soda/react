import { useTheme } from '~/context/ThemeContext';
import { Theme } from '~/constans/theme';
import { Button } from '~/components/ui/button';
import i18n from '~/lib/translator';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '~/components/ui/select';

export function Footer() {
  const { theme, toggleTheme } = useTheme();

  return (
    <footer className="bg-muted/50 dark:bg-muted/70 border-border/50 dark:border-border/30 border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} Soda.</p>
          <div className="flex gap-4">
            <Button onClick={toggleTheme} variant="outline">
              {theme === Theme.LIGHT ? 'Dark' : 'Light'}
            </Button>
            <Select onValueChange={lang => void i18n.changeLanguage(lang)}>
              <SelectTrigger className="mb-2 ml-auto w-[120px]">
                <SelectValue placeholder={i18n.language.toUpperCase()} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="vi">Tiếng Việt</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </footer>
  );
}
