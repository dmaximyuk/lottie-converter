export const generateUniqueId = (): string => {
  const timestamp = Date.now().toString(36); // Текущее время в формате base36
  const random = Math.random().toString(36).substring(2, 10); // Случайная часть
  return `${timestamp}-${random}`;
};
