import React from "react";
import { StyleSheet, Text, View, WebView } from "react-native";
import { Card, Button } from "react-native-elements";
import { connect } from "react-redux";
import Deck from "./Deck";
import * as actionTypes from "./reducers/actionTypes";
import propTypes from "./propTypes";

const DATA = [
  {
    id: 1,
    text: "Card #1",
    img: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg",
    url: "https://gstuczynski.pl/tour/plaszow/"
  },
  {
    id: 2,
    text: "Card #2",
    img: "http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg",
    url: "https://gstuczynski.pl/tour/plaszow/"
  },
  {
    id: 3,
    text: "Card #3",
    img: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg",
    url: "https://gstuczynski.pl/tour/plaszow/"
  },
  {
    id: 4,
    text: "Card #4",
    img: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg",
    url: "https://gstuczynski.pl/tour/plaszow/"
  },
  {
    id: 5,
    text: "Card #5",
    img: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg",
    url: "https://gstuczynski.pl/tour/plaszow/"
  },
  {
    id: 6,
    text: "Card #6",
    img: "http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg",
    url: "https://gstuczynski.pl/tour/plaszow/"
  },
  {
    id: 7,
    text: "Card #7",
    img: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg",
    url: "https://gstuczynski.pl/tour/plaszow/"
  },
  {
    id: 8,
    text: "Card #8",
    img: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg",
    url: "https://gstuczynski.pl/tour/plaszow/"
  }
];

class App extends React.Component {
  static propTypes = propTypes;

  constructor(props) {
    super(props);
    this.props.setCurrentItem(DATA[0]);
  }

  onButtonPress = url => {
    console.log(url);
  };

  renderCard(item, onClick) {
    return (
      <Card key={item.id} title={item.text} image={{ img: item.img }}>
        <Text style={{ marginBottom: 10 }}>
          I can customize the Card further.
        </Text>
        <Button
          icon={{ name: "code" }}
          backgroundColor="#03A9F4"
          title="View Now!"
          onPress={() => onClick()}
        />
      </Card>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {!this.props.isViewerOpen ? (
          <Deck data={DATA} renderCard={this.renderCard} />
        ) : (
          <View style={styles.container}>
            <WebView source={{ uri: this.props.currentItem.url }} />
            <View style={styles.controls}>
              <Button
                icon={{ name: "undo" }}
                backgroundColor="#03A9F4"
                title="Return"
                onPress={this.props.onChangeViewerState}
              />
              <Button
                icon={{ name: "info" }}
                backgroundColor="#03A9F4"
                title="Info"
              />
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1
  },
  controls: {
    height: 50,
    flexDirection: 'row'
  }
});

const mapStateToProps = state => {
  return {
    currentItem: state.currentItem,
    isViewerOpen: state.isViewerOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeViewerState: () =>
      dispatch({ type: actionTypes.CHANGE_VIEWER_STATUS }),
    setCurrentItem: item =>
      dispatch({ type: actionTypes.SET_CURRENT_ITEM, payload: item })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
