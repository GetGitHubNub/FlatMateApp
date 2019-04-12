import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import {
  createBottomTabNavigator,
  createAppContainer,
  createDrawerNavigator
} from 'react-navigation';

import { Card } from 'react-native-elements'
import { Calendar } from 'react-native-calendars'
import { GiftedChat } from 'react-native-gifted-chat'

class Home extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: 'blue'
    }
  };
  render() {
    return (
      <AppContainer />
    );
  }
}

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, paddingTop: 100 }}>
        <Card title="Hello">
          <Text>To Do List </Text>
          <Text>Pay Rent </Text>
        </Card>
      </View>
    );
  }
}

const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' };
const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' };
const workout = { key: 'workout', color: 'green' };

// markedDates = {{
//     '2019-04-25': { dots: [vacation, massage, workout], selected: true, selectedColor: 'red' },
//     '2019-04-26': { dots: [massage, workout], disabled: true },
// }},
// markingType = { 'multi-dot'}

class CalendarScreen extends React.Component {
  render() {
    return (
      <Calendar>
        // Handler which gets executed on day press. Default = undefined
         onDayPress={(day) => {console.log('selected day', day)}}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={(day) => {console.log('selected day', day)}}

        // Collection of dates that have to be colored in a special way. Default = {}
        markedDates={
        {'2012-05-20': {textColor: 'green'},
         '2012-05-22': {startingDay: true, color: 'green'},
        '2012-05-23': {selected: true, endingDay: true, color: 'green', textColor: 'gray'},
         '2012-05-04': {disabled: true, startingDay: true, color: 'green', endingDay: true}
        }}
       // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
       markingType={'period'}  
      </Calendar>
    );
  }
}

class ChatScreen extends React.Component {
  state = {
    message: [],
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  renderElement() {
    if (this.state.value == 'Hello')
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'How are you?',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <ScrollView>
        <View style={{ height: 1000, borderWidth: 15, borderColor: 'green' }} />
        <Text>Settings</Text>
      </ScrollView>
    );
  }
}

class IconWithBadge extends React.Component {
  render() {
    const { name, badgeCount, color, size } = this.props;
    return (
      <View style={{ width: 24, height: 24, margin: 5 }}>
        <Ionicons name={name} size={size} color={color} />
        {badgeCount > 0 && (
          <View
            style={{
              // /If you're using react-native < 0.57 overflow outside of the parent
              // will not work on Android, see https://git.io/fhLJ8
              position: 'absolute',
              right: -6,
              top: -3,
              backgroundColor: 'red',
              borderRadius: 6,
              width: 12,
              height: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
              {badgeCount}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const HomeIconWithBadge = props => {
  // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
  return <IconWithBadge {...props} badgeCount={3} />;
};

const ChatroomIconWithBadge = props => {
  return <IconWithBadge {...props} badgeCount={3} />;
};

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  if (routeName === 'Home') {
    iconName = `ios-information-circle${focused ? '' : '-outline'}`;
    // We want to add badges to home tab icon
    IconComponent = HomeIconWithBadge;
  } else if (routeName === 'Settings') {
    iconName = `ios-options`;
  } else if (routeName === 'ChatRoom') {
    iconName = `ios-chatboxes`;
  } else if (routeName === 'Calendar') {
    iconName = `ios-calendar`;
  }

  // You can return any component that you like here!
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const AppDrawerNavigator = createDrawerNavigator({
  Home: Home,
},
  {
    unmountInactiveRoutes: true,
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'orange'
      }
    }
  });

const AppContainer = createAppContainer(AppDrawerNavigator);

export default createAppContainer(
  createBottomTabNavigator(
    {
      Home: { screen: HomeScreen },
      Calendar: { screen: CalendarScreen },
      ChatRoom: { screen: ChatScreen },
      Settings: { screen: SettingsScreen },
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) =>
          getTabBarIcon(navigation, focused, tintColor),
      }),
      tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      },
    }
  )
);
