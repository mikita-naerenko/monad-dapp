# ResponsiveModal

Базовый компонент модального окна с автоматическим переключением между Modal (десктоп) и Drawer (мобильные устройства).

## Использование

### Базовый пример

```tsx
import { ResponsiveModal, useResponsiveModal } from "@/shared/ui";

function MyComponent() {
  const { opened, open, close } = useResponsiveModal();

  return (
    <>
      <button onClick={open}>Открыть модалку</button>

      <ResponsiveModal
        opened={opened}
        onClose={close}
        title="Заголовок модалки"
      >
        <p>Содержимое модального окна</p>
      </ResponsiveModal>
    </>
  );
}
```

### С кастомными параметрами

```tsx
<ResponsiveModal
  opened={opened}
  onClose={close}
  title="Настройки"
  size="lg"
  padding={32}
  closeOnClickOutside={false}
  centered={true}
>
  <div>Кастомное содержимое</div>
</ResponsiveModal>
```

### Полноэкранный режим

```tsx
<ResponsiveModal
  opened={opened}
  onClose={close}
  title="Полноэкранная модалка"
  fullScreen={true}
>
  <div>Полноэкранное содержимое</div>
</ResponsiveModal>
```

## Props

| Prop                  | Type               | Default | Description                                |
| --------------------- | ------------------ | ------- | ------------------------------------------ |
| `opened`              | `boolean`          | -       | Состояние открытия модалки                 |
| `onClose`             | `() => void`       | -       | Функция закрытия                           |
| `title`               | `ReactNode`        | -       | Заголовок модалки                          |
| `children`            | `ReactNode`        | -       | Содержимое модалки                         |
| `size`                | `string \| number` | `"md"`  | Размер модалки (только для десктопа)       |
| `fullScreen`          | `boolean`          | `false` | Полноэкранный режим                        |
| `closeOnClickOutside` | `boolean`          | `true`  | Закрывать при клике вне модалки            |
| `closeOnEscape`       | `boolean`          | `true`  | Закрывать при нажатии Escape               |
| `centered`            | `boolean`          | `true`  | Центрировать модалку (только для десктопа) |
| `padding`             | `string \| number` | -       | Кастомный padding                          |

## Хук useResponsiveModal

Удобный хук для управления состоянием модалки:

```tsx
const { opened, open, close, toggle, setOpened } = useResponsiveModal();
```

- `opened` - текущее состояние
- `open()` - открыть модалку
- `close()` - закрыть модалку
- `toggle()` - переключить состояние
- `setOpened(value)` - установить состояние напрямую

## Адаптивность

- **Десктоп (> sm)**: Используется `Modal` из Mantine
- **Мобильные (≤ sm)**: Используется `Drawer` из Mantine (снизу)

Переключение происходит автоматически на основе breakpoint `sm` из темы Mantine.
