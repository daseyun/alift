import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert,
  FlatList
} from "react-native";
import { WebBrowser } from "expo";

import { MonoText } from "../components/StyledText";
import GLOBAL from "../components/global.js";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true, 
      globalTesting: "",
      refreshing: false, 
    };
  }

  static navigationOptions = {
    header: null
  };

  async fetchPrograms () {
    try {
      const response = await fetch("https://alift.herokuapp.com/programs.json");
      const responseJson = await response.json();
      this.setState({
        isLoading: false,
        // dataSource: responseJson.movies,
        dataSource: responseJson
      }, function () { });
    }
    catch (error) {
      console.error(error);
    }
  }

  componentDidMount() {
    // return fetch('https://facebook.github.io/react-native/movies.json')
    this.fetchPrograms()
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.fetchPrograms().then(() => {
      this.setState({refreshing: false});
    });
  }

 
  debug() {
    Alert.alert("DEBUG", `${GLOBAL.user.username}`);
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
          >
            <View style={styles.programTitleContainer}>
              <Text style={styles.programScreenTitle}>Programs</Text>
            </View>

           
            <View style={styles.getStartedContainer}>
              <Text style={styles.getStartedText}>Fetching data...</Text>
            </View>

            <View style={styles.helpContainer}>
              <TouchableOpacity
                onPress={this._handleProgramRefreshPress}
                style={styles.helpLink}
              >
                <Text style={styles.helpLinkText}>
                  Help, I don't see my programs!
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
         </View>
      );
    } else {
      let programs = this.state.dataSource.map((val, key) => {
        return (
          <View key={key} style={styles.item}>
            <Text style={styles.programScreenTitle}> {val.program_name}</Text>
          </View>
        );
      });

      return (


        <ScrollView style={styles.container}
        
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
        >
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
          >
            <View style={styles.programTitleContainer}>
              <Text style={styles.programScreenTitle}>Programs</Text>
            </View>

            {/*  */}

            <View style={styles.getStartedContainer}>
              {programs}
            </View>

            {/*  */}
            <View style={styles.getStartedContainer}>
              <Text style={styles.getStartedText}>There's nothing here.</Text>
              <Text style={styles.getStartedText}>
                Start by creating a new program.
              </Text>

              <Text style={styles.getStartedText}>Errors? Try refreshing.</Text>
            </View>

            <View style={styles.helpContainer}>
              <TouchableOpacity
                onPress={this._handleProgramRefreshPress}
                style={styles.helpLink}
              >
                <Text style={styles.helpLinkText}>
                  Help, I don't see my programs!
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View style={styles.createProgramBtnContainer}>
            <Button
              onPress={() =>
                AlertIOS.prompt(
                  "Create Program",
                  null,
                  [
                    {
                      text: "Create",
                      onPress: newProgramName =>
                        this._handleCreateNewProgram(newProgramName)
                    },
                    {
                      text: "Cancel",
                      onPress: () => console.log("cancel Pressed")
                    }
                  ],
                  "plain-text",
                  "New Program"
                )
              }
              title="Create Program"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
            <Button
              title={"DEBUG"}
              style={styles.input}
              onPress={this.debug.bind(this)}
            />
          </View>
        </ScrollView>
      );
    }
  }

  _handleCreateNewProgram = newProgramName => {
    console.log(newProgramName);
    // insertion query
    // refresh
    // reload
  };

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/development-mode"
    );
  };

  //   TODO: make it refresh. -> reping the server.
  _handleProgramRefreshPress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes"
    );
  };
}

const styles = StyleSheet.create({
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
  programTitleContainer: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginHorizontal: 30,
    marginVertical: 40
  },
  createProgramBtnContainer: {
    marginVertical: 20
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
  programScreenTitle: {
    fontSize: 30
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
