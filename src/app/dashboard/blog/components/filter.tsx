import { IUserListFilter } from '@/lib/store/slices/user-list-filter';
import { Button, TextField } from '@radix-ui/themes';
import { UseFormRegister } from 'react-hook-form';

interface ChildProps {
  total: number;
  register: UseFormRegister<IUserListFilter>;
  handleSearch: () => void;
  handleClear: () => void;
  setTotal: (total: number) => void;
}

export default function DashboardBlogFilter(props: ChildProps) {
  const handleAddTotal = () => {
    props.setTotal(props.total + 1);
  };

  return (
    <div>
      <div className="pr-10">Total: {props.total}</div>
      <div>
        limit:
        <TextField.Root placeholder="Limit" {...props.register('limit')} />
      </div>
      <div>
        offset:
        <TextField.Root placeholder="Offset" {...props.register('offset')} />
      </div>

      <div className="pt-5">
        <span className="mr-3">
          <Button variant="solid" onClick={props.handleSearch}>
            Search
          </Button>
        </span>

        <span className="mr-3">
          <Button variant="solid" onClick={props.handleClear}>
            Clear
          </Button>
        </span>

        <span className="mr-3">
          <Button variant="solid" onClick={handleAddTotal}>
            Add total
          </Button>
        </span>
      </div>
    </div>
  );
}
