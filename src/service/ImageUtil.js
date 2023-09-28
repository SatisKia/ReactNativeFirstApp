import RNFetchBlob from "rn-fetch-blob";
import ImageSize from 'react-native-image-size';
import ImageEditor from "@react-native-community/image-editor";

class MyImageUtil {
  fetchImage = (uri, func) => {
    console.log("fetchImage " + uri);
    var imagePath = null;
    RNFetchBlob.config({
      fileCache: true
    }).fetch("GET", uri).then(response => {
      console.log(response);
      if (response.info().status == 200) {
        func("file://" + response.path());
      }
    });
  };
  cropImage = async (uri, x100, y100, width, height, scaleFlag, func) => {
    var size = await ImageSize.getSize(uri);
    var imageWidth  = size.width;
    var imageHeight = size.height;
    var offsetX = 0;
    var offsetY = 0;
    var cropWidth  = imageWidth;
    var cropHeight = imageHeight;
    if (imageWidth / width > imageHeight / height) {
      cropWidth = width * (imageHeight / height);
      offsetX = (imageWidth - cropWidth) * (x100 / 100);
    } else {
      cropHeight = height * (imageWidth / width);
      offsetY = (imageHeight - cropHeight) * (y100 / 100);
    }
    var cropInfo = {
      offset: { x: offsetX, y: offsetY },
      size: { width: cropWidth, height: cropHeight }
    };
    if (scaleFlag) {
      cropInfo.displaySize = { width: width, height: height };
    }
    ImageEditor.cropImage(uri, cropInfo).then(uri => {
      console.log("cropImage " + uri);
      func(uri);
    });
  };
  unlinkImage = (uri) => {
    RNFetchBlob.fs.exists(uri).then(() => {
      RNFetchBlob.fs.unlink(uri).then(() => {
        console.log("unlinkImage " + uri);
      }).catch(err => {
        console.log(err);
      });
    });
  };
}

export default MyImageUtil;
