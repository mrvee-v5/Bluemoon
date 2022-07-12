import Toast from 'react-native-toast-message';

export const handleToast = (message: string, type: string) => {
  Toast.show({
    text1: message,
    type: type,
    visibilityTime: 3000,
    position: 'bottom',
  });
};

export const shortenText = (text: string, length: number, dot?: boolean) => {
  const isdoted = dot ? '' : '...';
  return text.length < length ? text : text.substring(0, length) + isdoted;
};
