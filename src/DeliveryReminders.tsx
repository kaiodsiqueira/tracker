import { useState, useEffect } from "react";

import Modal from "react-modal";
import { Title } from "./StaticComponents";
import { getPersistentStorage } from "./PersistentStorage";

type Reminder = { name: string };

export function useDeliveryReminders() {

  // Load reminders from persistent storage on component mount or initialize as empty array
  const [reminders, setReminders] = useState<Reminder[]>(
    (getPersistentStorage("reminders") as Reminder[]) || [],
  );

  // Save reminders to persistent storage whenever they change
  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  return {
    addReminder: (reminder: Reminder) => setReminders([...reminders, reminder]),
    removeReminder: (index: number) =>
      setReminders(reminders.filter((_, i) => i !== index)),
    reminders,
  };
}

export function CreateDeliveryReminderButton(props: {
  onSave: (reminder: Reminder) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const [name, setName] = useState("");

  function save() {
    props.onSave({ name });
    setIsOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-emerald-600 text-white rounded shadow mt-3 hover:cursor-pointer hover:bg-emerald-700"
      >
        Criar lembrete
      </button>

      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
        <Title>Criar novo lembrete</Title>

        <label className="text-sx font-medium">Nome</label>
        <input
          type="text"
          placeholder="Nomear lembrete"
          className="mt-2 px-4 py-2 w-full border shadow rounded outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={() => save()}
          className="px-4 py-2 bg-emerald-600 text-white rounded shadow mt-3 hover:cursor-pointer hover:bg-emerald-700"
        >
          Salvar
        </button>

        <button
          onClick={() => setIsOpen(false)}
          className="ml-2 px-4 py-2 border border-black/20 hover:border-black/40 rounded shadow mt-3 hover:cursor-pointer"
        >
          Cancelar
        </button>
      </Modal>
    </>
  );
}

export default function ListDeliveryReminders({
  reminders,
  onRemove,
}: {
  reminders: Reminder[];
  onRemove: (index: number) => void;
}) {
  return (
    <div className="mt-2 flex gap-2">
      {reminders.length > 0 ? (
        reminders.map((reminder, index) => (
          <div
            key={index}
            className="border-2 font-medium rounded px-4 py-2 border-black/10"
          >
            {reminder.name}
            <button
              onClick={() => onRemove(index)}
              className="ml-2 px-2 py-1 bg-red-600 text-white rounded shadow hover:cursor-pointer hover:bg-red-700"
            >
              Remover
            </button>
          </div>
        ))
      ) : (
        <div className="border-2 border-black/10 border-dashed w-full p-6">
          Nenhum lembrete
        </div>
      )}
    </div>
  );
}
