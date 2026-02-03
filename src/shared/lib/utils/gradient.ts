import { colors } from "@/shared/config/colors";

/**
 * Возвращает градиент для бордеров и кнопок
 * @param angle - угол градиента в градусах (по умолчанию 135deg)
 */
export function getGradient(angle: number = 135): string {
  return `linear-gradient(${angle}deg, ${colors.gradient.start} 0%, ${colors.gradient.end} 100%)`;
}

/**
 * Возвращает градиент как объект для использования в style
 */
export function getGradientStyle(angle: number = 135): {
  background: string;
} {
  return {
    background: getGradient(angle),
  };
}

