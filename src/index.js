import React from "react";
import {
  StyleSheet,
  Text,
  View,
  WebView,
  Modal,
  TouchableHighlight
} from "react-native";
import { Card, Button } from "react-native-elements";
import { connect } from "react-redux";
import Deck from "./Deck";
import * as actionTypes from "./reducers/actionTypes";
import propTypes from "./propTypes";

const DATA = [
  {
    id: 1,
    title: "Card #1",
    img: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg",
    url: "https://gstuczynski.pl/tour/plaszow/",
    info: "sadsasdadsadasdasdsadsadsa"
  },
  {
    id: 2,
    title: "Card #2",
    img: "http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg",
    url: "https://gstuczynski.pl/tour/plaszow/",
    info: "sadsasdadsadasdasdsadsadsa"
  },
  {
    id: 3,
    title: "Card #3",
    img: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg",
    url: "https://gstuczynski.pl/tour/plaszow/",
    info: "sadsasdadsadasdasdsadsadsa"
  },
  {
    id: 4,
    title: "Card #4",
    img: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg",
    url: "https://gstuczynski.pl/tour/plaszow/",
    info: "sadsasdadsadasdasdsadsadsa"
  },
  {
    id: 5,
    title: "Card #5",
    img: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg",
    url: "https://gstuczynski.pl/tour/plaszow/"
  },
  {
    id: 6,
    title: "Card #6",
    img: "http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg",
    url: "https://gstuczynski.pl/tour/plaszow/",
    info: "sadsasdadsadasdasdsadsadsa"
  },
  {
    id: 7,
    title: "Card #7",
    img: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg",
    url: "https://gstuczynski.pl/tour/plaszow/",
    info: "sadsasdadsadasdasdsadsadsa"
  },
  {
    id: 8,
    title: "Card #8",
    img: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg",
    url: "https://gstuczynski.pl/tour/plaszow/",
    info: "sadsasdadsadasdasdsadsadsa"
  }
];

class App extends React.Component {
  static propTypes = propTypes;

  constructor(props) {
    super(props);
    this.props.setCurrentItem(DATA[0]);
    this.state = { modalVisible: false };
  }

  onButtonPress = url => {
    console.log(url);
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  renderCard(item, onClick) {
    return (
      <Card key={item.id} title={item.title} image={{ img: item.img }}>
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

  renderModal() {
    return (
      <Modal
        animationType="slide"
        presentationStyle="overFullScreen"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.setModalVisible(false);
        }}
        style={{ marginBottom: 100 }}
      >
        <View style={{ margin: 40, padding: 20, backgroundColor: "black" }}>
          <View>
            <Text style={{ color: "white" }}>
              {this.props.currentItem.info}
            </Text>

            <Button
              icon={{ name: "close" }}
              backgroundColor="#03A9F4"
              onPress={() => {
                this.setModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {!this.props.isViewerOpen ? (
          <Deck data={DATA} renderCard={this.renderCard} />
        ) : (
          <View style={styles.container}>
            {this.renderModal()}
            <WebView source={{ uri: this.props.currentItem.url }} />
            <View style={styles.controls}>
              <Button
                icon={{ name: "undo" }}
                onPress={this.props.onChangeViewerState}
              />
              <Button
                icon={{ name: "info" }}
                onPress={() =>
                  this.setState({ modalVisible: !this.state.modalVisible })
                }
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
    flexDirection: "row",
    justifyContent: "space-evenly"
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
