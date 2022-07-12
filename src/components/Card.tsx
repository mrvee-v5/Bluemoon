import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

interface CardProps {
  children: React.ReactNode;
  cardStyles?: object;
  onPress?: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
}
const CardView: React.FC<CardProps> = props => {
  const {cardStyles, onPress, onLongPress} = props;
  return (
    <TouchableWithoutFeedback onPress={onPress} onLongPress={onLongPress}>
      <View style={[styles.cardStyle, cardStyles]}>{props.children}</View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    paddingVertical: hp(1.2),
    paddingHorizontal: 12,
    borderRadius: 5,
    shadowColor: '#a536921a',
    backgroundColor: '#fff',
    margin: 5,
  },
});

export default CardView;
