import { AppHeader } from '../../../components/layout/appHeader';
import { ClientForm } from '../../../components/clients/ClientForm';

export default function NewClientPage() {
  return (
    <div>
      <AppHeader />
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Novo cliente</h2>
        <ClientForm />
      </div>
    </div>
  );
}
