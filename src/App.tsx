import ListDeliveryReminders, {
  CreateDeliveryReminderButton,
  useDeliveryReminders,
} from "./DeliveryReminders";
import { Title } from "./StaticComponents";

function App() {
  const { reminders, addReminder, removeReminder } = useDeliveryReminders();

  return (
    <main className="px-10 py-5">
      <div className="p-4 border-2 border-black/10 shadow-md rounded">
        <div className="flex justify-between gap-2">
          <div>
            <Title>Entregas em progresso...</Title>
            <p className="text-xs">
              Lembretes de entregas que retornarão com dinheiro
            </p>
          </div>

          <CreateDeliveryReminderButton onSave={addReminder} />
        </div>

        <ListDeliveryReminders
          reminders={reminders}
          onRemove={removeReminder}
        />
      </div>
    </main>
  );
}

export default App;
