import { Button } from '~/components/ui/button';
import { ACTION } from '~/constans';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

interface EditSubmitProps {
  loading: boolean;
  backTo: string;
  setOpenDelete?: (open: boolean) => void;
}

export function EditSubmit({ loading, backTo, setOpenDelete }: EditSubmitProps) {
  const { t } = useTranslation(['common']);
  const navigate = useNavigate();

  return (
    <div className="flex justify-start gap-2">
      <Button
        variant="outline"
        onClick={() => void navigate(backTo)}
        icon={ACTION.CANCEL}
        type="button"
        disabled={loading}
      >
        {t('actions.cancel', { ns: 'common' })}
      </Button>

      {setOpenDelete && (
        <Button
          variant="outline"
          type="button"
          icon={ACTION.DELETE}
          onClick={() => setOpenDelete(true)}
          disabled={loading}
        >
          {t('actions.delete', { ns: 'common' })}
        </Button>
      )}

      <Button className="btn-save w-fit" loading={loading} icon={ACTION.SAVE}>
        {t('actions.save', { ns: 'common' })}
      </Button>
    </div>
  );
}
