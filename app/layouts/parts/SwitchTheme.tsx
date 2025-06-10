import { Button } from "~/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import i18n from "~/lib/translator";
import { useTheme } from "~/context/ThemeContext";
import { Theme } from "~/constans/theme";
import { Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";

export function SwitchTheme() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation('common');

  return (
    <>
      <div className="flex gap-4">
        <Button onClick={toggleTheme} variant="outline" title={t('theme.toggle')}>
          {theme === Theme.LIGHT ? <Sun className="size-4" /> : <Moon className="size-4" />}
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
    </>
  )
}
