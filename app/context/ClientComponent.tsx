import { useEffect, useRef, useState } from 'react';
import { Loading } from '~/components/common/Loading';

const loadModule = async (componentPath: string) => {
  switch (componentPath) {
    case 'admin/editor/CKeditorClient':
      return (await import('~/routes/admin/editor/CKeditorClient')).default;
    case 'admin/users/ListClient':
      return (await import('~/routes/admin/users/ListClient')).default;
    case 'admin/users/EditClient':
      return (await import('~/routes/admin/users/EditClient')).default;
    case 'admin/users/CreateClient':
      return (await import('~/routes/admin/users/CreateClient')).default;
    case 'errors/403Client':
      return (await import('~/routes/errors/403Client')).default;
    case 'errors/404Client':
      return (await import('~/routes/errors/404Client')).default;
    case 'errors/500Client':
      return (await import('~/routes/errors/500Client')).default;
    case 'errors/503Client':
      return (await import('~/routes/errors/503Client')).default;
    case 'admin/auth/LoginClient':
      return (await import('~/routes/admin/auth/LoginClient')).default;
    case 'admin/posts/ListClient':
      return (await import('~/routes/admin/posts/ListClient')).default;
    default:
      throw new Error(`Component not found: ${componentPath}`);
  }
};

export default function ClientComponent({ componentPath }: { componentPath: string }) {
  const componentRef = useRef<React.ComponentType | null>(null);
  const [isClient, setIsClient] = useState(false);

  const loadComponent = async () => {
    try {
      const Component = await loadModule(componentPath);
      componentRef.current = Component;
      // signal that component is ready to render
      setIsClient(true);
    } catch (error) {
      console.error('Error loading component', error);
    }
  };

  useEffect(() => {
    // only import when client
    void loadComponent();
  }, [componentPath]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isClient || !componentRef.current) {
    return <Loading />;
  }

  return <componentRef.current />;
}
