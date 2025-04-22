function getCurrentTime(): string {
  const currentDate: Date = new Date();
  const hours: string = currentDate.getHours().toString().padStart(2, '0');
  const minutes: string = currentDate.getMinutes().toString().padStart(2, '0');

  const currentTime: string = `${hours}:${minutes}`;
  return currentTime;
}

export default getCurrentTime;
