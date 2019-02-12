import React from "react";
import { StyleSheet, Text, View, WebView, Modal } from "react-native";
import { Card, Button } from "react-native-elements";
import { connect } from "react-redux";
import axios from "react-native-axios";
import Deck from "./Deck";
import * as actionTypes from "./reducers/actionTypes";
import propTypes from "./propTypes";

const SERVER_URL = "https://gstuczynski.pl";

class App extends React.Component {
  static propTypes = propTypes;

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      cardsData: []
    };
  }

  componentDidMount() {
    this.getItems();
  }

  getItems() {
    axios
      .get(`${SERVER_URL}/api-360/all-images`)
      .then(res => res.data)
      .then(res =>
        res.map((img, idx) => ({
          id: idx,
          title: "test",
          img: `${SERVER_URL}/images360/${img}`,
          url: `${SERVER_URL}/tour/images360-server/?img=${img}`,
          info: "test"
        }))
      )
      .then(res => this.setState({ cardsData: res }));
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  renderCard(item, onClick) {
    return (
      <Card key={item.id} title={item.title} image={{ uri: item.img }}>
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
          <View>
            <Deck data={this.state.cardsData} renderCard={this.renderCard} />
          </View>
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
