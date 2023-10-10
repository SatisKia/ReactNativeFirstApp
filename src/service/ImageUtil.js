import RNFetchBlob from "rn-fetch-blob";
import ImageSize from 'react-native-image-size';
import ImageEditor from "@react-native-community/image-editor";

class MyImageUtil {
  fetchImage = (uri, successFunc, errorFunc) => {
    console.log("fetchImage " + uri);
    var imagePath = null;
    RNFetchBlob.config({
      fileCache: true
    }).fetch("GET", uri).then(response => {
      console.log(response);
      var contentType = response.info().headers["content-type"] || response.info().headers["Content-Type"];
      if (response.info().status == 200 && contentType.startsWith("image/")) {
        successFunc("file://" + response.path());
      } else {
        if (errorFunc) {
          errorFunc();
        }
      }
    }).catch(err => {
      console.log(err);
      if (errorFunc) {
        errorFunc();
      }
    });
  };
  cropImage = async (uri, x100, y100, width, height, scaleFlag, successFunc, errorFunc) => {
    var size = await ImageSize.getSize(uri);
    var imageWidth  = size.width;
    var imageHeight = size.height;
    if (imageWidth <= 0 || imageHeight <= 0) {
      if (errorFunc) {
        errorFunc();
      }
    } else {
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
        successFunc(uri);
      }).catch(err => {
        if (errorFunc) {
          errorFunc();
        }
      });
    }
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
