import { Button } from '~/components/ui/button';
import { ACTION } from '~/constans';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

interface EditSubmitProps {
  loading: boolean;
  backTo: string;
}

export function EditSubmit({ loading, backTo }: EditSubmitProps) {
  const { t } = useTranslation(['common']);
  const navigate = useNavigate();

  return (
    <div className="flex justify-start gap-2">
      <Button
        variant="outline"
        onClick={() => void navigate(backTo)}
        icon={ACTION.CANCEL}
        type="button"
      >
        {t('actions.cancel', { ns: 'common' })}
      </Button>

      <Button className="btn-save w-fit" loading={loading} icon={ACTION.SAVE}>
        {t('actions.save', { ns: 'common' })}
      </Button>
    </div>
  );
}
