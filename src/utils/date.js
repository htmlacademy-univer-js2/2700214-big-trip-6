import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const formatEventDate = (date) => dayjs(date).format('DD MMM').toUpperCase();

const formatEventTime = (date) => dayjs(date).format('HH:mm');

const formatDuration = (dateFrom, dateTo) => {
  const diffMs = dayjs(dateTo).diff(dayjs(dateFrom));
  const durationValue = dayjs.duration(diffMs);

  const days = Math.floor(durationValue.asDays());
  const hours = durationValue.hours();
  const minutes = durationValue.minutes();

  const hoursPart = ` ${String(hours).padStart(2, '0')}H`;
  const minutesPart = ` ${String(minutes).padStart(2, '0')}M`;

  if (diffMs < 60 * 60 * 1000) {
    return `00H${minutesPart}`;
  }

  if (diffMs < 24 * 60 * 60 * 1000) {
    return `${String(hours).padStart(2, '0')}H${minutesPart}`;
  }

  return `${String(days).padStart(2, '0')}D${hoursPart}${minutesPart}`.trim();
};

const formatTripDates = (dateFrom, dateTo) => {
  const startDate = dayjs(dateFrom);
  const endDate = dayjs(dateTo);

  if (startDate.isSame(endDate, 'month')) {
    return `${startDate.format('DD MMM')} — ${endDate.format('DD')}`.toUpperCase();
  }

  return `${startDate.format('DD MMM')} — ${endDate.format('DD MMM')}`.toUpperCase();
};

export {formatEventDate, formatEventTime, formatDuration, formatTripDates};
