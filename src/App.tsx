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
            <Title>Lembretes pendentes</Title>
            <p className="text-xs">
              eg. Dinheiro a receber de entregadores ou pagamentos pendentes para ainda hoje
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
