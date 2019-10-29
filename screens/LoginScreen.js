// import React from 'react';
// import { ScrollView, StyleSheet, View,Text, Button } from 'react-native';
// import { ExpoLinksView } from '@expo/samples';
// import { Google } from 'expo';
// import firebase from 'firebase'
// import { firebaseConfig } from '../config';
// if(!firebase.apps.length){
//     firebase.initializeApp(firebaseConfig);
// }
// export default class LoginScreen extends React.Component {
//     constructor(props) {
//       super(props)
//       this.state = {
//         signedIn: false,
//         name: "",
//         photoUrl: ""
//       }
//     }

//     checkIfLoggedIn = () => {
//         firebase.auth().onAuthStateChanged(function(user)
//         {
//             if(user) {
//                 console.log('logged in');
//             } else {
//                 console.log('not logged in')
//             }
//         })
//     }

//     signIn = async () => {

//         const clientId ='248077519518-r8lrupn62ld84ikiju88jgje55sf4m3t.apps.googleusercontent.com' ;
//         const { type, accessToken, user } = await Expo.Google.logInAsync({ clientId });

//         if (type === 'success') {
//             /* `accessToken` is now valid and can be used to get data from the Google API with HTTP requests */
//             console.log(user);
//           }
//     }
//     render() {
//       return (
//         <View style={styles.container}>
//           {this.state.signedIn ? (
//             <LoggedInPage name={this.state.name} photoUrl={this.state.photoUrl} />
//           ) : (
//             <LoginPage signIn={this.signIn} />
//           )}
//         </View>
//       )
//     }
//   }

//   const LoginPage = props => {
//     return (
//       <View>
//         <Text style={styles.header}>Sign In With Google</Text>
//         <Button title="Sign in with Google" onPress={() => props.signIn()} />
//       </View>
//     )
//   }

//   const LoggedInPage = props => {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.header}>Welcome:{props.name}</Text>
//         <Image style={styles.image} source={{ uri: props.photoUrl }} />
//       </View>
//     )
//   }

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: "#fff",
//       alignItems: "center",
//       justifyContent: "center"
//     },
//     header: {
//       fontSize: 25
//     },
//     image: {
//       marginTop: 15,
//       width: 150,
//       height: 150,
//       borderColor: "rgba(0,0,0,0.2)",
//       borderWidth: 3,
//       borderRadius: 150
//     }
//   })

import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  RefreshControl,
  TouchableOpacity,
  View,
  TextInput,
  Button,
  Alert
} from "react-native";
import { WebBrowser } from "expo";

import { MonoText } from "../components/StyledText";
import GLOBAL from "../components/global.js";
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      user: "",
      token: "",
      isLoggedIn: false
    };
  }

  onLogin() {
    const { username, password } = this.state;

    return fetch("https://alift.herokuapp.com/api/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        GLOBAL.userToken = responseJson.token;
        GLOBAL.user = responseJson.user;
        this.setState(
          {
            isLoading: false,
            user: responseJson.user,
            token: responseJson.token,
            isLoggedIn: true
          },
          function() {
            Alert.alert(
              "Credentials",
              `${this.state.token} + ${this.state.user.id} + ${this.state.user.username}`
            );
            // GLOBAL.userToken = this.state.token;
            // GLOBAL.user = this.state.user;

          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  onLogout() {
    Alert.alert("Logout Pressed");
    GLOBAL.userToken = null;
    this.refresh();
    Alert.alert( `${GLOBAL.userToken}`);

  }

  refresh() {
    this.render();
  }
  _onRefresh = () => {
    this.setState({refreshing: true});
    this.refresh().then(() => {
      this.setState({refreshing: false});
    });
  }

  static navigationOptions = {
    header: null
  };

  render() {

    // not logged in
    // if (this.state.isLoggedIn == false) {
    if (GLOBAL.userToken === null) {
      return (

        <View style={styles.container}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
          >
            <View style={styles.welcomeContainer}>
              <Image
                source={
                  __DEV__
                    ? require("../assets/images/robot-dev.png")
                    : require("../assets/images/robot-prod.png")
                }
                style={styles.welcomeImage}
              />
            </View>

            <View style={styles.getStartedContainer}>
              {this._maybeRenderDevelopmentModeWarning()}

              <View style={styles.loginContainer}>
                <TextInput
                  value={this.state.username}
                  onChangeText={username => this.setState({ username })}
                  placeholder={"Username"}
                  style={styles.input}
                />
                <TextInput
                  value={this.state.password}
                  onChangeText={password => this.setState({ password })}
                  placeholder={"Password"}
                  secureTextEntry={true}
                  style={styles.input}
                />

                <Button
                  title={"Login"}
                  style={styles.input}
                  onPress={this.onLogin.bind(this)}
                />
              </View>
            </View>
          </ScrollView>

          <View style={styles.tabBarInfoContainer}>
            <Text style={styles.tabBarInfoText}>
              This is a tab bar. You can edit it in:
            </Text>
            <Text style={styles.tabBarInfoText}>{this.state.token}</Text>

            <View
              style={[styles.codeHighlightContainer, styles.navigationFilename]}
            >
              <MonoText style={styles.codeHighlightText}>
                navigation/MainTabNavigator.js
              </MonoText>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
          >
            <View style={styles.welcomeContainer}>
              <Image
                source={
                  __DEV__
                    ? require("../assets/images/robot-dev.png")
                    : require("../assets/images/robot-prod.png")
                }
                style={styles.welcomeImage}
              />
            </View>

            <View style={styles.getStartedContainer}>
              {this._maybeRenderDevelopmentModeWarning()}

              <View style={styles.loginContainer}>
                
                <Text>Logged in!</Text>
                <Text>Welcome, {GLOBAL.user.username}</Text>
                <Button
                  title={"Logout"}
                  style={styles.input}
                  onPress={this.onLogout.bind(this)}
                />
              </View>
            </View>
          </ScrollView>

          <View style={styles.tabBarInfoContainer}>
            <Text style={styles.tabBarInfoText}>
              This is a tab bar. You can edit it in:
            </Text>
            <Text style={styles.tabBarInfoText}>{this.state.token}</Text>

            <View
              style={[styles.codeHighlightContainer, styles.navigationFilename]}
            >
              <MonoText style={styles.codeHighlightText}>
                navigation/MainTabNavigator.js
              </MonoText>
            </View>
          </View>
        </View>
      );
    }
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use
          useful development tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/development-mode"
    );
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes"
    );
  };
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
