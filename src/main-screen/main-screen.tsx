import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {Colors, LoadingState, Routes} from '../constants';
import Buttons from './buttons';
import ResponseContent from './content/response-content';
import RNFetchBlob from 'rn-fetch-blob';
import { getPermissionAndroid } from '../utils';

function MainScreen(): JSX.Element {
  const [data, setData] = useState([]);
  const [lodaingState, setLodaingState] = useState(LoadingState.Idle);

  const handleApiButtonClick = () => {
    setLodaingState(LoadingState.Loading);
    Promise.all(
      [Routes.api1, Routes.api2].map(url =>
        fetch(url).then(resp => resp.json()),
      ),
    )
      .then(data => {
        setLodaingState(LoadingState.Loading);
        return data;
      })
      .catch(data => {
        setLodaingState(LoadingState.Reject);
        return data;
      })
      .then(data => {
        setLodaingState(LoadingState.Resolve);
        setData(data.flat());
      });
  };

  const handleFileButtonClick = async () => {
    if (Platform.OS === 'android') {
      const granted = await getPermissionAndroid();
      if (!granted) {
        return;
      }
    }
    console.log('work');
    RNFetchBlob.config({
      fileCache: true,
      appendExt: 'csv',
    })
      .fetch('GET', 'https://bellavin.github.io/paycon-test/download/test2.csv')
      .then(res => console.log('work'));
    // PermissionsAndroid.WRITE_EXTERNAL_STORAGE

    // RNFS.readDirAssets('/').then(console.log).catch(error => console.log('error'));

    // RNFS.readFileAssets('test1.txt', 'ascii')
    //   .then((success) => {
    //     console.log('success');
    //   })
    //   .catch(err => {
    //     console.log(err.message);
    //   });
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.content}>
        {lodaingState === LoadingState.Loading && (
          <ActivityIndicator size="large" color={Colors.primary} />
        )}
        {lodaingState === LoadingState.Resolve && (
          <ResponseContent data={data} />
        )}
      </View>
      <View style={styles.buttons}>
        <Buttons
          onApiButtonClick={handleApiButtonClick}
          onFileButtonClick={handleFileButtonClick}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignSelf: 'stretch',
  },
  buttons: {
    marginTop: 8,
  },
});

export default MainScreen;
